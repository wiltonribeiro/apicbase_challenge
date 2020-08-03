import RecipeItem from './RecipeItem';

export default class Recipe {
    constructor(id, name, originCountry, recipeItems) {
        this.id = id;
        this.name = name;
        this.recipeItems = recipeItems;
        this.originCountry = originCountry;
    }

    mapFromDoc(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.originCountry = obj.originCountry;
        this.recipeItems = obj.recipeItems.map(item =>
            new RecipeItem().mapFromDoc(item)
        );
        return this;
    }

    calculateTotalCost() {
        return this.recipeItems.reduce(
            (acumulador, item) => acumulador + item.calculateCost(),
            0
        );
    }
}
