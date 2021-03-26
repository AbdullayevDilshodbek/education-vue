<template v-model="dialog">
    <div>
        <v-snackbar timeout="2000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
    <v-card>
        <v-card-title style="background-color: #21b421; color: azure;height: 50px">To`lov qilish</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-2">
            <v-form @keyup.native.enter="">
                <v-autocomplete
                        dense outlined label="Student"
                        :items="getActiveStudents"
                        item-value="id"
                        item-text="full_name"
                        v-model="student.student_id"
                ></v-autocomplete>
                <v-autocomplete dense outlined label="Guruhni tanlang"
                                :items="getGroup"
                                item-text="group_name"
                                item-value="id"
                                v-model="student.group_id"
                ></v-autocomplete>
                <v-text-field v-model="student.amount"
                              v-mask="'#######'"
                              dense
                              placeholder="To`lov miqdori"
                              label="To`lov miqdori"
                              hide-details
                              outlined
                              dens/>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="success" @click="pay">Saqlash</v-btn>
            <v-btn text color="error" @click="closeCard">Bekor qilish</v-btn>
        </v-card-actions>
    </v-card>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "PaymentDialog",
        props: {
            student: {},
        },
        data() {
            return {
                title: '',
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
            }
        },
        computed: {
            ...mapGetters("student", ["getActiveStudents"]),
            ...mapGetters('group', ['getGroup']),
        },
      created() {
          this.fetchActiveStudents({
            student_id: this.student.id
          })
      },
      methods: {
            ...mapActions("payment", ["PaymentActions"]),
            ...mapActions("student", ["fetchActiveStudents"]),
            ...mapActions("group", ["fetchGroup"]),
            pay(){
                this.PaymentActions({
                    url: '/payment?page=',
                    pageNumber: 0,
                    method: "post",
                    body: {
                        amount: this.student.amount,
                        student_id: this.student.student_id,
                        group_id: this.student.group_id,
                    },
                }).then(response =>{
                    this.snackbar.show = true;
                    this.snackbar.text = response.data.message;
                    this.snackbar.color = 'success';
                    this.closeCard();
                }).catch(error =>{
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            },
            closeCard(){
                this.$emit('closePaymentDialog')
            }
        },
    }
</script>

<style scoped>

</style>