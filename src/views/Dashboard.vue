<template>
<v-app class="grey lighten-4">
  <dashboard-stats></dashboard-stats>

  <v-card class="grey lighten-4" flat height="100">

    <v-card-title class="align-center">Ultimas actualizaciones</v-card-title>

  </v-card>
  <dashboard-table ></dashboard-table>

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
