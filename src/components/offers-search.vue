<template>
  <v-card>
    <!--DIALOGS-->
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
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details>
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-iterator
          :items="displayOffers"
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
                            ></v-radio>
                            <v-radio
                                label="Hasta 1000"
                                value="f2"
                                name=f2
                            ></v-radio>
                            <v-radio
                                label="De 1000 hasta 2000"
                                value="f3"
                                name=f3
                            ></v-radio>
                            <v-radio
                                label="De 2000 hasta 5000"
                                value=">f4"
                                name=f4
                            ></v-radio>
                            <v-radio
                                label="De 5000 hasta 10000"
                                value=">f5"
                                name=f5
                            ></v-radio>
                            <v-radio
                                label="Desde 10000"
                                value="f6"
                                name=f6
                            ></v-radio>
                          </v-radio-group>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="applyFilter">Apply</v-btn>
                    </v-card-actions>
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
                        <p>{{ selected }}</p>
                        <v-checkbox
                            v-model="selected"
                            label="Diseño gráfico"
                            value="Diseño gráfico"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="selected"
                            label="Programación web"
                            value="Programación web"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="selected"
                            label="Programación de apps"
                            value="Programación de apps"
                        ></v-checkbox>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="applyFilterBySpeciality">Apply</v-btn>
                        </v-card-actions>
                      </v-container>
                    </v-card-text>

                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </div>
          <div>
            <v-row>

              <v-col
                  v-for="offer in offers"
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

                  <v-list dense>
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

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
      showApplicationDialog: false,
      search: '',
      chips: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
      items: ['Streaming', 'Eating'],
      dialog: false,
      dialogDelete: false,
      dialogFilter: false,
      paymentFilter: true,
      dialogFilterBySpecialty: false,
      selected: [],
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Payment', value: 'payment'},
        {text: 'CreatedAt', value: 'createdAt'},
        {text: 'State', value: 'state'},
        {text: 'Title', value: 'title'},
        {text: 'Duration', value: 'duration'},
        {text: 'Specialty', value: 'specialty'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      list: [],
      offers: [
        {
          id: 1,
          payment: 4000,
          createdAt: 'February 04, 2021',
          state: true,
          title: 'Busco programador para desarrollar API',
          specialty: 'Programación de apps',
          duration: 55,
          published: true
        },
        {
          id: 2,
          payment: 15000,
          createdAt: 'December 22, 2020',
          state: true,
          title: 'Busco programador para desarrollar una aplicación web',
          specialty: 'Programación de apps',
          duration: 120,
          published: true
        },

        {
          id: 3,
          payment: 5000,
          createdAt: 'June 14, 2021',
          state: true,
          title: 'Solicito colaboorador experto en diseño grafico',
          specialty: 'Diseño gráfico',
          duration: 32,
          published: true
        },
        {
          id: 4,
          payment: 500,
          createdAt: 'June 15, 2021',
          state: true,
          title: 'Busco freelacer especializado en UX',
          specialty: 'Marketing digital',
          duration: 55,
          published: true
        }
      ],
      displayOffers: [
        {
          id: 1,
          payment: 4000,
          createdAt: 'February 04, 2021',
          state: true,
          title: 'Busco programador para desarrollar API',
          specialty: 'Programación de apps',
          duration: 55,
          published: true
        },
        {
          id: 2,
          payment: 15000,
          createdAt: 'December 22, 2020',
          state: true,
          title: 'Busco programador para desarrollar una aplicación web',
          specialty: 'Programación de apps',
          duration: 120,
          published: true
        },

        {
          id: 3,
          payment: 5000,
          createdAt: 'June 14, 2021',
          state: true,
          title: 'Solicito colaboorador experto en diseño grafico',
          specialty: 'Diseño gráfico',
          duration: 32,
          published: true
        },
        {
          id: 4,
          payment: 500,
          createdAt: 'June 15, 2021',
          state: true,
          title: 'Busco freelacer especializado en UX',
          specialty: 'Marketing digital',
          duration: 55,
          published: true
        }
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        payment: '',
        createdAt: '',
        state: false,
        title: '',
        duration: '',
        specialty: '',
        published: false
      },
      defaultItem: {
        id: 0,
        payment: '',
        createdAt: '',
        state: false,
        title: '',
        duration: '',
        specialty: '',
        published: false
      },


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

    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    filterBySpeciality(){
      let tList = []
      for (let i=0; i<=this.selected.length; i++){
        for (let j=0; j<=this.offers.length; j++){
          if (this.offers[j].specialty == this.selected[i])
            tList.add(this.offers[j])
        }
      }
      return tList
    },
    applyFilterBySpeciality(){
      this.displayOffers = this.filterBySpeciality()
      this.closeFilterBySpeciality()
    },
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
            this.displayOffers = response.data.map(this.getDisplayOffer);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayOffer(offer) {
      return {
        id: offer.id,
        payment: offer.payment,
        createdAt: offer.createdAt,
        state: offer.state,
        title: offer.title,
        specialty: offer.specialty,
        duration: offer.duration,
        status: offer.published ? 'Published' : 'Pending'
      };
    },
    refreshList() {
      this.retrieveOffers();
    },
    removeAllOffers() {
      OffersApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },
    editItem(item) {
      this.editedIndex = this.displayOffers.indexOf(item);
      console.log(item);
      this.editedItem = this.offers[this.editedIndex];
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.displayOffers.indexOf(item);
      this.editedItem = Object.assign({}, this.offers[this.editedIndex]);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteOffer(this.editedItem.id);
      this.offers.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeFilterBySpeciality(){
      this.dialogFilterBySpecialty = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeFilter() {
      this.dialogFilter = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    applyFilter(){
      if (this.filterByPayment.f1.checked){
        this.displayOffers = this.offers
      }
      else if(this.filterByPayment.f2.checked){
        this.displayOffers = this.filterByPayment(0, 1000)
      }
      else if(this.filterByPayment.f3.checked){
        this.displayOffers = this.filterByPayment(1000, 2000)
      }
      else if(this.filterByPayment.f2.checked){
        this.displayOffers = this.filterByPayment(2000, 5000)
      }
      else if(this.filterByPayment.f2.checked){
        this.displayOffers = this.filterByPayment(5000, 10000)
      }
      else if(this.filterByPayment.f2.checked){
        this.displayOffers = this.filterByPayment(10000, 1000000000)
      }
      this.closeFilter()
    },
    save() {
      if (this.editedIndex > -1) {
        this.offers[this.editedIndex] = this.editedItem;
        this.displayOffers[this.editedIndex] = this.getDisplayOffer(this.offers[this.editedIndex]);
        OffersApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        OffersApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.offers.push(item);
              this.displayOffers.push(this.getDisplayOffer(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },
    deleteOffer(id) {
      OffersApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    filterByPayment(min, max){
      let tList
      this.list = this.offers
      for (let i = 0; i < this.list.length-1;i++){
        if (this.list[i].payment >= min && this.list[i].payment<max){
          tList.add(this.list[i])
        }
      }
      this.list = []
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
