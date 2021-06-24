<template>

  <v-app>
<v-card>
  <v-card-title>
    About us
  </v-card-title>
</v-card>
    <offers></offers>

        <!-- If using vue-router -->
        <router-view></router-view>

  </v-app>


</template>
<script>

import Offers from "@/components/offers-search";
export default {
  components: {Offers}
}
</script>
