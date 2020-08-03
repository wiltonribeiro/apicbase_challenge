export default class Ingredient {
    constructor(id, name, cost, unit, description) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.unit = unit;
        this.description = description;
    }

    mapFromDoc(obj) {
        const keys = Object.keys(this);
        keys.forEach(prop => (this[prop] = obj[prop]));
        return this;
    }
}
