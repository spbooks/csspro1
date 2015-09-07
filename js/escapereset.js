var keyHandler = function (e) {
    'use strict';
    if (e.keyCode === 27) {
        var reset = document.createEvent('Event');
        reset.initEvent('reset', true, false);
        document.forms[0].dispatchEvent(reset);
    }
};
window.addEventListener('keypress', keyHandler, true);
window.addEventListener('keydown', keyHandler, true);