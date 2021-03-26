<template>
    <v-card width="100%" style="margin:  0 0 0">
        <v-tabs
                v-model="subtab"
                color="indigo"
        >
            <v-tab
                    v-for="(st, index) in currentSubTabs"
                    :key="index"
                    :to="st.to"
            >
                {{ st.name }}
            </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <router-view></router-view>
    </v-card>
</template>

<script>
    export default {
        name: "TabTest",
        data() {
            return {
                tab: 0,
                subtab: 0,
                tabs: [
                    {
                        name: "TabTest",
                        children: [
                            {
                                name: "Joriy qarz",
                                to: "/currentDebt",
                            },
                            {
                                name: "Xisob-kitob",
                                to: "/calculation",
                            },
                        ],
                    },
                ],
            };
        },
        components: {},
        computed: {
            currentSubTabs() {
                return this.tabs[this.tab].children
            }
        },
        watch: {
            tab(value) {
                this.$router.push(this.tabs[value].children[0].to)
            }
        }
    };
</script>

<style scoped></style>
