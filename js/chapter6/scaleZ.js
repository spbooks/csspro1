var css = document.styleSheets[2],
    cssRulesInitLength = css.cssRules.length,
    output = document.querySelector('#output span');

document.forms[0].addEventListener('input', function (evt) {
    'use strict';
    var coord, txt, rule, direction = document.querySelectorAll('[type=range]');

    rule = rulestr.replace(/\%z/g, direction[0].value);
    txt = document.createTextNode(direction[0].value);
    
    if (output.firstChild) {
        output.replaceChild(txt, output.firstChild);
    } else {
        output.appendChild(txt);
    }

    /* Update last rule */
    if (css.cssRules.length > cssRulesInitLength) {
        css.deleteRule(css.cssRules.length - 1);
    }
    css.insertRule(rule, css.cssRules.length);
}, true);

document.forms[0].addEventListener('reset', function (e) {
    'use strict';
    var txt = document.createTextNode('0'), css = document.styleSheets[2];
    if (output.firstChild) {
        output.replaceChild(txt, output.firstChild);
    } else {
        output.appendChild(txt);
    }
    if (css.cssRules[css.cssRules.length - 1].selectorText === '#scalez .dice') {
        css.deleteRule(css.cssRules.length - 1);
    }
}, true);
