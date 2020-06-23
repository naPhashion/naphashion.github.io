$( document ).ready(function() {
	var normalFolk = ['Outfit','Outerwear','Basewear','Innerwear'];
	var cast = ['Male CAST', 'Female CAST'];
    json = $('#json').html()
    json = json.trim()
    json = JSON.parse(json)



    $(".collapse").on('hidden.bs.collapse', function(e) {
    	if ($(this).is(e.target)) {
      		var action = this.id;
      		if (action=="catSubmenu") {
      			var cat = $("#cat").html();
      			if (!normalFolk.includes(cat)) {
    				$("#sex").attr('data-toggle',' ')
    				$("#sex").removeClass("dropdown-toggle")
    			} else {
    				$("#sex").attr('data-toggle','collapse').addClass("dropdown-toggle")
    			}
      		}
    	}
  	});
    $('.menu-switch').click(function(e){
    	e.preventDefault();

    	var switchMenu = $(this).attr('class').split(' ')[1];
    	var switchName = $(this).html();
    	
    	$('.start').removeClass('start');
    	
    	$('body,html').animate({
            scrollTop: 0
        }, 400);

    	if (switchMenu=="cat") {
    		$('.active').removeClass('active')
    		$(this).addClass('active')
    		cat = $(".cat.active").html()
    		if (!normalFolk.includes(cat) && cat!="CAST") {
    			$("#sex").html("NA").change()
    		} else {
    			if (cat=="CAST") {
    				if ($("#sex").html()=="All Male Races") {
    					$("#sex").html("Male CAST").change();
    				} else {
    					$("#sex").html("Female CAST").change();
    				}
    				$(".f").html("Female CAST")
    				$(".m").html("Male CAST")
    			} else {
    				if (["Male CAST", "All Male Races"].includes($("#sex").html())){
    					$("#sex").html("All Male Races").change();	
    				} else {
    					$("#sex").html("All Female Races").change();
    				}
    				$(".f").html("All Female Races")
    				$(".m").html("All Male Races")
    			}
    		}
    	} else {
    		$("#sex").html(switchName)
    		cat = $(".cat.active").html()
    	}

    	var sex = $("#sex").html()
    	console.log(cat)
    	body="";
    	merge = []
    	switch (true) {
    		case ["Sticker","Stickers","Sticker Set"].includes(cat):
    			merge = ["Sticker","Stickers","Sticker Set"];
    			break;
    		case ["Body Paint", "Body Paint Set"].includes(cat):
    			merge = ["Body Paint", "Body Paint Set"];
    			break;
    		case ["Accessory", "Acessory"].includes(cat):
    			merge = ["Accessory", "Acessory"];
    			break;
    		case ["Eyes", "Eyebrows", "Eyelashes Set", "Eyelashes", "EyesEnter Name"].includes(cat):
    			merge = ["Eyes", "Eyebrows", "Eyelashes Set", "Eyelashes", "EyesEnter Name"];
    			break;
    		default:
    			merge = [cat];
    			break;
    	}
    	for (var iterCat in merge) {
    		var cat=merge[iterCat]
    		for (var item in json[cat]) {
    			if (sex == json[cat][item]['sex']) {
    				var name = item;
    				var sex = json[cat][item]['sex']
    				var img = json[cat][item]['image']
    				var shortname = json[cat][item]['ticket']
    				var collection = json['Tickets'][shortname]['name'];
    				body+='<div class="col-md-4"><div class="card mb-4 box-shadow"><img class="card-img-top" src="'
    				    +img
    				    +'"><div class="card-body"><p class="card-title text-center">'
    				    +name
    				    +'</p><p class="card-text text-center">'
    				    +collection
    				    +'</p></div></div></div>'
    			}
    		}
    	}
    	$("#album").html(body)
    });//end switch click
    $("#sex").change(function(){
    	if ($("#sex").html()=="NA") {
    		$("#sex").hide();
    	} else {
    		$("#sex").show();
    	}
    });//end change

    $(".menu-switch:first").trigger('click');
});