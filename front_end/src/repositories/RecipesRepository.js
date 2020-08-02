import Repository from './Repository';
import mock from '../mocks/recipesMock';

const resource = '/recipes';

export default {
    getAll() {
        // return Repository.get(`${resource}`);
        return new Promise(resolve => setTimeout(() => resolve(mock), 2500));
    },

    get(id) {
        return Repository.get(`${resource}/${id}`);
    },

    create(payload) {
        return Repository.post(`${resource}/`, payload);
    },

    update(id, payload) {
        return Repository.put(`${resource}/${id}`, payload);
    },

    delete(id) {
        return Repository.delete(`${resource}/${id}`);
    }
};
