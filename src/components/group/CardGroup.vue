<template>
    <div>


    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "CardGroup",
        props: {
            title: {
                required: true
            },
            group: {
                type: Object,
                required: false
            },
            subject: {
                required: false
            },
            edit: {
                required: true
            }
        },
        data() {
            return {
                subject_id: null,
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                },
                editingGroup: this.group
            }
        },
        computed: {
            ...mapGetters('teacher', ['getTeachers', 'getTeacherOfTheSubject']),
            ...mapGetters('subject', ['getSubjects']),
            editingSubject() {
                return this.subject
            },
        },
        created() {
            this.fetchTeacher();
            this.fetchSubject();
            this.edit ? this.fetchTeacherOfSubject("") : '';
        },
        methods: {
            ...mapActions('teacher', ['fetchTeacher', 'fetchTeacherOfSubject']),
            ...mapActions('subject', ['fetchSubject']),
            sortTeacher(subject_id) {
                if(!this.edit && !!subject_id){
                     this.fetchTeacherOfSubject(subject_id);
                }
            },
            close() {
                this.$emit('closeDialog');
            }

        }
    }
</script>

<style scoped>

</style>