<template>
    <div class="text-center">
        <v-card>
            <v-card-title class="headline grey lighten-2">
                <p style="color: #676767">
                    <v-icon>mdi-shield-alert</v-icon>
                    Eslatma !
                </p>
            </v-card-title>

            <v-card-text>
                <p>Eslatib o'tamiz siz buni tasdiqlash orqali, xodimga maosh berganizingzi qayd etasiz, uning xisob
                    xolati 0 ga tushadi
                    va u sizning muallifligingiz tomonidan qayt etiladi
                </p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        text
                        @click="confirm"
                >
                    Tasdiqlash
                </v-btn>
                <v-btn text color="error" @click="closeDialog">Bekor qilish</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        name: "ConfirmDialog",
        props: ['teacher_id'],
        methods: {
            ...mapActions('payment',['PaymentActions']),
            confirm() {
                this.PaymentActions({
                    url: `/payment/${this.teacher_id}?page=`,
                    pageNumber: 0,
                    method: "put",
                    body: {},
                })
                this.$emit('confirm')
            },
            closeDialog() {
                this.$emit('closeConfirmDialog')
            }
        }
    }
</script>

<style scoped>

</style>