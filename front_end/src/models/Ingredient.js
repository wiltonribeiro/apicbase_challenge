// eslint-disable-next-line no-unused-vars
class Ingredient {
    constructor() {
        this.id = 0;
        this.name = '';
        this.cost = 0.0;
        this.unit = '';
        this.description = '';
    }

    mapFromDoc(obj) {
        const keys = Object.keys(this);
        keys.forEach(prop => (this[prop] = obj[prop]));
    }
}
