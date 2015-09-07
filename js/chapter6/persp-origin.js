var units = document.querySelectorAll('[name=units]'), 
p = document.getElementById('perspective'),
pos = document.querySelectorAll('[type=number]'),
rulestr = '#perspective{perspective-origin: %s}',
form = document.forms[0],
styles = document.styleSheets[2];

var parseValues = function(str) {
	return str.replace(/px/g, '').split(' ');
}

var calculatePct = function(num, denom) {
	return (num / denom) * 100;
}

var changeUnit = function(e) {
	var xy, ps = p, s = getComputedStyle(ps);

	xy = s.webkitPerspectiveOrigin || s.perspectiveOrigin;
	xy = parseValues(xy);

	if(e.target.value == '%') {		
		xy[0] = calculatePct(xy[0], parseInt(s.width, 10));
		xy[1] = calculatePct(xy[1], parseInt(s.height, 10));
	}

	xy.map(function(o, idx, obj){
		pos[idx].value = obj[idx];
	});
}

var updatePerspOrigin = function(e) {
	var unit = form.units.value, str = [], s = styles;

	if(!!s.cssRules.length){
		s.deleteRule(0);
	}

	str[0] = pos[0].value;
	str[1] = unit+' ';
	str[2] = pos[1].value;
	str[3] = unit;

	var css = rulestr.replace(/%s/g, function(){
		return str.join('');
	});

	s.insertRule(css, 0);
}

Array.prototype.map.call(units, function(u, idx, arr){
	u.addEventListener('change', changeUnit, true);
})

Array.prototype.map.call(pos, function(u, idx, arr){
	u.addEventListener('input', updatePerspOrigin, true);
})

form.addEventListener('reset', function(){
	var s = styles;
	s.deleteRule(0);
}, true)

	