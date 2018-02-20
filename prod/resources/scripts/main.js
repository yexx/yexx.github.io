/* ---- GLOBAL VARS ---- */

/* Funçoes Gerais */
$(window).on('load',function(){

	var $videos = [];
	$('.videos video').each(function(i,c){
		$videos.push($(this).attr('id'));
		console.log($videos);
	});

	var count = $('.videos video').length
	var ref = 1;
	setInterval(function(){
		$('.videos video').hide();
		$('.videos video').eq(ref-1).show();
		if(ref >= count){
			ref = 0;
		} else {
			ref ++;
		}
	},5000)
});