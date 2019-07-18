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
});

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

var modal = {
    el: $('#modal')[0],
    formElems: [],
    phoneInputField: '',
    phoneMaskConfig: {mask: '+{7} (000) 000-00-00'},
    phoneMask: null,
    checkValid: function () {
        let valid = true;
        if ($('#name')[0].value < 1) valid = false;
        if ($('#phone')[0].value < 18) valid = false;
        return valid
    },
};
$(function () {
    initButtons();
    initModal();
});

function initButtons() {
    var butArr = $('.modal-button-open');
    console.log(butArr);
    [].forEach.call(butArr, function (button) {
        button.addEventListener('click', function () {
            modal.el.classList.add('is-active');
        })
    });

    $('.modal-close').on('click', function () {
        modal.el.classList.remove('is-active');
    });
    $('#button_ok').on('click', function () {
        modal.el.classList.remove('is-active');
    });
    $('#submit').on('click', function () {
        let body = {
            name: $('#name')[0].value,
            phone: $('#phone')[0].value,
            request_key: 'nhbnjy'
        };
        $('#submit').attr('disabled', true);
        $('#name').attr('disabled', true);
        $('#phone').attr('disabled', true);

        axios.post('https://fondsberinvest.ru/api/order/mail', body)
            .then(res => {
                $('#submit')[0].style = 'display: none';
                $('#button_ok')[0].style = '';
            })
            .catch(err => {
                $('#submit')[0].innerText = 'Произошла ошибка, попробуйте позже!';

            })
            .finally(() => {
                $('#submit').attr('disabled', false);
                $('#name').attr('disabled', false);
                $('#phone').attr('disabled', false);
            })
    })
}

function initModal() {
    modal.formElems = [
        $('#name')[0],
        $('#phone')[0]
    ];
    modal.phoneInputField = $('#phone')[0];
    modal.phoneMask = new IMask(modal.phoneInputField, modal.phoneMaskConfig);
    modal.phoneMask.value = '7';

    for (let i = 0; i < modal.formElems.length; i++) {
        const formElem = modal.formElems[i];

        formElem.addEventListener('blur', function (event) {
            if (!event.target.checkValidity()) {
                event.target.style = 'border: 1px solid red'
            } else {
                event.target.style = 'border: 1px solid #9e9e9e'
            }
        });
        formElem.addEventListener('input', function (event) {
            if (!modal.checkValid()) {
                $('#submit')[0].setAttribute("disabled", "disabled");
            } else {
                $('#submit')[0].removeAttribute("disabled");
            }

            if (event.target.id !== 'phone') {
                if (event.target.checkValidity()) {
                    event.target.style = 'border: 1px solid #9e9e9e'
                }

                if (event.target.value.length > 0) {
                    event.target.classList.add('focus')
                } else {
                    event.target.classList.remove('focus')
                }
            } else {
                if (event.target.value === '+7' || event.target.value === '') {
                    this.phoneMask.value = '7'
                }
            }
        })
    }


}