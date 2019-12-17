import Handlebars from 'handlebars/dist/handlebars';

export default class ShowMessages {
    constructor() {

        this.templates = {
            msg: '#product-msg-hbtpl'
        };
    }

    /**
    * компиляция handlebars-template
    */
    prepareTpl(templateSelector, data) {
        const templateProduct = document.querySelector(templateSelector).innerHTML;
        const containerTpl = Handlebars.compile(templateProduct);
        return containerTpl(data);
    }

    /**
    * Показать/скрыть сообщение
    */
    showMsg(data) {
        document.body.insertAdjacentHTML('afterBegin', this.prepareTpl(this.templates.msg, data));
        const msg = document.querySelector('.js-alert-msg');
        setTimeout(() => {
            msg.remove();
        }, 2500);
    }
}
