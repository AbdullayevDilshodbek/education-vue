<template>
    <v-card>
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <v-card-title style="background-color: #21b421; color: white">{{group.group_name}}</v-card-title>
        <v-card-text class="mt-1">
            <v-divider></v-divider>
            <v-form>
                <v-combobox
                        dense
                        outlined
                        label="Student ni tanlang"
                        :items="getActiveStudents"
                        item-text="full_name"
                        item-value="id"
                        return-object
                        append-icon="mdi-plus-circle"
                        v-model="student"
                        @keydown="searchStudent"
                        id="icon-plus"
                        @click:append="openStudentCard"
                >
                </v-combobox>
                <v-combobox dense label="Shu oy uchun to`lov qismi (%)"
                            outlined
                            :items="pay_part_ary"
                            v-model="member.pay_part"
                >
                </v-combobox>
                <v-text-field v-mask="'###'"
                              dense outlined
                              label="Chegirma"
                              placeholder="0,10,40,..."
                              v-model="member.discount"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" text @click="addNewMember">Saqlash</v-btn>
            <v-btn color="error" text @click="closeDialog_(false)">Bekor qilish</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog" width="400">
            <CardStudent @closeDialog="closeStudentCard"
                         @addStudent="addStudent"
                         :student="student"
                         :title="studentCard.title"
                         :dialog.sync="dialog"
                         :add="true"/>
        </v-dialog>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import CardStudent from '../student/CardStudent'

    export default {
        name: "CardAddStudentToGroup",
        props: ['group'],
        components: {
            CardStudent
        },
        data() {
            return {
              timer: '',
                student: {
                    id: '',
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    phone: '',
                },
              dialog: false,
                studentCard: {
                    show: false,
                    title: 'Yangi Student qo`shish'
                },
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                pay_part_ary: [
                    '30',
                    '50',
                    '60',
                    '100',
                ],
                member: {
                    student_id: '',
                    group_id: this.group.id,
                    pay_part: '100',
                    discount: '',

                }
            }
        },
        computed: {
            ...mapGetters('student', ['getActiveStudents'])
        },
        created() {
            this.fetchActiveStudents({})
          this.student = this.getActiveStudents[0]
        },
        methods: {
            ...mapActions('student', ['fetchActiveStudents']),
            ...mapActions('group_to_student', ['StudentsOfGroup', 'getCurrentPage']),
            addNewMember() {
                this.member.group_id = this.group.id;
                this.member.student_id = this.student.id
                this.StudentsOfGroup({
                    url: `/group_to_student?page=`,
                    pageNumber: this.getCurrentPage,
                    method: "post",
                    body: this.member,
                }).then(response => {
                    this.snackbar.show = true;
                    this.snackbar.color = 'success';
                    this.snackbar.text = response.data.message;
                    this.closeDialog_(true);
                    this.getList({
                        url: `group_to_student/students_of_the_group/${this.member.group_id}?page=`,
                        method: "get",
                        pageNumber: this.getCurrentPage,
                        body: {},
                    });
                }).catch(error => {
                    this.snackbar.show = true;
                    this.snackbar.text = Object.values(
                        error.response.data.message
                    )[0][0];
                    this.snackbar.color = 'error'
                })
            },
          searchStudent(){
              clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              this.fetchActiveStudents({
                text: document.getElementById('icon-plus').value
              })
            },600)
          },
            closeDialog_(check_add) {
                this.member = {};
                this.$emit('closeDialog', check_add);
            },
            openStudentCard(){
                this.dialog = true;
                this.student = {}
            },
            addStudent(){
                this.dialog = false;
                this.fetchActiveStudents({});
                this.snackbar.show = true;
                this.snackbar.color = 'success';
                this.snackbar.text = "Student bazaga kiritldi";
            },
            closeStudentCard() {
                this.dialog = false
            }
        }
    }
</script>

<style lang="css">

</style>