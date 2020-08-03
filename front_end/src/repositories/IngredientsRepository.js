import Repository from './Repository';
import mock from '../mocks/ingredientsMock';

const resource = '/ingredients';

export default {
    getAll() {
        // return Repository.get(`${resource}`);
        return new Promise(resolve =>
            setTimeout(() => resolve({ data: mock }), 2500)
        );
    },

    get(id) {
        return Repository.get(`${resource}/${id}`);
    },

    create(payload) {
        // return Repository.post(`${resource}/`, payload);
        // return Repository.get(`${resource}`);
        payload.id = 12;
        return new Promise(resolve =>
            setTimeout(() => resolve({ data: payload }), 2500)
        );
    },

    update(id, payload) {
        // return Repository.put(`${resource}/${id}`, payload);
        return new Promise(resolve =>
            setTimeout(() => resolve({ data: payload }), 2500)
        );
    },

    delete(id) {
        // return Repository.delete(`${resource}/${id}`);
        return new Promise(resolve =>
            setTimeout(() => resolve({ data: id }), 2500)
        );
    }
};
