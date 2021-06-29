<template>
  <v-card>
    <v-dialog v-model="showApplicationDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Offer Application</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-row>
              <v-text-field v-model="postulationDialogItem.offerId" type="number" label="Offer Id"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="postulationDialogItem.freelancerId" type="number" label="Freelancer Id"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="postulationDialogItem.presentationMessage" label="Presentation Message"></v-text-field>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeOfferPostulationDialog">Cancel</v-btn>
          <v-btn text @click="createPostulation">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title>
      Offers
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-data-iterator
          :items="offers"
          :items-per-page="5"
          :search="search"

          hide-default-footer
          ref="offersTable">
        <!--:custom-filter="filterBySearch"-->
        <template v-slot:header>

          <v-spacer></v-spacer>

        </template>




        <template v-slot:default>
          <div>


            <v-col
                cols="12">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#794DFF" dark class="mb-2" v-bind="attrs" v-on="on">Filtrar</v-btn>
              </template>
              <v-card class="filterCard">
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                  >
                    <v-card-title>
                      <span class="headline">Filtrar por pago</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container fluid>
                        <v-row>
                          <v-radio-group
                              v-model="paymentFilter"
                              column
                          >
                            <v-radio
                                label="All"
                                value="f1"
                                id="f1-radius"
                            ></v-radio>
                            <v-radio
                                label="Hasta 1000"
                                value="f2"
                                id="f2-radius"
                            ></v-radio>
                            <v-radio
                                label="De 1000 hasta 2000"
                                value="f3"
                                id="f3-radius"
                            ></v-radio>
                            <v-radio
                                label="De 2000 hasta 5000"
                                value=">f4"
                                id="f4-radius"
                            ></v-radio>
                            <v-radio
                                label="De 5000 hasta 10000"
                                value=">f5"
                                id="f5-radius"
                            ></v-radio>
                            <v-radio
                                label="Desde 10000"
                                value="f6"
                                id="f6-radius"
                            ></v-radio>
                          </v-radio-group>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-col>

                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                  >
                    <v-card-title>
                      <span class="headline">Filtrar por especialidad</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container fluid>
                        <v-checkbox
                            id="CB-1"
                            v-model="selected"
                            label="Diseño gráfico"
                            value="Diseño gráfico"
                        ></v-checkbox>
                        <v-checkbox
                            id="CB-2"
                            v-model="selected"
                            label="Programación web"
                            value="Programación web"
                        ></v-checkbox>
                        <v-checkbox
                            id="CB-3"
                            v-model="selected"
                            label="Programación de apps"
                            value="Programación de apps"
                        ></v-checkbox>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="applyFilter">Apply</v-btn>
                        </v-card-actions>
                      </v-container>
                    </v-card-text>

                  </v-col>
                </v-row>

              </v-card>
            </v-col>
          </div>
          <div>

            <v-row >

              <v-col
                  v-for="offer in offersActive"
                  :key="offer.title"

                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-card class="purple darken-1">
                  <v-card-title class="cardTitle  font-weight-bold align-center">
                    {{ offer.title }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense >
                    <v-list-item>
                      <v-list-item-content>Payment:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ offer.payment }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>Specialty:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ offer.specialty }}
                      </v-list-item-content>
                    </v-list-item>


                    <v-list-item>
                      <v-list-item-content>Created at:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ offer.createdAt }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>State:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ offer.state }}
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>Duration:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ offer.duration }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-btn @click="openOfferPostulationDialog()" color="white" text>Apply for this job</v-btn>
                  </v-card-actions>


                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>


      </v-data-iterator>

    </v-card-text>
  </v-card>



</template>


<script>
import OffersApiService from '../services/offers-api.service';
import PostulationsApiService from '../services/postulations-api.service';

export default {
  name: "offers",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      dialogFilter: false,
      paymentFilter: true,
      dialogFilterBySpecialty: false,
      offersActive: [],
      selected: [],
      offers: [],
      postulationDialogItem: {
        id: 0,
        offerId: 0,
        freelancerId: 0,
        presentationMessage: '',
        postulationDate: '',
        state: "Pending"
      },
      defaultPostulationDialogItem: {
        id: 0,
        offerId: 0,
        freelancerId: 0,
        presentationMessage: '',
        postulationDate: '',
        state: "Pending"
      },
      showApplicationDialog: false,
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Offer' : 'Edit Offer'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {


    filterBySearch(value, search){
      if (value == '')
        return 0
      else
        this.filterOnlyCapsText (value, search)
    },
    filterOnlyCapsText (value, search) {
      return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
    },
    retrieveOffers() {
      OffersApiService.getAll()
          .then(response => {
            this.offers = response.data;
            this.offersActive = this.offers;
          })
          .catch((e) => {
            console.log(e);
          });
    },

    applyFilter(){
      let allIsChecked = false
      this.offersActive = this.offers;
      if(document.getElementById('f2-radius').checked){
        this.offersActive = this.filterByPayment(0, 1000)
      }
      else if(document.getElementById('f3-radius').checked){
        this.offersActive = this.filterByPayment(1000, 2000)
      }
      else if(document.getElementById('f4-radius').checked){
        this.offersActive = this.filterByPayment(2000, 5000)
      }
      else if(document.getElementById('f5-radius').checked){
        this.offersActive = this.filterByPayment(5000, 10000)
      }
      else if(document.getElementById('f6-radius').checked){
        this.offersActive = this.filterByPayment(10000, 1000000000)
      }

      if(
          document.getElementById("CB-1").checked &&
          document.getElementById("CB-2").checked &&
          document.getElementById("CB-3").checked
      ){ allIsChecked = true}

      if (allIsChecked !== true && this.selected.length !== 0){
        //if (document.getElementById("CB-1").checked){}
        this.offersActive = this.filterBySpeciality()
      }
    },



    filterByPayment(min, max){
      let list = []
      let tList = []

      list = this.offers
      for (let i = 0; i < (list.length);i++){
        if (list[i].payment >= min && list[i].payment<max){
          tList.push(list[i])
        }
      }
      list = []
      return tList
    },
    filterBySpeciality(){
      let tList = []
      let list = []
      list = this.offersActive
      for (let i=0; i<this.selected.length; i++){
        for (let j=0; j<list.length; j++){
          if (list[j].specialty === this.selected[i])
            tList.push(list[j])
        }
      }
      return tList
    },

    openOfferPostulationDialog(){
      this.showApplicationDialog = true
    },
    closeOfferPostulationDialog() {
      this.showApplicationDialog = false
      this.$nextTick(() => {
        this.postulationDialogItem = Object.assign({}, this.defaultPostulationDialogItem)
      });
      this.refreshList();
    },
    createPostulation(){
      //const postulation_id = parseInt(this.postulations[this.postulations.length - 1].id) + 1;

      //this.postulationDialogItem.id = postulation_id
      this.postulationDialogItem.postulationDate = new Date().toDateString();
      this.postulationDialogItem.state = 'Pending'

      PostulationsApiService.create(this.postulationDialogItem)
          .then(() => {
            console.log("Offer postulation submitted successfully");
          })
          .catch(e => {
            console.log(e);
          })
      this.closeOfferPostulationDialog()
    },
  },

  mounted() {
    this.retrieveOffers();
  }
}
</script>

<style scoped>
.filterCard{
  border-color: darkviolet;
}
.cardTitle{
  color: white;
}
</style>