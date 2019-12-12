import Handlebars from 'handlebars/dist/handlebars';
import Basket from '../basket/basket';

class Products {
    constructor(item) {
        this.el = item;
        this.productList = this.el.querySelector('.js-products-list');
        this.url = this.el.getAttribute('data-url');
        this.method = this.el.getAttribute('data-method');

        this.addBasketBtn = '';

        this.Basket = new Basket();

        this.addBasketState = {
            product: [

            ]
        };

        this.templates = {
            product: '#product-hbtpl',
        };

        this.init();
        this.setListeners();
    }

    /*
    * Выполняем действия при инициализации
    */
    init() {
        this.getProducts();
        this.getResponse();
        this.addToBasket();
    }

    setListeners() {

    }




    /**
    * компиляция handlebars-template
    */
    static prepareTpl(templateSelector, data) {
        const templateProduct = document.querySelector(templateSelector).innerHTML;
        const containerTpl = Handlebars.compile(templateProduct);
        return containerTpl(data);
    }

    /**
    * Рендерим ответ
    */
    getResponse(data) {
        this.productList.insertAdjacentHTML('afterBegin', Products.prepareTpl(this.templates.product, data));

        const product = this.el.querySelectorAll('.js-product');
        const productCarBtn = document.querySelectorAll('.js-add-to-cart');

        product.forEach((item) => {
            const cartBtn = item.querySelector('.js-add-to-basket')

            cartBtn.addEventListener('click', () => {
                const productId = item.getAttribute('data-id');
                this.Basket.addBasket();
            })
        })
    }

    addToBasket() {

    }

    /**
    * Запрашиваем список товаров
    */
    getProducts() {
        fetch(this.url, {
            method: this.method
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.getResponse(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-products')
        .forEach((item) => {
            new Products(item);
        });
});
