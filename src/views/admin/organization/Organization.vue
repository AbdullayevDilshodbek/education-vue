<template>
    <div class="mt-2">
        <div class="ma-3 mb-0">
            <div class="d-flex justify-between">
                <div>
                    <v-text-field style="width:250px; display: :inline-block;" label="Search..."
                        v-model="payload.search" v-on:keyup.enter="searchOrg()" outlined dense></v-text-field>
                </div>
                <v-spacer></v-spacer>
                <v-btn @click="openAddDialog" color="success">
                    <v-icon>mdi-plus-circle</v-icon>
                    Add
                </v-btn>
            </div>
        </div>
        <v-data-table :headers="headers" :items="organizations.data" disable-pagination hide-default-footer
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
            <template #item.defaulting="{ item }">
                <span>{{ "salom" }}</span>
            </template>
        </v-data-table>
        <v-footer app inset>
            <v-row justify="center" class="py-2">
                <v-pagination color="success" v-model="current_page"
                    :length="organizations.meta.last_page" :total-visible="7"></v-pagination>
            </v-row>
        </v-footer>
        <Dialog ref="organization_dialog" @reload="get()" />
    </div>
</template>

<script>
import Dialog from "./Dialog";
export default {
    name: 'Organization',
    components: { Dialog },
    data() {
        return {
            payload: {
                search: '',
                page: 1
            },
            organizations: [],
            organization: {
                id: null,
                title: '',
                parent: {},
                active: true
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
                    text: 'Parent',
                    value: 'parent',
                    class: 'green lighten-2',
                    divider: true
                },
                {
                    text: 'X',
                    value: 'defaulting',
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
    created() {
        this.get()
    },
    watch: {
        "current_page": "changePage"
    },
    methods: {
        changePage(){
            this.payload.page = this.current_page
            this.get()
        },
        async get() {
            try {
                this.organizations = await this.$store.dispatch('organization/get', this.payload)
            } catch (error) {
                console.log(error);
            }
        },
        async changeActive(id) {
            try {
                await this.$store.dispatch('organization/changeActive', id)
                this.get()
            } catch (error) {
                console.log(error);
            }
        },
        openUpdateDialog(item) {
            this.$refs.organization_dialog.setData(item)
        },
        openAddDialog() {
            this.$refs.organization_dialog.dialog = true;
        },
        searchOrg() {
            this.payload.current_page = 1
            this.get();
        },
    }
}
</script>