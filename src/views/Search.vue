<template>
  <v-card>
    <v-card-title>
      Search new offers
    </v-card-title>
    <v-card-text>
      <offers></offers>
    </v-card-text>
  </v-card>
</template>

<script>
import offers from "@/components/offers";
export default {
  name: "Search",
  components: {
    offers
  }
}
</script>

<style scoped>

</style>
