export default {
    form: (e, form) => {
        const inputPrice = form.querySelector('.js-input-price');
        const inputPhone = form.querySelector('.js-input-phone');

        if(inputPrice) {
            if (isNaN(inputPrice.value)) {
                inputPrice.parentElement.classList.add('is-error');
                return false;
            } else {
                inputPrice.parentElement.classList.remove('is-error');
                return true;
            }
        }

        const regTel = /^((\+?38)-?)?(0[5-9][0-9]\d{7})$/;
        if(regTel.test(inputPhone.value)) {
            inputPhone.parentElement.classList.remove('is-error');
            return true;
        } else {
            inputPhone.parentElement.classList.add('is-error');
            return false;
        }

    },
    showPreloader: (classes) => {
        const preloader = document.querySelector('.js-preloader');
        preloader.classList.add(classes);
    },
    hidePreloader: (classes) => {
        const preloader = document.querySelector('.js-preloader');
        preloader.classList.remove(classes);
    }
}
