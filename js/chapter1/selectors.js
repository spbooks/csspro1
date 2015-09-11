/*======= CustomEvent polyfill ========*/
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

/*======= Dataset polyfill ========*/
(function () {
  var forEach = [].forEach,
      regex = /^data-(.+)/,
      dashChar = /\-([a-z])/ig,
      el = document.createElement('div'),
      mutationSupported = false,
      match
  ;

  function detectMutation() {
    mutationSupported = true;
    this.removeEventListener('DOMAttrModified', detectMutation, false);
  }

  function toCamelCase(s) {
    return s.replace(dashChar, function (m,l) { return l.toUpperCase(); });
  }

  function updateDataset() {
    var dataset = {};
    forEach.call(this.attributes, function(attr) {
      if (match = attr.name.match(regex))
        dataset[toCamelCase(match[1])] = attr.value;
    });
    return dataset;
  }

  // only add support if the browser doesn't support data-* natively
  if (el.dataset != undefined) return;

  el.addEventListener('DOMAttrModified', detectMutation, false);
  el.setAttribute('foo', 'bar');

  function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop,{
            get : getter
        });
    } else {
        obj.__defineGetter__(prop, getter);
    }
  }

  defineElementGetter(Element.prototype, 'dataset', mutationSupported
    ? function () {
      if (!this._datasetCache) {
        this._datasetCache = updateDataset.call(this);
      }
      return this._datasetCache;
    }
    : updateDataset
  );

  document.addEventListener('DOMAttrModified', function (event) {
    delete event.target._datasetCache;
  }, false);
})();
/*======= Begin script ========*/

var build, form, items, output, ostr, params, reset, setup, update;

form   = document.forms[0];
items  = document.querySelectorAll('#nth-wrap .nth-item').length;
output = document.getElementById('output').querySelector('span');
params = form.querySelectorAll('[type=number]');

build = function (el, pseudoclass, anb) {
    'use strict';
	var select = '#nth-wrap %c.nth-item%s(%a)';
	if (!el) {
		el = '';
	}
	return select.replace(/%c/, el).replace(/%s/, pseudoclass).replace(/%a/, anb);
};

setup = function (e) {
    'use strict';
	/* Set upper/lower limits */
	[].map.call(params, function (p) {
		p.min = -items;
		p.max = +items;
	});

	if ('oninput' in window) {
		form.querySelector('div:nth-child(2)').removeChild(form.querySelector('button[type=submit]'));
	}
};

reset = function (e) {
    'use strict';
	e.preventDefault();

	var matched = document.querySelectorAll('.matched');
	[].map.call(matched, function (m) {
		m.classList.remove('matched');
	});
	
	if (e.type !== 'resetitems') {
		[].map.call(params, function (p) {
			p.value = 0;
		});
	}

	if (ostr) {
		output.replaceChild(ostr, output.firstChild);
	}
};

var update = function (e) {
    'use strict';
	e.preventDefault();

	var anb = [], nval, select, selected, what;

	[].map.call(params, function (p) {
		anb.push(+p.value);
	});


	/* If it's less than 0, use 'n' instead of n+ */
	nval = params[1].value < 0 ? 'n' : 'n+';

	anb = anb.join(nval);
	
	what = JSON.parse(form.dataset.prop);

	select   = build(what.el, what.pseudoclass, anb);
	selected = document.querySelectorAll(select);

	[].map.call(selected, function (item) {
		item.classList.add('matched');
	});

	ostr = output.replaceChild(document.createTextNode(anb), output.firstChild);
};

form.addEventListener('input', function (evt) {
	'use strict';
  var reset, submit;
	
  reset  = new CustomEvent('resetitems', {"bubbles": true, "cancelable": true});
	submit = new Event('submit');
	
	form.dispatchEvent(reset);
	form.dispatchEvent(submit);
});

window.addEventListener('load', setup);
form.addEventListener('submit', update);
form.addEventListener('reset', reset);
form.addEventListener('resetitems', reset);
