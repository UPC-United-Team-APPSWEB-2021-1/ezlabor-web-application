<template>
  <div class="pending">
    <v-simple-table v-slot:default>
      <template>

      <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Nombre
        </th>
        <th class="text-left">
          Descripcion
        </th>
        <th class="text-left">
          Estado
        </th>
        <th class="text-left">
          Acciones
        </th>
      </tr>
      </thead>
        <tbody>
        <tr
            v-for="item in information"
            :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.state }}</td>

        </tr>
        </tbody>

      </template>

    </v-simple-table>

  </div>
</template>

<script>
export default {
name: "dashboard-table",
  data () {
    return {
      information:[
          {id:1, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:2, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:3, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:4, name: 'UX Design', description: 'Busco empleado', state:'pending'},

      ]
    }
  },
}
</script>

<style scoped>

</style>
