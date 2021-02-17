<template>
    <v-card tile height="50">
        <v-snackbar timeout="1000" top right v-model="snackbar.show" :color="snackbar.color">
            {{snackbar.text}}
        </v-snackbar>
        <div>
            <v-toolbar
                    height="50"
                    dark
                    color="green"
            >
                <v-btn
                        icon
                        dark
                        @click="closeAttendanceDialog"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{group.group_name}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn text style="border: 1px solid white" @click="SendAttendance">Tasdiqlash</v-btn>
            </v-toolbar>
            <div style="flex: 1 1;"></div>
            <v-data-table
                    :headers="headers"
                    :items="getAttendance"
                    v-model="selected"
                    :item-class="computedColor"
                    hide-default-footer
                    disable-pagination
                    show-select>
            </v-data-table>
        </div>
    </v-card>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'

    export default {
        name: "Attendance",
        props: ['group'],
        data() {
            return {
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                selected: [],
                headers: [
                    {
                        text: 'ID',
                        value: 'id',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Student',
                        value: 'student.full_name',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Guruh',
                        value: 'group',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Xolat 1',
                        value: 'attendance.first_day',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Xolat 2',
                        value: 'attendance.two_day',
                        class: 'green lighten-2'
                    },
                    {
                        text: 'Xolat 3',
                        value: 'attendance.three_day',
                        class: 'green lighten-2'
                    },
                ]
            }
        },
        computed: {
            ...mapGetters('group', ['getAttendance'])
        },
        methods: {
            ...mapActions('group', ['GroupAction']),
            SendAttendance(){
                let attendance = [];
                this.selected.forEach(item =>{
                   attendance.push({
                       student_id: item.student.id,
                       status: true
                   })
                });
                this.getAttendance.forEach(item =>{
                   if (!attendance.some(el => el.student_id === item.student.id)){
                       attendance.push({
                           student_id: item.student.id,
                           status: false
                       });
                   }
                });
                let sendData = {
                    group_id: this.group.id,
                    attendance: attendance
                };
                this.$emit('SendAttendance',sendData)
            },
            closeAttendanceDialog(){
                this.selected = [];
                this.$emit('closeAttendanceDialog');

            },
            computedColor(item) {
                // if (item.bad) return "red lighten-4";
            },
        }
    }
</script>

<style scoped>

</style>