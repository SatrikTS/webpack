import Handlebars from 'handlebars/dist/handlebars';
import Basket from '../basket/basket';
import GetProducts from '../get-products/get-products';
import Methods from '../methods/methods';

class Products {
    constructor(item) {
        this.el = item;
        this.productList = this.el.querySelector('.js-products-list');
        this.url = this.el.getAttribute('data-url');

        this.basket = new Basket();
        //this.GetProducts = new GetProducts();

        this.templates = {
            product: '#product-hbtpl'
        };

        this.classes = {
            show: 'is-show'
        }

        this.init();
    }

    /*
    * Выполняем инициализацию
    */
    init() {
        this.renderProducts().then((product) => {
            this.basket.addToBasket(product);
            Methods.hidePreloader(this.classes.show);


            product.forEach((item, i) => {
                var img = document.createElement('img');
                img.src = localStorage.getItem('img');
                var localImg = JSON.parse(localStorage.getItem('img'));
                if(localImg[i]) {
                    img.src = localImg[i].image
                    img.width = 200;
                    img.height = 200;
                    item.querySelector('.js-product-img').append(img)
                }
            })
        });
    }

    /**
    * Рендерим товары при загрузке страницы
    */
    renderProducts() {
        return new Promise((resolve, reject) => {
            Methods.showPreloader(this.classes.show);
            GetProducts.getProducts(this.url, this.templates.product, this.productList);
            setTimeout( ()=> {
                const product = this.productList.querySelectorAll('.js-product');
                resolve(product);
            }, 1000);
        })
    }

}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-products')
        .forEach((item) => {
            new Products(item);
        });
});
