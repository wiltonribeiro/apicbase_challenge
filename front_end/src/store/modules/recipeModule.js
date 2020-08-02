import { RepositoryFactory } from '../../repositories/RepositoryFactory';
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
                context.commit('updateState', {
                    recipes: res,
                    loading: false
                });
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
