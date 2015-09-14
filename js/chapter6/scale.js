var css = document.styleSheets[document.styleSheets.length-1], 
    cssRulesInitLength = css.cssRules.length,
    factor = document.getElementById('factor');

factor.addEventListener('input', function(e){

    var val = e.target.value,
    rule = rulestr.replace(/\%s/g, val),
    txt = document.createTextNode(val),
    output = document.querySelectorAll('#output span');


    /* Update last rule */
    if(css.cssRules.length > cssRulesInitLength ){
        css.deleteRule(css.cssRules.length - 1);
    }
    css.insertRule(rule, css.cssRules.length);

    /*
    Update degree value. Using an array because scale accepts
    two arguments and we need to update both.
    */
    Array.prototype.map.call(output, function(op){
        var t = txt.cloneNode();
        if(op.firstChild){
            op.replaceChild(t, op.firstChild);
        } else {
            op.appendChild(t);
        }
    });
},true);
