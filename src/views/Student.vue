<template>
  <v-app>
    <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
    </v-snackbar>
    <v-dialog width="400" v-model="dialog">
      <CardStudent :student.sync="student"
                   :add="add"
                   @loadDefaultData="loadDefaultData"
                   :title="title"
                   :dialog.sync="dialog"/>
    </v-dialog>
    <div class="ma-3 ">
      <v-row>
        <v-text-field
          label="Search..."
          outlined
          dense
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn @click="openAddDialog" color="success">
          <v-icon>mdi-plus-circle</v-icon>
          Qo`shish
        </v-btn>
      </v-row>
    </div>
    <v-data-table :headers="headers" :items="getStudents"
                  hide-default-footer
                  disable-sort
                  dense
                  class="mt-2"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                @click="openEditDialog(item)"
                color="primary"
                v-bind="attrs"
                v-on="on"
                text rounded small>
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
                icon
                @click="changeStatus(item)"
                :color="item.status === 1 ? 'green' : 'error'" text rounded>
              <v-icon
                  v-text="item.status === 1 ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"
              ></v-icon>
            </v-btn>
          </template>
          <span>Xolatini o`zgartirish</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <Paginate :collection="getStudents" store="student" method='getList'></Paginate>
  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import CardStudent from "../components/student/CardStudent"
import Paginate from '../components/Paginate'

export default {
  name: "Student",
  components: {
    CardStudent,
    Paginate
  },
  data() {
    return {
      dialog: false,
      snackbar: {
        show: false,
        text: '',
        color: ''
      },
      student: {
        id: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        phone: '',
      },
      add: true,
      title: '',
      headers: [
        {
          text: '#',
          value: 'id',
          class: "green lighten-2",
          divider: true
        },
        {
          text: 'F.I.SH',
          value: 'full_name',
          class: "green lighten-2",
          divider: true
        },
        {
          text: 'Telefon raqam',
          value: 'phone',
          class: "green lighten-2",
          divider: true
        },
        {
          text: 'Amallar',
          value: 'actions',
          class: "green lighten-2",
          divider: true
        }
      ],
    }
  },
  computed: {
    ...mapGetters('student', ['getStudents', 'getCurrentPage'])
  },
  created() {
    this.getList({
      url: "student?page=",
      method: "get",
      pageNumber: 0,
      body: {},
    })
  },
  methods: {
    ...mapActions('student', ['getList', 'universalCrud']),
    openAddDialog(){
      this.title = 'Student qo\'shish'
      this.add = true
      this.dialog = true
    },
    openEditDialog(item){
      this.title = 'Student ma`lumotlarini yangilash'
      this.add = false
      this.dialog = true
      this.student = item
    },
    changeStatus(item) {
      this.universalCrud({
        url: `student/change_status/${item.id}`,
        method: 'put',
        body: {}
      }).then(response => {
        this.loadDefaultData()
        this.snackbar.show = true;
        this.snackbar.text = response.message;
        this.snackbar.color = "success";
      })
    },
    loadDefaultData(pageNumber) {
      this.getList({
        url: "student?page=",
        method: "get",
        pageNumber: this.getCurrentPage,
        body: {},
      })
    }
  }
}
</script>

<style scoped>

</style>