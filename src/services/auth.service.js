// auth.service.js
// Authentication Service
import axios from 'axios';

const API_URL = 'https://localhost:44361/api/users/authenticate';
class AuthService {
    login(user) {
        console.log('About to request');
        return axios.post(API_URL, JSON.stringify({
            username: user.username,
            password: user.password}),
            {headers: {'Content-Type': 'application/json'}})
            .then(function (response)  {
                console.log(`Response arrived with status ${response.status}`);

                if (response.data.token) {
                    console.log(`user: ${response.data}`);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch(function (error)  {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                    console.log(error.response.headers);
                } else if (error.request) {
                        console.log(error.request);
                } else {
                    console.log(error.message);
                }
                console.log(error.config);
                return error;
            });
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post(API_URL + 'sign-up', {

            username: user.username ,
            email: user.email ,
            password: user.password ,
            subscription_active: user.subscription_active ,
            first_name: user.first_name ,
            last_name: user.last_name ,
            birth_date: user.birth_date ,
            description: user.description ,
            phone: user.phone ,
            personal_web: user.personal_web ,
            register_date: user.register_date ,
            district_id: user.district_id ,
            rating: user.rating ,
            facebook_link: user.facebook_link ,
            instagram_link: user.instagram_link ,
            twitter_link: user.twitter_link,
            image_url: user.image_url ,
        });
    }
}

export default new AuthService();
