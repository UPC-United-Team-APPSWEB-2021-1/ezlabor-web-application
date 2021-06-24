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
            <v-btn @click=" navigateToAddPostulation()" > {{card.button}}</v-btn>
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
      { title: 'Freelancers disponibles', flex: 4, num:9310, button:'Buscar freelancer', route:'/', icon:'mdi-account-cash'},
      { title: 'Ofertas nuevas', flex: 4, num:124, button:'Buscar ofertas', route:'/', icon:'mdi-briefcase' },
      { title: 'Nuevos freelancer', flex: 4, num:9310, button:'Crear oferta', route:'/', icon:'mdi-newspaper-plus' }
    ],
  }),

  methods:{
    navigateToAddPostulation() {
      this.$router.push({name: '/search'});
    },
  }

}
</script>

<style scoped>

</style>
