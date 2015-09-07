var trigger = document.querySelector('[type=button]'),
dice = document.querySelectorAll('.dice'),
face = document.querySelectorAll('.dice div'),
multi = document.getElementById('multi'),
angle = document.getElementsByClassName('angle');

trigger.addEventListener('click', function(e){
    Array.prototype.map.call(face, function(f) {
        f.classList.toggle(e.target.dataset.classname);
    });
    var val = document.getElementById('value');

    val.innerHTML = (val.innerHTML === 'hidden') ? 'visible' : 'hidden';
}, true);

multi.addEventListener('change', function(e){
    Array.prototype.map.call(dice, function(f) {
        f.classList.toggle(e.target.dataset.classname);
    });
}, true);


Array.prototype.map.call(angle, function(a, ind, list) {
    a.addEventListener('input', function(e){
       var s = document.styleSheets[1];
       var css = rulestr;
       var nr = css.replace(/%x/g, list[0].value).replace(/%y/g, list[1].value);
       s.insertRule(nr, s.cssRules.length);
    }, true);
});

