<template>

  <v-app>


        <dashboard-stats></dashboard-stats>
        <dashboard-table></dashboard-table>

        <!-- If using vue-router -->
        <router-view></router-view>

  </v-app>


</template>
<script>
import DashboardStats from "@/components/dashboard-stats";
import DashboardTable from "@/components/dashboard-table";
export default {
  components: {DashboardTable, DashboardStats}
}
</script>
