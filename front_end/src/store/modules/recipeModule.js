import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import Recipe from '../../models/Recipe';
const recipesRepository = RepositoryFactory.get('recipe');

const state = {
    recipes: [],
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
    setRecipes: (state, payload) => {
        state.recipes = payload;
    },
    updateState(state, obj) {
        const keys = Object.keys(obj);
        keys.forEach(key => (state[key] = obj[key]));
    }
};

const actions = {
    fetchAll: function(context) {
        context.commit('setLoading', true);

        recipesRepository
            .getAll()
            .then(res => {
                let recipes = res.data.map(item =>
                    new Recipe().mapFromDoc(item)
                );

                context.commit('updateState', {
                    recipes: recipes,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    create: function(context, recipe) {
        context.commit('setLoading', true);

        recipesRepository
            .create(recipe)
            .then(res => {
                let copyArray = [...context.state.recipes];
                copyArray.unshift(new Recipe().mapFromDoc(res.data));

                context.commit('setRecipes', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    update: function(context, recipe) {
        context.commit('setLoading', true);

        recipesRepository
            .update(recipe.id)
            .then((res) => {
                let copyArray = [...context.state.recipes];
                let index = copyArray.findIndex(item => item.id === recipe.id);

                copyArray[index] = new Recipe().mapFromDoc(res.data);
                context.commit('setRecipes', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    },
    delete: function(context, id) {
        context.commit('setLoading', true);

        recipesRepository
            .delete(id)
            .then(() => {
                let copyArray = [...context.state.recipes];
                let index = copyArray.findIndex(item => item.id === id);

                copyArray.splice(index, 1);
                context.commit('setRecipes', copyArray);
                context.commit('setLoading', false);
            })
            .catch(error => {
                console.log(error);
                context.commit('updateState', { error: error, loading: false });
            });
    }
};

const getters = {
    getRecipes: state => state.recipes,
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
