<template>
    <v-card tile>
        <v-toolbar
                flat
                dark
                color="primary"
        >
            <v-btn
                    icon
                    dark
                    @click="$emit('closeDialog')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>To'lov tarixi</v-toolbar-title>
            <v-spacer></v-spacer>
    <v-row>
        <v-col
                cols="12"
                sm="6"
        >
            <v-dialog v-model="dateShow" width="290">
                <v-date-picker
                        v-model="dates"
                        range
                        show-current
                        @focusout="dateShow = !dateShow"
                ></v-date-picker>
            </v-dialog>
        </v-col>
        <v-col
                cols="12"
                sm="6"
        >
            <v-text-field
                    v-model="dateRangeText"
                    label="Date range"
                    prepend-icon="mdi-calendar"
                    @click:prepend="dateShow = true"
                    append-icon="mdi-backspace-outline"
                    append-outer-icon="mdi-briefcase-search-outline"
                    @click:append="clearDatePicker"
                    @click:append-outer="$emit('searchByTime',dates)"
                    @click="dateShow = true"
                    readonly
                    class="mt-5 pr-5"
            ></v-text-field>
        </v-col>
    </v-row>
        </v-toolbar>
            <v-data-table :headers="headers" :items="getPaymentHistory" hide-default-footer></v-data-table>
        <Paginate store="paymentHistory" collection="getPaymentHistory" method="getLists"/>
        <div style="flex: 1 1 auto;"></div>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Paginate from '../Paginate'
    export default {
        name: "PaymentHistory",
        components: {
          Paginate
        },
        data() {
            return {
                dates: [new Date().toJSON().substr(0, 8)+ "01",new Date().toJSON().substr(0, 10)],
                dateShow: false,
                headers: [
                    {
                        text: "ID",
                        value: 'id',
                        class: "green lighten-2",
                        divider: true
                    },
                    {
                        text: "F.I.SH",
                        value: 'user.full_name',
                        class: 'green lighten-2',
                        divider: true
                    },
                    {
                        text: "Summa",
                        value: 'amount',
                        class: 'green lighten-2',
                        divider: true
                    },
                    {
                        text: "Mualif",
                        value: 'addBy',
                        class: 'green lighten-2',
                        divider: true
                    },
                    {
                        text: "Sana",
                        value: 'date',
                        class: 'green lighten-2',
                        divider: true
                    }
                ]
            }
        },
        computed: {
            ...mapGetters('paymentHistory',['getPaymentHistory']),
            dateRangeText () {
                return this.dates.join(' ~ ')
            },
        },
        methods: {
            clearDatePicker(){
                this.dates = [];
                this.$emit('clearDatePicker');
            }
        }
    }
</script>

<style lang="css">
</style>