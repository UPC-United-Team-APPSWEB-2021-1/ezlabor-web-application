<template>
  <v-card>
    <!--DIALOGS-->
    <v-dialog v-model="dialogCreateAndEdit" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogCreateAndEditHeadTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>

            <v-row>
              <v-text-field v-model="dialogItem.title" label="Offer Title"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="dialogItem.payment" type="number" label="Payment"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="dialogItem.duration" type="number" suffix="months" label="Duration"></v-text-field>
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
          <p>Are you sure you want to delete the item <b>{{ dialogItem.title }}</b></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="primaryColor" text @click="closeDelete">Cancel</v-btn>
          <v-btn :color="primaryColor" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card-title>
      My Offers
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
      <v-data-table :headers="headers"
                    :items="displayOffers"
                    :items-per-page="15"
                    :search="search"
                    class="elevation-2" ref="offersTable">

        <template v-slot:top class="ga">
          <v-btn @click="createItem()" dark class="mb-2" :color="primaryColor">Create Offer</v-btn>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

      </v-data-table>
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
      dialogCreateAndEdit: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Payment', value: 'payment'},
        {text: 'State', value: 'state'},
        {text: 'Title', value: 'title'},
        {text: 'Duration', value: 'duration'},
        {text: 'Status', value: 'status'},
        {text: 'Date Created', value: 'createdAt'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      offers: [],
      displayOffers: [],
      editedIndex: -1,
      dialogItem: {
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
    dialogCreateAndEditHeadTitle() {
      return this.editedIndex === -1 ? 'New Offer' : 'Edit Offer'
    },
  },
  watch: {
    dialogCreateAndEdit(val) {
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
    createItem(){
      this.dialogCreateAndEdit = true;
    },
    editItem(item) {
      this.editedIndex = this.displayOffers.indexOf(item);
      this.dialogItem = this.offers[this.editedIndex];
      this.dialogCreateAndEdit = true;
    },
    deleteItem(item) {
      this.editedIndex = this.displayOffers.indexOf(item);
      this.dialogItem = Object.assign({}, this.offers[this.editedIndex]);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteOffer(this.dialogItem.id);
      this.offers.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialogCreateAndEdit = false
      this.$nextTick(() => {
        this.dialogItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.dialogItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        this.offers[this.editedIndex] = this.dialogItem;
        this.displayOffers[this.editedIndex] = this.getDisplayOffer(this.offers[this.editedIndex]);
        OffersApiService.update(this.dialogItem.id, this.dialogItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      }
      else {
        const new_id = parseInt(this.displayOffers[this.displayOffers.length - 1].id) + 1;

        this.dialogItem.id = new_id
        this.dialogItem.createdAt = new Date().toDateString();
        this.dialogItem.published = true
        this.dialogItem.state = true

        OffersApiService.create(this.dialogItem)
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

<style lang="scss" scoped>

</style>