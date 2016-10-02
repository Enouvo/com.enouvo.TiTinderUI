//**********************************************//
//                                              //
//             ENOUVO TINDER EFFECT             //
//                                              //
//**********************************************//
const COLORS = [
   '#65b237', // green
   '#346ca5', // blue
   '#a0a0a0', // light grey
   '#ffc508', // yellow
   '#217983', // cobolt
   '#435056', // grey
   '#b23751', // red
   '#333333', // dark
   '#ff6821', // orange
   '#e3a09e', // pink
   '#1abc9c', // turquoise
   '#302614', // brown
];
// Image for test
const IMAGES = [
	"https://davidgriffen.co.uk/food-photography-blog/wp-content/uploads/2012/07/david-griffen-food-photography-scallops-bbq-2_1661-400x600.jpg",
	"http://thunderdungeon.com/wp-content/uploads/2015/04/RoyReid.ca-Food-Porn-2015042402-400x600.jpg",
	"http://staffatravel.com/zzz/wp-content/uploads/2015/12/11-The-Belmond-Maroma-Beach-Mexico-Luxury-Hotel-Food-400x600.png",
	"http://spaceshipsandlaserbeams.com/wp-content/uploads/2015/09/5-halloween-party-food-meatball-mummies-cresecent-rolls-400x600.jpg",
	"http://belmodo.be/made/remote/http_s3-eu-west-1.amazonaws.com/belmodo/media/Articles/Beauty/Yoga_healthy_food/888785b33fef22da2c6e71fc0ed64b50/belmodo_yoga_healthyfood_event_10_400_600_89_s.jpg",
	"http://cubesnjuliennes.com/wp-content/uploads/2015/12/Dubki-Wale-Aloo1-400x600.jpg",
	"http://t02vt3ludlc288yi5365dsdi.wpengine.netdna-cdn.com/wp-content/uploads/2016/04/02_food_photo-400x600.jpg",
	"http://www.nourishingcookery.com/uploads/5/5/9/3/55939051/5573019.jpg",
	"https://davidgriffen.co.uk/food-photography-blog/wp-content/uploads/2016/02/David-Griffen-Photography-Food-Action-06-400x600.jpg",
	"http://townandcountrymarkets.com/wp-content/uploads/2014/11/Party-Food-for-Inside-Page-Slideshow-4-400x600.jpg",
	"http://1.bp.blogspot.com/-bjBiBpD4iAI/VEaN_yfYc4I/AAAAAAAAcpg/TWrDRp8dBBM/s1600/Steak%2BBomb%2B2.jpg",
	"http://www.nourishingcookery.com/uploads/5/5/9/3/55939051/3370585.jpg"
]
// Properties for Tinder 
var tinderTop = 100,
	tinderLeft = 40,
	tinderBottom = 200,
	tinderWidth = Ti.Platform.displayCaps.platformWidth - 2*tinderLeft,
	tinderHeight = Ti.Platform.displayCaps.platformHeight - tinderTop - tinderBottom,
	distanceToPullTop = 80,
	distanceToPullLeftRight = 60,
	distanceToShowLabel = 20;

var properties = {
	top: tinderTop,
	left: tinderLeft,
	bottom: tinderBottom,
	width: tinderWidth,
	height: tinderHeight
}

var curY=null, curX=null;
	checkMoveTop=false,
	checkMoveLeftRight=false;

var index=11;


// animations
var animateTop = Ti.UI.createAnimation({
    top: -500,
    opacity: 0,
    duration: 300
});

var animateTopOrigin = Ti.UI.createAnimation({
	top : tinderTop,
	left: tinderLeft,
	duration: 200,
})

var animateLeft = Ti.UI.createAnimation({
    left: -500,
    transform: Ti.UI.create2DMatrix({rotate: 60}),
    opacity: 0,
    duration: 300
});

var animateRight = Ti.UI.createAnimation({
    left: 500,
    transform: Ti.UI.create2DMatrix({rotate: -60}),
    opacity: 0,
    duration: 300
});

