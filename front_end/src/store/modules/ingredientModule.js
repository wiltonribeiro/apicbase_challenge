import { RepositoryFactory } from '../../repositories/RepositoryFactory';
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
                    ingredients: res,
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
