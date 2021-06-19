<template>
<v-app>
  <dashboard-stats></dashboard-stats>
  

  <v-divider></v-divider>
  <dashboard-table></dashboard-table>

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
