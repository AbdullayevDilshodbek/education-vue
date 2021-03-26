<template>
    <v-pagination
            v-model="currentPage"
            class="my-4"
            :color="'#2AC940'"
            circle
            :length="lastPage"
            total-visible="8"
    ></v-pagination>
</template>

<script>

    export default {
        name: 'PaginationActions',
        props: ['store', 'collection', 'method'],
        watch: {
            currentPage(newVal) {
                this.paginatePage(newVal);
            }
        },
        computed: {
            currentPage: {
                get() {
                    this.overlay = true;
                    try {
                        return this.$store.state[this.store]['data'].meta['current_page'];
                    } catch (e) {
                        return 0;
                    }
                },
                set(value) {
                    this.$store.commit(this.store + '/setCurrentPage', value);
                }
            },
            lastPage: {
                get() {
                    this.overlay = false;
                    try {
                        return this.$store.state[this.store]['data'].meta['last_page'];
                    } catch (e) {
                        return 0;
                    }
                }
            }
        },

        methods: {
            paginatePage(pageNumber) {
                let params=this.$store.state[this.store].params;
                params.pageNumber=pageNumber;
                this.$store.dispatch(this.store + '/'+this.method, params);
            }
        },
    }
</script>
