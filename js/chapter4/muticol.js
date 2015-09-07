var init = function () {
       
    CSSHelpers.styleSheetTitle = 'MultiColumn';

    var form, styleSheet, updateStyle

    form = document.getElementById('multi');
    styleSheet = CSSHelpers.getStyleSheet(CSSHelpers.styleSheetTitle);

    updateStyle = function(e){
       var cnval;

       if(e.target.id == 'column-number') {
            cnval = [];

            cnval[0] = document.querySelector('#column-width').value;
            cnval[1] = ' ';
            cnval[2] = document.querySelector('#column-number').value;

            CSSHelpers.setProp('multi-col', 'columns', cnval.join(''));
       }  else {
            cnval = e.target.value;
            CSSHelpers.setProp('multi-col', e.target.id, cnval);
       }
    }

    form.addEventListener('input', updateStyle);
    form.addEventListener('change', updateStyle);
    form.addEventListener('submit', CSSHelpers.preventSubmit);
    form.addEventListener('reset', CSSHelpers.resetRules);

};

window.addEventListener('load', init);