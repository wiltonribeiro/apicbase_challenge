// eslint-disable-next-line no-unused-vars
class RecipeItem {
    constructor() {
        this.id = 0;
        this.ingredient = null;
        this.quantity = 0;
    }

    mapFromDoc(obj) {
        const keys = Object.keys(this);
        keys.forEach(prop => (this[prop] = obj[prop]));
    }

    calculateCost() {
        if (this.ingredient != null) return this.quantity.cost * this.quantity;
    }
}
