var css = document.styleSheets[document.styleSheets.length-1],
    cssRulesInitLength = css.cssRules.length,
    output = document.querySelector('#output span');


document.forms[0].addEventListener('input', function(evt){
    var coord = [], txt;
    var direction = document.querySelectorAll('[type=range]');

    rule = rulestr.replace(/\%z/,  function(x){
        coord[0] = direction[0].value+'px';

        return coord.join(',');
    });

    txt = document.createTextNode( coord.join(', ') )

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

document.forms[0].addEventListener('reset', function(e){
    var txt = document.createTextNode('0'), css = document.styleSheets[document.styleSheets.length-1];
    if( output.firstChild ) {
            output.replaceChild(txt, output.firstChild);
    }  else {
        output.appendChild(txt);
    }
    if(css.cssRules[css.cssRules.length-1].selectorText == '#translate') {
        css.deleteRule(css.cssRules.length-1);
    }
}, true);
