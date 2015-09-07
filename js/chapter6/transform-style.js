var form = document.forms[0], 
    persp = document.querySelectorAll('[type=radio]'),
    output = document.querySelector('#output span'),
    pause = function(e) {
        document.querySelector('.dice').classList.toggle('paused');
    },
    
    updatePerspective = function(e){
        var cl = document.querySelector('.dice').classList,
            len = cl.length,
            i,
            rule,
            txt;

        cl.remove('flat');
        cl.remove('preserve-3d');
        cl.remove('paused');

        rule = rulestr.replace(/\%s/g,  e.target.value);

        txt = document.createTextNode(e.target.value);

        if( output.firstChild ) {
            output.replaceChild(txt, output.firstChild);
        }  else {
            output.appendChild(txt);
        } 

        document.querySelector('.dice').classList.add(e.target.value);
    };

form.addEventListener('change', updatePerspective, true);    
 
form.addEventListener('reset', pause, true);

window.addEventListener('load', pause, false);