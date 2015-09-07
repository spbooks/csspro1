var css = document.styleSheets[2],
    cssRulesInitLength = css.cssRules.length,
    persp = document.querySelectorAll('[type=range]'),
    output = document.querySelector('#output span');



Array.prototype.map.call(persp, function(p){
    p.addEventListener('input', function(e){
        var rule, txt, val = e.target.value+'px';
        rule = rulestr.replace(/\%p/g,  val);

        txt = document.createTextNode( val );

        if( output.firstChild ) {
            output.replaceChild(txt, output.firstChild);
        }  else {
            output.appendChild(txt);
        }
        /* Update last rule */
        if(css.cssRules.length > cssRulesInitLength ){
            css.deleteRule(css.cssRules.length - 1);
        }
        css.insertRule(rule, css.cssRules.length);
    }, true);
})

document.forms[0].addEventListener('reset', function(e){
    var txt = document.createTextNode('0'), css = document.styleSheets[2];
    if( output.firstChild ) {
            output.replaceChild(txt, output.firstChild);
    }  else {
        output.appendChild(txt);
    }
    if(css.cssRules[css.cssRules.length-1].selectorText == '.perpfunc') {
        css.deleteRule(css.cssRules.length-1);
    }
}, true);

