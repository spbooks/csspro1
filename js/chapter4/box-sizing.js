var cbs = document.getElementById('change-box-sizing');

var updateProperty = function (e) {
    'use strict';
    var styleObj = document.styleSheets[document.styleSheets.length - 1],
        rule = '.box-sizing-wrapper > aside, .box-sizing-wrapper > article {box-sizing: %s}',
        display = document.querySelector('h2 code:nth-child(2)');

    rule = rule.replace(/%s/, e.target.value);

    display.replaceChild(document.createTextNode(': ' + e.target.value), display.firstChild);

    if (styleObj.cssRules[0]) {
        styleObj.deleteRule(0);
    }
    styleObj.insertRule(rule, 0);
};

var setup = function () {
    'use strict';
    var newstyle = document.createElement('style'), enable;
    newstyle.setAttribute('id', 'bs');
    document.head.appendChild(newstyle);
};

cbs.addEventListener('change', updateProperty);
window.addEventListener('load', setup);
