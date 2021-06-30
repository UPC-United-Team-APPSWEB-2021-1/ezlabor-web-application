// user.js
// User Class

export default class User {
    constructor(id, username, email, password, first_name, last_name, rating, image_url ) {

        this.id =  id;
        this.username =  username;
        this.email =  email;
        this.password =  password;
        this.first_name =  first_name;
        this.last_name =  last_name;



        this.rating =  rating;

        this.image_url =  image_url;
    }
}
