class Popup {
    constructor(item) {
        this.el = item;

        this.classes = {
            hidden: 'is-hidden'
        }

        this.setListeners();
    }

    setListeners() {
        this.el.addEventListener('click', (e) => {
            if (e.target === this.el) {
                this.el.classList.add(this.classes.hidden)
            }
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-popup')
        .forEach((item) => {
            new Popup(item);
        });
});
