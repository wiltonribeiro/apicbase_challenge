import RecipeItem from './RecipeItem';

export default class Recipe {
    constructor(id, name, origin_country, items) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.origin_country = origin_country;
    }

    mapFromDoc(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.origin_country = obj.origin_country;
        this.items = obj.items.map(item =>
            new RecipeItem().mapFromDoc(item)
        );
        return this;
    }

    calculateTotalCost() {
        return this.items.reduce(
            (acumulador, item) => acumulador + item.calculateCost(),
            0
        );
    }
}
