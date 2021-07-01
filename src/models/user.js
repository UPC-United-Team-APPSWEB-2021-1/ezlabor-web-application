// user.js
// User Class

export default class User {
    constructor(id, username, email, password, subscription_active, first_name, last_name, birth_date, description, phone, personal_web, register_date, district_id, rating, facebook_link, instagram_link, twitter_link, image_url ) {

        this.id =  id;
        this.username =  username;
        this.email =  email;
        this.password =  password;
        this.subscription_active =  subscription_active;
        this.first_name =  first_name;
        this.last_name =  last_name;
        this.birth_date =  birth_date;
        this.description =  description;

        this.phone =  phone;
        this.personal_web =  personal_web;
        this.register_date =  register_date;
        this.district_id =  district_id;
        this.rating =  rating;
        this.facebook_link =  facebook_link;
        this.instagram_link =  instagram_link;
        this.twitter_link =  twitter_link;
        this.image_url =  image_url;
    }
}
