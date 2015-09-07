var css = document.styleSheets[document.styleSheets.length-1], 
    cssRulesInitLength = css.cssRules.length,
    form = document.forms[0],
    outputs = document.querySelectorAll('#output span'),
    args = document.querySelectorAll('[type=number]');

if(document.forms.length){
    var addPersp = document.forms[0].addpersp;
}

form.addEventListener('input', function(e){
    var ar = args, argstr = [];

    Array.prototype.map.call(ar, function(n){
        argstr.push(n.value);
    });

    var str = rulestr.replace(/%s/g, function(){
        return argstr.join(',')+'deg';
    });

    if(css.cssRules.length){
        css.deleteRule(css.cssRules.length-1);
    }
    css.insertRule(str, css.cssRules.length);
}, true);

/* Update property display */
form.addEventListener('input', function(e){
    Array.prototype.map.call(args, function(ar, idx){
        outputs[idx].innerHTML = ar.value;
    });
}, true)

form.addEventListener('reset', function(e){
    Array.prototype.map.call(args, function(ar, idx){
        outputs[idx].innerHTML = 0;
    });

    if(css.cssRules.length){
        css.deleteRule(css.cssRules.length-1);
    }
    document.querySelector('.content').classList.remove('dimen');
    addPersp.checked = false;
}, true);
   

if(addPersp) {
    addPersp.addEventListener('change', function(e){
        document.querySelector('.content').classList.toggle('dimen');
    }, true);
}
