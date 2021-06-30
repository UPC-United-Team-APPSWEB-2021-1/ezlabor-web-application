<template>
<v-app class="deep-purple lighten-5">
  <dashboard-stats></dashboard-stats>

  <v-card class="deep-purple lighten-5" flat height="100">

    <v-card-title class="align-center">Ultimas actualizaciones</v-card-title>

  </v-card>
  <v-card class="deep-purple lighten-5 mx-auto" width="1400" >
    <dashboard-table ></dashboard-table>
  </v-card>


</v-app>
</template>

<script>
import DashboardStats from "../components/dashboard-stats";
import DashboardTable from "@/components/dashboard-table";
export default {
name: "Dashboard",
  components: {DashboardTable, DashboardStats}
}
</script>

<style scoped>

</style>
