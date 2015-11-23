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

//Smooth scroll
$(function() {
  var $window = $(window);
  var scrollTime = 0.15;
  var scrollDistance = 150;
  var deltaDivide = 200;
  var detailDivide= 5;
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