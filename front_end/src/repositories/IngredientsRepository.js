import Repository from './Repository';
// import mock from '../mocks/ingredientsMock';

const resource = '/ingredients';

export default {
    getAll() {
        return Repository.get(`${resource}`);
    },

    get(id) {
        return Repository.get(`${resource}/${id}`);
    },

    create(payload) {
        return Repository.post(`${resource}`, payload);
    },

    update(id, payload) {
        return Repository.put(`${resource}/${id}`, payload);
    },

    delete(id) {
        return Repository.delete(`${resource}/${id}`);
    }
};
