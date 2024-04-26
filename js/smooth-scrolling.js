$(document).ready(function() {
	$('a[href*="#"]').each(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
		&& location.hostname == this.hostname
		&& this.hash.replace(/#/,'') ) {
			var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
			var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
			if ($target) {
				var targetOffset = $target.offset().top;
				$(this).click(function() {
					$("#nav li a").removeClass("active");
					$(this).addClass('active');
					$('html, body').animate({scrollTop: targetOffset}, 1000);
					return false;
				});
			}
		}
	});

// Navigation arrows for client divs

var currentIndex = 0;
var numClients = $('.client').length;
var $clientContainer = $('.client-container'); // make sure this ID matches your HTML
//var containerWidth = 2450;

// calculating the container width
var containerWidth = 0;
$('.client').each(function() {
    containerWidth += $(this).outerWidth(true); // Include margins
});
//console.log("Total container width:", containerWidth);
// till here

$('.next-client').click(function() {
	//console.log("Next client arrow clicked.");
	//console.log("Current index:", currentIndex);
	currentIndex = (currentIndex + 1) % numClients;
	scrollToClient(currentIndex);
});

$('.prev-client').click(function() {
	currentIndex = (currentIndex - 1 + numClients) % numClients;
	scrollToClient(currentIndex);
});
function scrollToClient(index) {
	var $targetClient = $('.client').eq(index);
	if ($targetClient.length) {
		//var containerWidth = $clientContainer.width();
		var scrltargetOffset = $targetClient.position().left + $clientContainer.scrollLeft(); // Get left position relative to the container
		//console.log("Scrolling to client at index:", index);
       // console.log("Target offset:", scrltargetOffset);
		if (scrltargetOffset < 0) {
            scrltargetOffset = 0;
        } else if (scrltargetOffset + $targetClient.width() > containerWidth) {
			//console.log("Container width:", containerWidth);
			//console.log("Client width:", $targetClient.width());
            scrltargetOffset = containerWidth - $targetClient.width()-20;
        }
	//	console.log("Adjusted offset:", scrltargetOffset);
	//	console.log("Container width:", containerWidth);
	//	console.log("Client width:", $targetClient.width());
	//	console.log("Container scrollLeft:", $clientContainer.scrollLeft());
	//	console.log("Target client position:", $targetClient.offset().left);
	//	console.log("Animating to offset:", scrltargetOffset);
		$clientContainer.animate({scrollLeft: scrltargetOffset}, 1000);
	/*$clientContainer.animate({scrollLeft: scrltargetOffset}, 1000, function() {
		console.log("Final scrollLeft:", $clientContainer.scrollLeft());
	});*/
	//console.log("Scrolling to client at index post:", index);
        //console.log("Target offset post:", scrltargetOffset);
		//console.log("containerWidth:", containerWidth);
		//console.log("targetClient.width:", $targetClient.width());
	}
}


});