<template>
    <div class="mt-2">
        <div class="ma-3 mb-0">
            <div class="d-flex justify-between">
                <div>
                    <v-text-field style="width:250px; display: :inline-block;" label="Search..."
                        v-model="payload.search" v-on:keyup.enter="get()" outlined dense></v-text-field>
                </div>
                <v-spacer></v-spacer>
                <v-btn @click="openAddDialog()" color="success">
                    <v-icon>mdi-plus-circle</v-icon>
                    Add
                </v-btn>
            </div>
        </div>
        <v-data-table :headers="headers" :items="positions.data" disable-pagination hide-default-footer
            class="elevation-1" item-key="id" disable-sort dense>
            <template v-slot:item.actions="{ item }">
                <v-btn @click="openUpdateDialog(item)" color="success" dense icon rounded>
                    <v-icon>mdi-border-color</v-icon>
                </v-btn>
                <v-btn :color="item.active ? 'success' : 'red'" icon @click="changeActive(item.id)">
                    <v-icon v-text="item.active == true ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off'"></v-icon>
                </v-btn>
            </template>
            <template #item.parent="{ item }">
                <span>{{ item.parent && item.parent.title || "-" }}</span>
            </template>
        </v-data-table>
        <v-footer app inset>
            <v-row justify="center" class="py-2">
                <v-pagination color="success" v-model="current_page"
                    :length="positions.meta && positions.meta.last_page" :total-visible="7"></v-pagination>
            </v-row>
        </v-footer>
        <PositionForm ref="position_form" @reload="get()" />
    </div>
</template>
<script>
import PositionForm from './PositionForm';
import { mapGetters } from 'vuex';
export default {
    name: 'Position',
    components: { PositionForm },
    data() {
        return {
            payload: {
                search: '',
                page: 1
            },
            headers: [
                {
                    text: '#',
                    value: 'id',
                    width: 20,
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Title',
                    value: 'title',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Organization',
                    value: 'organization.title',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'Actions',
                    value: 'actions',
                    class: 'green lighten-2',
                    divider: true
                }
            ],
            dialog: false,
            current_page: 1,
        }
    },
    computed: {
        ...mapGetters({
            positions: 'position/get'
        })
    },
    created() {
        this.get()
    },
    watch: {
        "current_page": "changePage"
    },
    methods: {
        changePage() {
            this.payload.page = this.current_page
            this.get()
        },
        async get() {
            await this.$store.dispatch('position/get', this.payload)
        },
        search() {

        },
        async changeActive(id) {
            try {
                const res = await this.$store.dispatch('position/changeActive', id)
                this.get()
                this.$toast.success(res.message)
            } catch (error) {
                this.$toast.error(Object.values(error.response.data.message)[0][0])
            }
        },
        openUpdateDialog(item) {
            this.$refs.position_form.setData(item)
        },
        openAddDialog() {
            this.$refs.position_form.dialog = true;
        }
    }
}
</script>