var CSSHelpers = CSSHelpers || {};

CSSHelpers.camelCaseProp = function (cssprop) {
    'use strict';
    if (typeof cssprop !== 'string') {
        return;
    }

    var propSegments = cssprop.split('-'),
        propObj = {};


    if (propSegments.length > 1) {

        propSegments.map(function (seg, index, array) {
            if (index > 0) {
                var cc = seg.replace(/^[a-z]/, seg.charAt(0).toUpperCase());
                this[index] = cc;
            }
        }, propSegments);

        propObj.standard = propSegments.join('');
        propObj.webkit = 'webkit' + propObj.standard.replace(/^[a-z]/, propObj.standard.charAt(0).toUpperCase());
        propObj.moz = 'Moz' + propObj.standard.replace(/^[a-z]/, propObj.standard.charAt(0).toUpperCase());
        propObj.ms = 'ms' + propObj.standard.replace(/^[a-z]/, propObj.standard.charAt(0).toUpperCase());
    } else {
        propObj.standard = cssprop;
        propObj.webkit = 'webkit' + cssprop.replace(cssprop.charAt(0), cssprop.charAt(0).toUpperCase());
        propObj.moz = 'Moz' + cssprop.replace(cssprop.charAt(0), cssprop.charAt(0).toUpperCase());
        propObj.ms = 'ms' + cssprop.replace(cssprop.charAt(0), cssprop.charAt(0).toUpperCase());
    }

    return propObj;
};

CSSHelpers.getStyleSheet = function (styleSheetName) {
    'use strict';
    var idx, i = 0;

    while (i < document.styleSheets.length) {
        if (styleSheetName === document.styleSheets[i].title) {
            idx = i;
        }
        i++;
    }
    return document.styleSheets[idx];
};

/*
Get the index of the rule that matches the selector
passed in using item.
*/
CSSHelpers.getRuleIndex = function (selector) {
    'use strict';
    var rules, i, sel;

    rules = CSSHelpers.getStyleSheet(this.styleSheetTitle).cssRules;
    i = 0;

    sel = (selector.charAt(0) === '.') ? selector : '.' + selector;

    while (i < rules.length) {
        if (sel === rules[i].selectorText) {
            return i;
        } else {
            return false;
        }
        i++;
    }
};

CSSHelpers.setProp = function (selector, property, value) {
    'use strict';
    var ri = CSSHelpers.getRuleIndex(selector),
        ccprop = CSSHelpers.camelCaseProp(property),
        styles = CSSHelpers.getStyleSheet(this.styleSheetTitle);

    if (ccprop.standard in styles.cssRules[ri].style) {
        styles.cssRules[ri].style[ccprop.standard] = value;
    } else {
        styles.cssRules[ri].style[ccprop.webkit] = value;
        styles.cssRules[ri].style[ccprop.moz] = value;
        styles.cssRules[ri].style[ccprop.ms] = value;
    }
};

CSSHelpers.resetRules = function (e) {
    'use strict';
    var rules, i, originalRule;
    
    rules = CSSHelpers.getStyleSheet(CSSHelpers.styleSheetTitle);
    
    originalRule = document.querySelector('[title=' + CSSHelpers.styleSheetTitle + ']').innerHTML;
    
    for (i = rules.cssRules.length; i > 0; i--) {
        rules.deleteRule(i - 1);
    }
    rules.insertRule(originalRule, 0);
};

CSSHelpers.preventSubmit = function (e) {
    'use strict';
    e.preventDefault();
};
