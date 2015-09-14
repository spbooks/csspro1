var trimto2decpts = function(inp, decimalplaces){
	var intinp, pow, mult;
	pow = !!decimalplaces ? decimalplaces : 2;

	mult = Math.pow(10, pow);
	return parseInt(inp * mult, 10) / mult;
}

var css = document.styleSheets[document.styleSheets.length-1], 
    cssRulesInitLength = css.cssRules.length;

if(document.forms.length){
    var addPersp = document.forms[0].addpersp;
}

angle.addEventListener('input', function(e){
    var val = e.target.value,
    deg = val+'deg';
    rule = rulestr.replace(/\%s/g,deg),
    txt = document.createTextNode(val),
    output = document.querySelectorAll('#output span'),
    units = [],
    ang = new Angles();

    /* Update last rule */
    if(css.cssRules.length > cssRulesInitLength ){
        css.deleteRule(css.cssRules.length - 1);
    }
    css.insertRule(rule, css.cssRules.length);

    /*
    Update degree value. Using an array because skew accepts
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


    /* Convert degrees to other units */
    units[0] = trimto2decpts(ang.toRadians(deg));
    units[1] = trimto2decpts(ang.toGradians(deg));
    units[2] = trimto2decpts(ang.toTurns(deg));

    Array.prototype.map.call(document.getElementsByClassName('unit'), function(u, ind){
        var txt = document.createTextNode(units[ind]);

        if(u.firstChild){
            u.replaceChild(txt, u.firstChild);
        } else {
            u.appendChild(txt);
        }
    });
}, true)

if(addPersp) {
    addPersp.addEventListener('change', function(e){
        document.querySelector('.content').classList.toggle('dimen');
    }, true);
}
