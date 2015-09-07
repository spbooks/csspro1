var anim = document.querySelectorAll('.animate'),
fillmode = document.querySelectorAll('[name=animation-fill-mode]'),
svgwrap = document.querySelector('.svgwrap'),
cycle = ['none', 'forwards', 'backwards', 'both'];

var clearCycle = function() {
	for(var o in cycle){
		svgwrap.classList.remove(cycle[o]);
	}
}

Array.prototype.map.call(anim, function(an){
	an.addEventListener('click', function(e){
		var d;
		if(e.target.nodeName == 'BUTTON') {
			d = e.target.dataset ? e.target.dataset.classname : e.target.getAttribute('data-classname')
			svgwrap.classList.toggle(d);
		}
	})
});

Array.prototype.map.call(fillmode, function(fm){
	fm.addEventListener('click', function(e){
		clearCycle();
		svgwrap.classList.remove('wiggle');
		svgwrap.classList.toggle(e.target.value);
	})
});

