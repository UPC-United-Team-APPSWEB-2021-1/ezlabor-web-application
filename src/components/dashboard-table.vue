<template>
  <v-card width="600" class="mx-auto mt-5" >
    <v-card-title> <h2>Ofertas pendientes</h2> </v-card-title>

    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in desserts"
            :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
name: "dashboard-table",
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        }
      ],
    }
  },
}
</script>

<style scoped>

</style>
