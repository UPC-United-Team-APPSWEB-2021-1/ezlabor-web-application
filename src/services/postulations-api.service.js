import http from './http.common';

class PostulationsApiService {
    getAll() {
        return http.get('/create-postulation');
    }
    get(id) {
        return http.get(`/create-postulation/${id}`);
    }

    create(data) {
        return http.post("/create-postulation", data);
    }

    update(id, data) {
        return http.put(`/create-postulation/${id}`, data);
    }

    delete(id) {
        return http.delete(`/create-postulation/${id}`);
    }

    deleteAll() {
        return http.delete(`/create-postulation`);
    }

}

export default new PostulationsApiService();
