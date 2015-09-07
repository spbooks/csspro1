var toggleAll =  document.querySelector('.stopanim'),
anim = document.querySelectorAll('.animate'),
svgwrap = document.querySelectorAll('.svgwrap');

var togglePulse = function(e){
	var d;

	if(e.target.nodeName == 'BUTTON') {
		d = e.target.dataset ? e.target.dataset.classname : e.target.getAttribute('data-classname');
		e.target.parentNode.parentNode.getElementsByClassName('svgwrap')[0].classList.toggle(d);
	} 
}

Array.prototype.map.call(anim, function(an){
	an.addEventListener('click', togglePulse);
});

if(toggleAll){
	toggleAll.addEventListener('click', function(){
		var clickEvent;

		clickEvent = document.createEvent("MouseEvents");
		clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);

		Array.prototype.map.call(anim, function(an){
			an.getElementsByTagName('button')[0].dispatchEvent(clickEvent);
		});
	});
}

var transitionEnd = ['webkitAnimationEnd', 'animationend'];

transitionEnd.map(function(te){
    document.querySelector('.svgwrap').addEventListener(te, function(evt) {
       event.target.classList.remove('wiggle'); 
    });
});