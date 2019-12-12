import Handlebars from 'handlebars/dist/handlebars';

class AddProduct {
    constructor(item) {
        this.el = item;
        this.url = this.el.getAttribute('action');
        this.productList = document.querySelector('.js-products-list');

        this.params = {
            img: 'some.png',
            price: 33,
            available: true,
            title: 'Some test',
            desc: 'some text'
        }

        this.templates = {
            product: '#product-add-hbtpl',
            msg: '#product-msg-hbtpl'
        };

        this.setListeners();
    }

    setListeners() {
        this.el.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendNewProduct();
        })
    }

    /**
    * компиляция handlebars-template
    */
    static prepareTpl(templateSelector, data) {
        const templateProduct = document.querySelector(templateSelector).innerHTML;
        const containerTpl = Handlebars.compile(templateProduct);
        return containerTpl(data);
    }

    showroductList(data) {
        console.log(data);
        this.productList.insertAdjacentHTML('afterBegin', AddProduct.prepareTpl(this.templates.product, data));
    }

    showMsg() {
        document.body.insertAdjacentHTML('afterBegin', AddProduct.prepareTpl(this.templates.msg, true));
    }

    sendNewProduct() {
        fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.params)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.showMsg();
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-product-form')
        .forEach((item) => {
            new AddProduct(item);
        });
});
