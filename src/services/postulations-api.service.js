import http from './http.common';

class PostulationsApiService {
    getAll() {
        return http.get('/postulations');
    }
    get(id) {
        return http.get(`/postulations/${id}`);
    }

    create(data) {
        return http.post("/postulations", data);
    }

    update(id, data) {
        return http.put(`/postulations/${id}`, data);
    }

    delete(id) {
        return http.delete(`/postulations/${id}`);
    }

    deleteAll() {
        return http.delete(`/postulations`);
    }

}

export default new PostulationsApiService();
