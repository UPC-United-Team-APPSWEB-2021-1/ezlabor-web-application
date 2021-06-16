<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Postulation</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Postulation Id"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Description"></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field v-model="item.desiredPayment" label="Desired Payment"></v-text-field>
        </v-col>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-checkbox v-model="item.published" label="Published"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostulationsApiService from "@/services/ezlabor-api.service";

export default {
  name: "edit-postulation",
  data() {
    return {
      item: {
        id: 0,
        description: '',
        desiredPayment: '',
        published: false
      }
    }
  },
  methods: {
    retrievePostulation(id) {
      PostulationsApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      PostulationsApiService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToPostulations();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToPostulations();
    },
    navigateToPostulations() {
      this.$router.push({name: 'postulations'});
    }
  },
  created() {
    this.retrievePostulation(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>