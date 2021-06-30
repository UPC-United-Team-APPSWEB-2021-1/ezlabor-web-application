<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
      >
        <v-card flat class="deep-purple accent-2 mx-auto" >
          <v-card-title v-text="card.title">
          </v-card-title>

          <v-card-text>
            <v-avatar size="120">
              <v-icon size="100"> {{card.icon}}</v-icon>
            </v-avatar>

            <p class="text-h4 text--primary" v-text="card.num">

            </p>

            <div class="text--primary">

            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="navigateTo(card.route) " > {{card.button}}</v-btn>
          </v-card-actions>


        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "dashboard-stats",

  data: () => ({


    cards: [
      { title: 'Nuevas ofertas disponibles', flex: 4, num:'', button:'Buscar trabajo', route:'Search', icon:'mdi-account-cash'},
      { title: 'Nuevos freelancers registrados', flex: 4, num:'', button:'Crear ofertas', route:'Create', icon:'mdi-briefcase' },
      { title: 'Ver como van mis postulaciones', flex: 4, num:'', button:'Mis postulaciones', route:'Postulations', icon:'mdi-newspaper-plus' }
    ],
  }),

  methods:{
    navigateTo(string) {
      this.$router.push({name: string});
    },



  }

}
</script>

<style scoped>

</style>
