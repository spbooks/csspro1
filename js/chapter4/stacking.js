var opacity = document.getElementById('opacity');

opacity.addEventListener('change', function(e){
    var op = document.getElementById('output');
    document.getElementById('f').classList.toggle('opa');
    op.replaceChild(document.createTextNode(e.target.value), op.firstChild);
});

