<template>
    <v-app>
        <v-btn color="success">
          <export-excel :data="jsonData" :fields = "json_fields">Test Excel</export-excel>
        </v-btn>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Vue from 'vue'
    import excel from 'vue-excel-export'

    Vue.use(excel);
    export default {
        name: "Excel",
        data() {
            return {
                json_fields: {
                    'F.I.O': 'name',
                    'sana': 'date',
                    'ketdi_ketdi' : {
                        field: 'time.come_and_went',
                        callback: (value) => {
                            return value;
                        }
                    },
                },
                jsonData: [
                    {
                        'name': 'Jamolov Kamol',
                        'date': '2021-02-01',
                        'time': {
                            'come_and_went': '08:00:00, 18:03:12',
                        }
                        // 'phone': {
                        //     'mobile': '1-541-754-3010',
                        //     'landline': '(541) 754-3010'
                        // }
                    }
                ],
            }
        },
        computed: {
            ...mapGetters('paymentHistory', ['getPaymentHistory']),
        },
        created() {
            this.getLists({
                url: `paymentHistory/teacher?page=`,
                pageNumber: 0,
                method: "post",
                body: {
                    user_id: 194
                },
            })
        },
        methods: {
            ...mapActions('paymentHistory', ['getLists']),
        }
    }
</script>

<style scoped>

</style>
