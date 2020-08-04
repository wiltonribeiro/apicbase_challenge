import Repository from './Repository';

const resource = '/recipes';

export default {
    getAll() {
        return Repository.get(`${resource}`);
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
