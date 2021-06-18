<template>
  <v-card>
    <v-card-title>
      Offers
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          :color="primaryColor"
          hide-details>
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-iterator
          :items="displayOffers"
          :search="search"
          hide-default-footer
          ref="offersTable">

        <template v-slot:header>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn :color="primaryColor" dark class="mb-2" v-bind="attrs" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.payment" label="Payment"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.createdAt" label="Created At"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox v-model="editedItem.state" label="Offer State"></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Offer Title"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.duration" label="Duration"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox v-model="editedItem.published" label="Published"></v-checkbox>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" text @click="close">Cancel</v-btn>
                <v-btn :color="primaryColor" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the item <b>{{ editedItem.title }}</b></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="primaryColor" text @click="closeDelete">Cancel</v-btn>
                <v-btn :color="primaryColor" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:default>
          <v-row>
            <v-col
                v-for="offer in offers"
                :key="offer.title"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
              <v-card elevation="6">
                <v-card-title class="subheading font-weight-bold">
                  <h3>{{ offer.title }}</h3>
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
              </v-card>
            </v-col>
          </v-row>
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
import common from "@/services/common";

export default {
  name: "offers",
  data() {
    return {
      primaryColor: common.data().primaryColor,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Payment', value: 'payment'},
        {text: 'CreatedAt', value: 'createdAt'},
        {text: 'State', value: 'state'},
        {text: 'Title', value: 'title'},
        {text: 'Duration', value: 'duration'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      offers: [],
      displayOffers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        payment: '',
        createdAt: '',
        state: false,
        title: '',
        duration: '',
        published: false
      },
      defaultItem: {
        id: 0,
        payment: '',
        createdAt: '',
        state: false,
        title: '',
        duration: '',
        published: false
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
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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
  },
  mounted() {
    this.retrieveOffers();
  }
}
</script>

<style scoped>
</style>