document.querySelector('.animate').addEventListener('click', function(e){
	if( e.target.nodeName == 'BUTTON' ){
		e.currentTarget.getElementsByClassName('wobble')[0].classList.toggle('running');
	}
})