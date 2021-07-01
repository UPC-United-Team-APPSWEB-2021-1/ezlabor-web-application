<template>
  <div class="pending" >
    <v-simple-table v-slot:default >
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
          Fecha
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
            v-for="item in postulations"
            :key="item.id"
        >
          <td class="text-left"> {{ item.id }}</td>
          <td class="text-left">{{ item.presentationMessage }}</td>
          <td class="text-left">{{ item.postulationDate }}</td>
          <td class="text-left">{{ item.state }}</td>
          <td class="text-left"> <v-btn @click="navigateToPostulations" color="deep-purple accent-2">Ver</v-btn></td>

        </tr>
        </tbody>

      </template>

    </v-simple-table>

  </div>
</template>

<script>
import PostulationsApiService from "@/services/postulations-api.service";

export default {
name: "dashboard-table",
  data () {
    return {

      postulations:[],

      information:[
          {id:1, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:2, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:3, name: 'UX Design', description: 'Busco empleado', state:'pending'},
        {id:4, name: 'UX Design', description: 'Busco empleado', state:'pending'},

      ]
    }
  },

  methods:{

    retrievePostulations() {
      PostulationsApiService.getAll()
          .then(response => {
            this.postulations = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrievePostulations();
    },

    navigateToPostulations() {
      this.$router.push({name: 'Postulations'});
    },



  },
  mounted() {
    this.retrievePostulations();
  }
}
</script>

<style scoped>

</style>
