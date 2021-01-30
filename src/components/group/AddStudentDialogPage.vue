<template>
    <v-card tile height="50">
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <div>
            <v-toolbar
                    height="50"
                    dark
                    color="primary"
            >
                <v-btn
                        icon
                        dark
                        @click="$emit('closeMemberDialog')"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{group.group_name}} guruh</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                            dark
                            text
                            @click="openAddMemberCard"
                            rounded
                    >
                        Add member
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <div style="flex: 1 1 auto;"></div>
            <v-data-table :headers="headers" :items="getStudentsOfGrup"
                          hide-default-footer>
                <template v-slot:item.actions="{ item }">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    v-bind="attrs"
                                    v-on="on"
                                    text rounded small @click="openPayDialog(item)">
                                <v-icon color="#0BA3E4">mdi-cash</v-icon>
                            </v-btn>
                        </template>
                        <span>To'lov qilish</span>

                    </v-tooltip>
                    <!--                    <v-tooltip bottom>-->
                    <!--                        <template v-slot:activator="{ on, attrs }">-->
                    <!--                            <v-btn-->
                    <!--                                    color="primary"-->
                    <!--                                    v-bind="attrs"-->
                    <!--                                    v-on="on"-->
                    <!--                                    :color="item.status === 1 ? 'green' : 'error'" text rounded>-->
                    <!--                                <v-icon-->
                    <!--                                        v-text="item.status === 1 ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"-->
                    <!--                                        @click="changeStatus(item)"-->
                    <!--                                ></v-icon>-->
                    <!--                            </v-btn>-->
                    <!--                        </template>-->
                    <!--                        <span>Xolatini o`zgartirish</span>-->
                    <!--                    </v-tooltip>-->
                </template>
            </v-data-table>
            <Paginate store="group_to_student" collection="getStudentsOfGrup" method="getList"/>
            <v-dialog v-model="card.show" width="400">
                <CardAddStudentToGroup @closeDialog="closeAddMemberCard" :group="group"/>
            </v-dialog>
            <v-dialog width="400" v-model="pay">
                <CardPay :student="student" @closePaymentDialog="closePayDialog"/>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Paginate from '../Paginate'
    import CardAddStudentToGroup from '../GroupToStudent/CardAddStudentToGroup'
    import CardPay from '../payment/CardPay'

    export default {
        name: "AddStudentDialogPage",
        props: ["group"],
        components: {
            Paginate,
            CardAddStudentToGroup,
            CardPay,
        },
        data() {
            return {
                pay: false,
                student: {
                    student_id: '',
                    group_id: '',
                    dialog: '',
                    amount: '',
                },
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                card: {
                    show: false
                },
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'F.I.O',
                        value: 'student.full_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Guruh',
                        value: 'group.group_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Qarz',
                        value: 'credit',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Chegirma',
                        value: 'discount',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Qo`shilgan sana',
                        value: 'add_date',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Amallar',
                        value: 'actions',
                        class: 'green lighten-2'
                    }
                ],
            }
        },
        computed: {
            ...mapGetters('group_to_student', ['getStudentsOfGrup', 'getCurrentPage'])
        },
        watch: {
            dialog(val) {
                val || this.close();
            },
            group() {
                this.loadMembers()
            }
        },
        created() {
            this.loadMembers()
        },
        methods: {
            ...mapActions('group_to_student', ['StudentsOfGroup', 'getList']),
            loadMembers() {
                this.getList({
                    url: `group_to_student/students_of_the_group/${this.group.id}?page=`,
                    method: "get",
                    pageNumber: this.getCurrentPage,
                    body: {},
                });
            },
            openAddMemberCard() {
                this.card.show = true;
            },
            closeAddMemberCard(check_add) {
                this.loadMembers();
                this.snackbar.show = check_add;
                this.snackbar.color = 'error';
                this.snackbar.text = "Student guruh ga biriktirildi";
                this.card.show = false;
            },
            openPayDialog(item) {
                const promises = [
                    this.$store.dispatch('student/fetchOneStudent', item.student.id),
                    this.$store.dispatch('group/fetchGroup', item.group.id)
                ];
                Promise.all(promises).then(() => {
                    this.student.student_id = item.student.id;
                    this.student.group_id = item.group.id;
                    this.pay = true;
                })
            },
            closePayDialog(){
                this.loadMembers();
                this.student = {};
                this.pay = false;
            }

        }
    }
</script>

<style scoped>

</style>