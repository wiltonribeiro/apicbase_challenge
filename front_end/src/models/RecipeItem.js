import Ingredient from "./Ingredient";

export default class RecipeItem {
    constructor(id, ingredient, quantity) {
        this.id = id;
        this.ingredient = ingredient;
        this.quantity = quantity;
    }

    mapFromDoc(obj) {
        this.id = obj.id;
        this.quantity = obj.quantity;
        this.ingredient = new Ingredient().mapFromDoc(obj.ingredient);
        return this;
    }

    calculateCost() {
        if (this.ingredient != null) {
            return this.ingredient.cost * this.quantity;
        }
    }
}
