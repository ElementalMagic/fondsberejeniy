var amount;
var label = document.getElementById('sliderLabel');
initialCalc();
$(function () {
    $('#slider').on("input", function (event) {
        var slider = event.target;
        var value = parseInt(slider.value);
        var diff, initValue, step;
        label.innerText = parseInt(slider.value).toLocaleString();
        if (value < 46) {
            step = 20000;
            diff = value;
            initValue = 100000;
        } else if (value < 77) {
            step = 100000;
            diff = value - 45;
            initValue = 1000000;
        } else {
            step = 250000;
            diff = value - 76;
            initValue = 4000000;
        }
        value = Math.floor(step * diff + initValue);
        if (value < 100000) value = 100000;
        label.innerText = value.toLocaleString() + ' Р';

        var result = value * (0.18 / 12 * $('#period').val());
        amount = value;
        $('#res')[0].innerText = Math.floor(result).toLocaleString();
    })
});

var periodLabel = document.getElementById('periodLabel');
$(function () {
    $('#period').on('input', function (event) {
        var slider = event.target;
        var value = parseInt(slider.value);
        var monthRes = '', yearRes = '';
        var monthsCount = value % 12;
        var yearsCount = Math.floor(value / 12);
        var labelRes;
        if (monthsCount !== 0) {
            var pres = '';
            switch (monthsCount) {
                case 1: {
                    pres = ' месяц';
                    break;
                }
                case 2:
                case 3:
                case 4: {
                    pres = ' месяца';
                    break;
                }
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11: {
                    pres = ' месяцев';
                    break;
                }
            }
            monthRes = monthsCount + pres;
        }
        if (yearsCount !== 0) {
            if (yearsCount === 1) {
                yearRes = '1 год'
            }
            if (yearsCount === 2) {
                yearRes = '2 года'
            }
            if (yearsCount === 3) {
                yearRes = '3 года'
            }
        }

        if (monthsCount === 0) {
            labelRes = yearRes;
        } else if (yearsCount === 0) {
            labelRes = monthRes;
        } else {
            labelRes = yearRes + ' и ' + monthRes;
        }

        periodLabel.innerText = labelRes;
        var result = amount * (0.18 / 12 * $('#period').val());
        $('#res')[0].innerText = Math.floor(result).toLocaleString();
    })
})

function initialCalc() {
    var slider = $('#slider')[0];
    var value = parseInt(slider.value);
    var diff, initValue, step;
    label.innerText = parseInt(slider.value).toLocaleString();
    if (value < 46) {
        step = 20000;
        diff = value;
        initValue = 0;
    } else if (value < 77) {
        step = 100000;
        diff = value - 45;
        initValue = 1000000;
    } else {
        step = 250000;
        diff = value - 76;
        initValue = 4000000;
    }
    value = Math.floor(step * diff + initValue);
    if (value < 100000) value = 100000;
    label.innerText = value.toLocaleString() + ' Р';

    var result = value * (0.18 / 12 * $('#period').val());
    amount = value;
    $('#res')[0].innerText = Math.floor(result).toLocaleString();
}