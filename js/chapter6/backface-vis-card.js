var trigger = document.querySelector('[type=button]'),
card = document.querySelectorAll('.card');

trigger.addEventListener('click', function(e){
    Array.prototype.map.call(card, function(c) {
        c.classList.toggle(e.target.dataset.classname);
    });
}, true);
