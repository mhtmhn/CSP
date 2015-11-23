//mhtmhn
//Preloader
//<![CDATA[
$(window).load(function () {
    window.setTimeout(load,150);
});

function load() {

    $('#lspin').fadeOut();
    $('#loader').delay(350).fadeOut('fast');
}
/*
$(window).load(function () {
    $('#lspin').fadeOut();
    $('#loader').delay(350).fadeOut('slow');
});
*/
//]]>

//Firefox Friendly Smooth Scroll
$(function(){

var $links = $("#scroll-class a");
var $sections = $(".content-section");

var headerOffset = 65;
var menuClickMode = false;
var currentSection;			//current section ID, no hashtag 
//smooth scroll on click
$links.on("click", function(event){
event.preventDefault();
menuClickMode = true;
var nextSection = $(this).attr("href");
selectMenu(nextSection);
goToSection(nextSection);
});

//selects menu, etc
$(document).on("scroll", checkSections);
$(window).on("resize", checkSections);

//trigger scroll to select first menu
$(document).trigger("scroll");
/*
Logic
*/

//smooth scroll animation
function goToSection(_section){
TweenMax.to( window, 1, {scrollTo: {y: $(_section).offset().top - headerOffset, autoKill:false}, ease:Power1.easeInOut, onStart:disableScroll, onComplete:enableScroll} );
}	

//selects menu by it's href
function selectMenu(_menuByHref){
if(_menuByHref.charAt(0) == "#"){
_menuByHref = _menuByHref.substr(1);
} 				
$links.filter("[href='#" +  _menuByHref + "']").addClass("nav-active").siblings().removeClass("nav-active");	
}

/*
On scroll
*/

function checkSections(){
var scrollTop = $(window).scrollTop();

$sections.each(function(){

if($(this).offset().top + $(this).height() - headerOffset > scrollTop){

if(currentSection != $(this).attr("id") ){
currentSection = $(this).attr("id");
//console.log("new current section with id: " + currentSection);

//don't select passing by menus if button is clicked
if(!menuClickMode){
selectMenu($(this).attr("id"));
}
}

return false;

}//end if 

});//end each
}//end checkSections

});
//End of Firefox Friendly Smooth Scroll


//Smooth scroll mouse
$(function() {
  var $window = $(window);
  var scrollTime = 0.45;
  var scrollDistance = 150;
  var deltaDivide = 100;
  var detailDivide= 2.5;
  $window.on("mousewheel DOMMouseScroll", function(event) {
    event.preventDefault();
    var delta = event.originalEvent.wheelDelta / deltaDivide || -event.originalEvent.detail / detailDivide;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta * scrollDistance);
    TweenMax.to($window, scrollTime, {
      scrollTo: {
        y: finalScroll
      },
      ease: Sine.easeOut, y: 0, autokill:true});
  });
});
/*
//Smooth scroll obsolete
$(function() {
  $('a[href*=#]:not([href=#])').click(function(e) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        TweenMax.to(document.body, 1, {scrollTop: (target.offset().top-65), ease:Power1.easeInOut, onStart:disableScroll, onComplete:enableScroll});
        preventDefault(e);
        preventDefaultForScrollKeys(e);
      }
    }
  });
});
*/
//Disable Mouse during tween, continue onComplete
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}