export default class Basket {
    constructor() {
        this.basketCount = document.querySelector('.js-basket-count');
        this.basketRemove = document.querySelector('.js-basket-remove');
        this.counter = 0;
    }

    setListeners() {
        this.basketRemove.addEventListener('click', () => {
            removeBasket();
        })
    }

    addBasket() {
        this.counter++;
        this.basketCount.innerHTML = this.counter;
    }

    removeBasket() {
        this.counter--;
        this.basketCount.innerHTML = this.counter;
    }

    setListeners() {
        this.element.addEventListener('click', () => {
            console.log(this);
        })
    }

}
