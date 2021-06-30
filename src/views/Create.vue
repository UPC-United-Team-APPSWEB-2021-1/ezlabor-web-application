<template>
  <v-app class="deep-purple lighten-5">
    <create-offers></create-offers>
  </v-app>
</template>

<script>
import createOffers from "../components/create-offer";
export default {
  name: "Create",
  components: {
    createOffers
  }


}
</script>

<style scoped>

</style>
