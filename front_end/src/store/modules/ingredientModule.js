import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import Ingredient from '../../models/Ingredient';
const ingredientsRepository = RepositoryFactory.get('ingredient');

const state = {
    ingredients: [],
    loading: false,
    error: null
};

const mutations = {
    setError: (state, payload) => {
        state.error = payload;
    },
    setLoading: (state, payload) => {
        state.loading = payload;
    },
    setIngredients: (state, payload) => {
        state.ingredients = payload;
    },
    updateState(state, obj) {
        const keys = Object.keys(obj);
        keys.forEach(key => (state[key] = obj[key]));
    }
};

const actions = {
    fetchAll: function(context) {
        context.commit('setLoading', true);

        ingredientsRepository
            .getAll()
            .then(res => {
                context.commit('updateState', {
                    ingredients: res.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    create: function(context, { name, description, unit, cost }) {
        context.commit('setLoading', true);

        let ingredient = new Ingredient(
            null,
            name,
            parseFloat(cost),
            unit,
            description
        );

        ingredientsRepository
            .create(ingredient)
            .then(res => {
                let copyArray = [...context.state.ingredients];
                copyArray.unshift(res.data);

                context.commit('setIngredients', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    update: function(context, { id, name, description, unit, cost }) {
        context.commit('setLoading', true);

        let ingredient = new Ingredient(
            id,
            name,
            parseFloat(cost),
            unit,
            description
        );

        ingredientsRepository
            .update(ingredient)
            .then(() => {
                let copyArray = [...context.state.ingredients];
                let index = copyArray.findIndex(
                    item => item.id === ingredient.id
                );

                copyArray[index] = ingredient;
                context.commit('setIngredients', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    delete: function(context, id) {
        context.commit('setLoading', true);

        ingredientsRepository
            .delete(id)
            .then(() => {
                let copyArray = [...context.state.ingredients];
                let index = copyArray.findIndex(item => item.id === id);

                copyArray.splice(index, 1);
                context.commit('setIngredients', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    }
};

const getters = {
    getIngredients: state => state.ingredients,
    getStatus: state => {
        return {
            error: state.error,
            loading: state.loading
        };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
