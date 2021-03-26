<template>
  <a-app>
    <div>
      <v-row>
        <v-col cols="8">
          <v-text-field dense outlined
                        style="width: 150px;" class="mx-auto mt-2"
                        placeholder="Qidirish..."
                        append-icon="mdi-magnify"
                        v-model="text"
                        @input="search"

          >
          </v-text-field>
          <v-data-table :headers="headers"
                        :items="getPartner"
                        dense
                        hide-default-footer
                        class="elevation-1" @click:row="clickedRow">
            >
          </v-data-table>
          <PaginationInPage store="currentDebt" collection="getPartner" method="getList"/>
        </v-col>
        <v-col cols="4">
          <h4>{{ brend }} bilan xisob-kitoblar</h4>
          <div>
            <v-row>
              <v-col class="d-flex justify-space-between pr-3">
                <span class="subtitle-2">Kun xolatiga</span>
                <span>23/03/2021</span>
              </v-col>
            </v-row>
          </div>
          <v-autocomplete
              style="width: 150px;"
              outlined
              dense
          ></v-autocomplete>
          <v-data-table :headers="headersResault" :items="resaultItems">

          </v-data-table>
        </v-col>
      </v-row>
    </div>
  </a-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import PaginationInPage from "../PaginationInPage"

export default {
  name: "CurrentDebt",
  components: {
    PaginationInPage
  },
  data() {
    return {
      text: '',
      brend: '',
      headers: [
        {
          text: "Kodi",
          value: 'id',
          class: "green lighten-4 dense",
          divider: true
        },
        {
          text: "Taminotchi",
          value: 'title',
          class: "green lighten-4 dense",
          divider: true
        },
        {
          text: "CTIR",
          value: 'inn',
          class: "green lighten-4 dense",
          divider: true
        },
      ],
      headersResault: [
        {
          text: "Valyuta turi",
          value: 'abbrevation',
          class: "green lighten-4 dense",
          divider: true
        },
        {
          text: "Qarzdorlik",
          value: 'debt',
          class: "green lighten-4 dense",
          divider: true
        },
      ],
      resaultItems: [],
      timer: null
    }
  },
  computed: {
    ...mapGetters('currentDebt', ['getPartner'])
  },
  created() {
    this.loadDefaultData()
  },
  methods: {
    ...mapActions('currentDebt', ['getList', 'UniversalAction']),
    clickedRow(item) {
      this.UniversalAction({
        url: `/partner/current_debts?page=`,
        pageNumber: 0,
        method: "post",
        body: {
          partner_id: item.id
        },
      }).then(response => {
        this.resaultItems = response.data.data
        this.brend = item.title;
      })
    },
    search() {
      clearTimeout(this.timer)
      this.timer =  setTimeout(() => {
            this.getList({
              url: "/partners?page=",
              method: "get",
              pageNumber: this.getCurrentPage,
              body: {
                params: {
                  search: this.text
                }
              },
            })
      }, 600)
    },
    loadDefaultData() {
      this.getList({
        url: "/partners?page=",
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
