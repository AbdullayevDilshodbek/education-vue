<template>
  <v-app>
    <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
    <v-dialog v-model="dialog" width="400" persistent>
      <v-card>
        <v-card-title style="background-color: #21b421; color: azure">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-2">
          <v-form>
            <v-text-field v-model=subject.subject_name label="Fan nomi" outlined dense></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="updateData">Saqlash</v-btn>
          <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="ma-4">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="openDialog">
          <v-icon>
            mdi-plus-circle
          </v-icon>
          Qo`shish
        </v-btn>
      </v-row>
    </div>
    <v-data-table
        :headers="headers"
        :items="getSubjects"
        :item-class="status"
        hide-default-footer
        dense>
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                text rounded small @click="openUpdateDialog(item)">
              <v-icon>mdi-border-color</v-icon>
            </v-btn>
          </template>
          <span>Taxrirlash</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
                :color="item.status === 1 ? 'green' : 'error'" text rounded>
              <v-icon
                  v-text="item.status === 1 ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
                  @click="changeStatus(item)"
              ></v-icon>
            </v-btn>
          </template>
          <span>Xolatini o`zgartirish</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <!--      <Paginate :collection="getSubjects" store="subject" method="getList"></Paginate>-->
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Paginate from '../components/PaginationInPage'

export default {
  name: "Subject",
  components: {Paginate},
  data() {
    return {
      subject: {
        id: '',
        subject_name: ''
      },
      add: true,
      title: '',
      dialog: false,
      snackbar: {
        show: false,
        text: '',
        color: ''
      },
      headers: [
        {
          text: "ID",
          value: "id",
          class: "green lighten-2",
        },
        {
          text: 'Fan',
          value: 'subject_name',
          class: 'green lighten-2'
        },
        {
          text: 'Amallar',
          value: 'actions',
          class: 'green lighten-2'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('subject', ['getSubjects'])
  },
  created() {
    this.loadDefaultData()
  },
  methods: {
    ...mapActions('subject', ['getList', 'addNewSubject', 'updateSubjectData', 'changeSubjectStatus']),
    loadDefaultData() {
      this.getList({
        url: "/subject?page=",
        method: "get",
        pageNumber: 0,
        body: {},
      });
    },
    closeDialog() {
      delete this.subject.subject_name;
      this.dialog = false
    },
    openDialog() {
      this.add = true;
      this.dialog = true
      this.title = 'Fan qo`shish'
    },
    addSubject() {
      this.addNewSubject(this.subject).then(response => {
        this.closeDialog()
        this.snackbar.show = true
        this.snackbar.text = response.data.message;
        this.snackbar.color = 'success'
        this.loadDefaultData()
      }).catch(error => {
        this.snackbar.show = true
        this.snackbar.text = Object.values(
            error.response.data.message
        )[0][0];
        this.snackbar.color = 'error'
      })
    },
    openUpdateDialog(item) {
      this.add = false;
      this.title = 'Fan nomni taxrirlash'
      this.dialog = true
      this.subject.id = item.id
      this.subject.subject_name = item.subject_name;
    },
    updateData() {
      if (this.add) {
        this.addSubject()
      } else {
        this.updateSubjectData(this.subject).then(response => {
          this.snackbar.show = true
          this.snackbar.text = response.data.message
          this.snackbar.color = 'success'
          this.loadDefaultData()
          this.closeDialog()
        }).catch(error => {
          this.snackbar.show = true
          this.snackbar.text = Object.values(
              error.response.data.message
          )[0][0];
          this.snackbar.color = 'error'
        })
      }
    },
    status(item) {
      if (!item.status) return 'red lighten-4';
    },
    changeStatus(item) {
      this.changeSubjectStatus(item.id).then(response => {
        this.snackbar.show = true;
        this.snackbar.text = response.data.message;
        this.snackbar.color = item.status ? "error" : "success";
        this.loadDefaultData()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>