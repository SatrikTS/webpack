import GetProducts from '../get-products/get-products'
// Подгружаем данные о заказе в админку
class AdminOrders {
    constructor(item) {
        this.el = item;
        this.url = this.el.getAttribute('data-url');
        this.orderList = this.el.querySelector('.js-admin-orders-list');

        this.templates = {
            order: '#admin-order-hbtpl',
        };

        this.init();

    }

    init() {
        GetProducts.getProducts(this.url, this.templates.order, this.orderList);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-admin-orders')
        .forEach((item) => {
            new AdminOrders(item);
        });
});
