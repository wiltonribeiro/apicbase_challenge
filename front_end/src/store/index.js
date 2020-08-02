import Vue from 'vue';
import Vuex from 'vuex';
import recipeModule from './modules/recipeModule';
import ingredientModule from './modules/ingredientModule';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        recipe: recipeModule,
        ingredient: ingredientModule
    }
});
