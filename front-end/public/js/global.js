$(document).ready(function () {
	var owl = $('#owl-carousel');
	// owl.owlCarousel({
	// 	nav: true,
	// 	dots: false,
	// 	loop: true,
	// 	onDragged: callback,
	// 	onInitialized: callback,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		770: {
	// 			items: 3
	// 		},
	// 		1000: {
	// 			items: 3
	// 		}
	// 	}
	// });

	// Listen to owl events:


	function callback(){
	    $(".owl-item").removeClass("main-item");
	    $(".owl-item").removeClass("main-type");
	    if ($(window).width() > 762){
	        var position = $(".owl-item").index($(".active")) + 1;
	        $(".owl-item:eq(" + position + ")").addClass("main-type main-item");
	    } else {
	        var position = $(".owl-item").index($(".active"));
	        $(".owl-item:eq(" + position + ")").addClass("main-type");
	    }
	    $('.sl-bearingtype option').removeAttr("selected");
	    var string_id = ".sl-bearingtype [name='" + $(".slick-center .typeId").val() +"']";
	    $(string_id).attr('selected','selected');
	}
	//-----------------------OUTER-DIAMETER------------------------------//
	$("#outer-diameter").change(function () {
		$("#outer-diameter option:selected").each(function () {
			let value = $(this).val();
			if (value != "-1"){
				$('#outer-diameter').removeClass('outer-diameter-before');
				$('#outer-diameter').addClass('outer-diameter');
			} else {
				$('#outer-diameter').removeClass('outer-diameter');
				$('#outer-diameter').addClass('outer-diameter-before');
			}
		});
	});
	//-----------------------THICKNESS------------------------------//
	$("#thickness").change(function() {
		$("#thickness option:selected").each(function() {
			var value = $(this).val();
			if (value != "-1") {
				$("#thickness").removeClass("thickness-before");
				$("#thickness").addClass("thickness");
			} else {
				$("#thickness").removeClass("thickness");
				$("#thickness").addClass("thickness-before");
			}
		});
	});
	//-----------------------INNER-DIAMETER------------------------------//
	$("#inner-diameter").change(function () {
		$("#inner-diameter option:selected").each(function () {
			let value = $(this).val();
			if (value != "-1"){
				$('#inner-diameter').removeClass('inner-diameter-before');
				$('#inner-diameter').addClass('inner-diameter');
			} else {
				$('#inner-diameter').removeClass('inner-diameter');
				$('#inner-diameter').addClass('inner-diameter-before');
			}
		});
	});

})
