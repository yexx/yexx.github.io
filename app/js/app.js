$(window).on("load",function(){var o=[];$(".videos video").each(function(e,i){o.push($(this).attr("id")),console.log(o)});var e=$(".videos video").length,i=1;setInterval(function(){$(".videos video").hide(),$(".videos video").eq(i-1).show(),i>=e?i=0:i++},5e3)});