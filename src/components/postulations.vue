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
              <v-text-field v-model="dialogItem.offerId" type="number" label="Offer Id"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="dialogItem.freelancerId" type="number" label="Freelancer Id"></v-text-field>
            </v-row>

            <v-row>
              <v-text-field v-model="dialogItem.presentationMessage" label="Presentation Message"></v-text-field>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="primaryColor" text @click="closeCreateAndEdit">Cancel</v-btn>
          <v-btn :color="primaryColor" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Item</v-card-title>
        <v-card-text>
          <p>Are you sure you want to withdraw this application?</p>
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
      My Postulations
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
                    :items="postulations"
                    :items-per-page="15"
                    :search="search"
                    class="elevation-2" ref="postulationsTable">

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>

      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="createItem()" dark class="mb-2" :color="primaryColor">Create Postulation</v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import PostulationsApiService from '../services/postulations-api.service'
import common from "@/services/common";

export default {
  name: "postulations",
  data() {
    return {
      primaryColor: common.data().primaryColor,
      search: '',
      dialogCreateAndEdit: false,
      dialogDelete: false,
      headers: [
        {text: 'Postulation Id', value: 'id'},
        {text: 'Offer Id', value: 'offerId'},
        {text: 'Presentation Message', value: 'presentationMessage'},
        {text: 'Postulation Date', value: 'postulationDate'},
        {text: 'State', value: 'state'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      postulations: [],
      editedIndex: -1,
      dialogItem: {
        id: 0,
        offerId: 0,
        freelancerId:0,
        presentationMessage: '',
        postulationDate: '',
        state: "Pending"
      },
      defaultItem: {
        id: 0,
        offerId: 0,
        freelancerId:0,
        presentationMessage: '',
        postulationDate: '',
        state: "Pending"
      },
    }
  },
  computed: {
    dialogCreateAndEditHeadTitle() {
      return this.editedIndex === -1 ? 'New Postulation' : 'Edit Postulation'
    },
  },
  watch: {
    dialogCreateAndEdit(val) {
      val || this.closeCreateAndEdit()
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
          })
          .catch((e) => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrievePostulations();
    },
    createItem(){
      this.dialogCreateAndEdit = true;
    },
    editItem(item) {
      this.editedIndex = this.postulations.indexOf(item);
      this.dialogItem = this.postulations[this.editedIndex];
      this.dialogCreateAndEdit = true;
    },
    deleteItem(item) {
      this.editedIndex = this.postulations.indexOf(item);
      console.log("Postulations list")
      console.log(this.postulations)
      this.dialogItem = Object.assign({}, this.postulations[this.editedIndex]);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deletePostulation(this.dialogItem.id);
      this.postulations.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeCreateAndEdit() {
      this.dialogCreateAndEdit = false
      this.$nextTick(() => {
        this.dialogItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.refreshList()
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
        this.postulations[this.editedIndex] = this.dialogItem;
        PostulationsApiService.update(this.dialogItem.id, this.dialogItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      }
      else {
        const new_id = parseInt(this.postulations[this.postulations.length - 1].id) + 1;

        this.dialogItem.id = new_id
        this.dialogItem.postulationDate = new Date().toDateString();
        this.dialogItem.state = 'Pending'

        PostulationsApiService.create(this.dialogItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.closeCreateAndEdit()
    },
    deletePostulation(id) {
      console.log("deletePostulation Id =");
      console.log(id);
      PostulationsApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
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
  },
  mounted() {
    this.retrievePostulations();
  }
}
</script>

<style lang="scss" scoped>
</style>
