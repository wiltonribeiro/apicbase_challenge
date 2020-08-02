// eslint-disable-next-line no-unused-vars
class Recipe {
    constructor() {
        this.id = 0;
        this.name = '';
        this.ingredientItems = [];
        this.originCountry = '';
    }

    mapFromDoc(obj) {
        const keys = Object.keys(this);
        keys.forEach(prop => (this[prop] = obj[prop]));
    }

    calculateTotalCost() {
        return this.ingredientItems.reduce(
            (acumulador, item) => acumulador + item.calculateCost,
            0
        );
    }
}
