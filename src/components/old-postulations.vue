<template>
  <v-card>
    <v-card-title>
      Tutorials
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displayPostulations"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1" ref="postulationsTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditPostulation(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Postulation</v-btn>
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
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.desiredPayment" label="Desired Payment"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox v-model="editedItem.published" label="Published"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the postulation <b>{{ editedItem.id }}</b></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn small color="primary" @click="navigateToAddPostulation">Add Postulation</v-btn>
      <v-btn small color="error" @click="removeAllPostulations">Remove All</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PostulationsApiService from '../services/postulations-api.service';
export default {
  name: "postulations",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Description', value: 'description'},
        {text: 'Desired Payment', value: 'desiredPayment'},
        {text: 'Status', value: 'status'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      postulations: [],
      displayPostulations: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        description: '',
        desiredPayment: '',
        published: false
      },
      defaultItem: {
        id: 0,
        description: '',
        desiredPayment: '',
        published: false
      },
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Postulation' : 'Edit Postulation'
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
        description: postulation.description,
        desiredPayment: postulation.desiredPayment,
        status: postulation.published ? "Published" : "Pending",
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
    navigateToAddPostulation() {
      this.$router.push({name: 'add-tutorial'});
    },
    navigateToEditPostulation(id) {
      this.$router.push({name: 'edit-tutorial', params: { id: id}});
    }

  },
  mounted() {
    this.retrievePostulations();
  }
}

</script>

<style scoped>

</style>
