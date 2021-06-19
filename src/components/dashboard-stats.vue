<template>
  <v-container fluid>
    <v-row>
      <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
      >
        <v-card elevation="10" class="mx-auto" >
          <v-card-title v-text="card.title">
          </v-card-title>

          <v-card-text>
            <div>Word of the Day</div>
            <p class="text-h4 text--primary" v-text="card.num">

            </p>
            <p>adjective</p>
            <div class="text--primary">
              relating to or dependent on charity; charitable.<br>
              "an eleemosynary educational institution."
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                text
                color="teal accent-4"
                @click="card.reveal = true"
            >
              Ver más
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
                v-if="card.reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <p class="text-h4 text--primary">
                  Origin
                </p>
                <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                    text
                    color="teal accent-4"
                    @click="card.reveal = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>


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
      { title: 'Freelancers hoy', flex: 4, reveal:false, num:94310 },
      { title: 'Nuevas ofertas de trabajo', flex: 4, reveal:false, num:7210  },
      { title: 'Trabajos totales', flex: 4, reveal:false, num:731240  },
    ],
  }),


}
</script>

<style scoped>

</style>