function init(){
	$.win.open();

	_.extend($.scrollView, properties);
	$.scrollView.setContentHeight(tinderHeight+1);
	$.scrollView.setContentWidth(tinderWidth+1);

	for (var i = 0; i <= index; i++) {

	    var wrap = Ti.UI.createImageView({
	    	left: tinderLeft,
	    	top : tinderTop,
	        width: tinderWidth,
	        height: tinderHeight,
	        //image:  IMAGES[i],
	        backgroundColor : COLORS[i]
	    });
	    var hateLabel = Ti.UI.createLabel({
		  color: '#fa7065',
		  font: { fontSize:30 },
		  text: ' Nope  ',
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  bottom: 10,
		  right: 10,
		  borderColor: "#fa7065",
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE,
		  visible: false
		});

		var likeLabel = Ti.UI.createLabel({
		  color: '#6bd04b',
		  font: { fontSize:30 },
		  text: ' Like  ',
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  bottom: 10,
		  left: 10,
		  borderColor: "#6bd04b",
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE,
		  visible: false
		});

		var superLikeLabel = Ti.UI.createLabel({
		  color: '#66d9ef',
		  font: { fontSize:30 },
		  text: ' Super Like  ',
		  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		  width: Ti.UI.SIZE, height: Ti.UI.SIZE,
		  visible: false
		});

	    wrap.add(hateLabel);
	    wrap.add(likeLabel);
	    wrap.add(superLikeLabel);
	    $.container.add(wrap);
	}
}

init();

function scrollendMove(e){
	var item = $.container.children[index];
	
	if (item) {
		if (!checkMoveTop && $.container.children[index]) {
			item.animate(animateTopOrigin);
		}
		item.children[0].setVisible(false);
		item.children[1].setVisible(false);
		item.children[2].setVisible(false);
	}
	checkMoveTop= false;
    curY = null;
    curX = null;
}

function scrollMove(e) {
	if (curY == null) curY = parseInt(e.y, 10);
	if (curX == null) curX = parseInt(e.x, 10);
	var coordinatesY = parseInt(e.y, 10) - curY;
	var coordinatesX = parseInt(e.x, 10) - curX;
	var matrix = Ti.UI.create2DMatrix({rotate: (coordinatesX / 10)});
	var animate = Ti.UI.createAnimation({
        left: tinderLeft - coordinatesX,
        transform: matrix,
        duration: 20
    });
    var item = $.container.children[index];
	if (!checkMoveTop && $.container.children[index]) {
		item.animate(animate);
		item.top = tinderTop - coordinatesY;
		item.left = tinderLeft - coordinatesX;
		if (coordinatesY - Math.abs(coordinatesX) > distanceToShowLabel) {
			if (!item.children[2].visible) {
				item.children[2].setVisible(true);
				item.children[1].setVisible(false);
				item.children[0].setVisible(false);
			}	
		} else if (coordinatesX > distanceToShowLabel) {
			if (!item.children[0].visible) {
				item.children[0].setVisible(true);
				item.children[1].setVisible(false);
				item.children[2].setVisible(false);
			}		
		} else if (coordinatesX < -distanceToShowLabel) {
			if (!item.children[1].visible) {
				item.children[1].setVisible(true);
				item.children[0].setVisible(false);
				item.children[2].setVisible(false);
			}		
		}
	}; 
	
	if (coordinatesY >=distanceToPullTop && !checkMoveTop) {
		checkMoveTop= true;
		item.animate(animateTop, function(){
	    	index--;	    	
	    });	    
	}
	else if (coordinatesX > distanceToPullLeftRight && !checkMoveTop) {
		checkMoveTop = true;
		item.animate(animateLeft, function(){
        	index--;
        }); 
	} else if (coordinatesX < - distanceToPullLeftRight && !checkMoveTop) {
		checkMoveTop = true;
		item.animate(animateRight, function(){
        	index--;
        }); 
	}
}

