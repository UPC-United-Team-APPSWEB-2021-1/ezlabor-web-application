<template >
  <v-card class="custom-class" elevation="5">
    <v-img :src="user.image_url" max-width="200"></v-img>
    <v-card-title>
      <h1 >{{user.username}}</h1>
    </v-card-title>
    <v-card-text>
      <v-list width="350">
        <v-list-item>

          <v-list-item-content>Full Name:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.first_name + " " + user.last_name  }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>Email:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.email}}
          </v-list-item-content>
        </v-list-item>


    </v-card-text>

  </v-card>
</template>

<script>
import UsersApiService from '../services/users-api.service'

export default {
  name: "user-freelancer-profile",
  data() {
    return {
      id: 0,
      user: {}
    }
  },
  methods: {
    getUser(){
      UsersApiService.get(this.id)
          .then(response => {
            this.user = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    refreshUser(){
      this.getUser();
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>

<style scoped lang="scss">

</style>
