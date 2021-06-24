<template>
  <v-card>
    <v-card-title>
      Postulations
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
          :items="displayPostulations"
          :search="search"
          hide-default-footer
          ref="postulationsTable">

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
                      <v-text-field v-model="editedItem.desiredPayment" label="Desired Payment"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.createdAt" label="Created At"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox v-model="editedItem.state" label="Postulation State"></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Postulation Description"></v-text-field>
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
                v-for="postulation in postulations"
                :key="postulation.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
            >
              <v-card elevation="6">
                <v-card-title class="subheading font-weight-bold">
                  <h3>{{ postulation.id }}</h3>
                </v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Desired Payment:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ postulation.desiredPayment }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Created at:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ postulation.createdAt }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>State:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ postulation.state }}
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
import PostulationsApiService from '../services/postulations-api.service';
import common from "@/services/common";

export default {
  name: "postulations",
  data() {
    return {
      primaryColor: common.data().primaryColor,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'DesiredPayment', value: 'desiredPayment'},
        {text: 'State', value: 'State'},
        {text: 'CreatedAt', value: 'createdAt'},
        {text: 'Description', value: 'description'},
        {text: 'Status', value: 'status'}
      ],
      postulations: [],
      displayPostulations: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        desiredPayment: '',
        createdAt: '',
        state: false,
        description: ''
      },
      defaultItem: {
        id: 0,
        desiredPayment: '',
        createdAt: '',
        state: false,
        description: ''
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
    retrievePostulations() {
      PostulationsApiService.getAll()
          .then(response => {
            this.postulations = response.data;
            this.displayPostulations = response.data.map(this.getDisplayPostulation);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayPostulation(postulation) {
      return {
        id: postulation.id,
        desiredPayment: postulation.payment,
        createdAt: postulation.createdAt,
        state: postulation.state,
        description: postulation.description
      };
    },
    refreshList() {
      this.retrievePostulations();
    },
    removeAllPostulations() {
      PostulationsApiService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },
    editItem(item) {
      this.editedIndex = this.displayPostulations.indexOf(item);
      console.log(item);
      this.editedItem = this.postulations[this.editedIndex];
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.displayPostulations.indexOf(item);
      this.editedItem = Object.assign({}, this.postulations[this.editedIndex]);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deletePostulation(this.editedItem.id);
      this.postulations.splice(this.editedIndex, 1);
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
        this.postulations[this.editedIndex] = this.editedItem;
        this.displayPostulations[this.editedIndex] = this.getDisplayPostulation(this.postulations[this.editedIndex]);
        PostulationsApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        PostulationsApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.postulations.push(item);
              this.displayPostulations.push(this.getDisplayPostulation(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },
    deletePostulation(id) {
      PostulationsApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.retrievePostulations();
  }
}
</script>

<style scoped>
</style>
