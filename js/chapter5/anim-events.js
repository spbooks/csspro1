var wobble, output, removeClasses, addClasses, updateEventList, eventlist;

wobble = document.getElementsByClassName('svgwrap')[0];
output = document.getElementById('output');

removeClasses = function(){
	var classes = ['running','finite','wobble'];
	classes.map(function(c){
		wobble.classList.remove(c);
	});
}

addClasses = function(){
	var classes = ['running','finite','wobble'];
	classes.map(function(c){
		wobble.classList.add(c);
	});
}

updateEventList = function(evt) {
	var txt = document.createTextNode(evt.animationName +': ' + evt.type + '\n');
	output.appendChild(txt);
}

eventlist = ['animationstart','animationend','animationiteration','webkitAnimationStart','webkitAnimationEnd','webkitAnimationIteration'];

eventlist.map(function(el) {
	wobble.addEventListener(el, updateEventList, true);
});

document.querySelector('.animate').addEventListener('click', function(e){
	if(e.target.type == 'reset'){
		removeClasses();
		while(output.firstChild){
			output.removeChild(output.firstChild)
		};
	}
	if( e.target.type == 'button') {
		addClasses();
	}
	
}, true)




