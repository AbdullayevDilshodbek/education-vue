<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                :width="!drawer ? '50' : '250'"
                style="background-color: #1D2228; transition: width 0.8s"
                permanent
        >
            <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text color="white"
                           class="ma-2"
                           @click="drawer = !drawer"
                           style="transition: width 2s"
                           rounded icon>
                        <v-icon  v-text="drawer ? 'mdi-close-outline' : 'mdi-format-list-checkbox'">
                        </v-icon></v-btn>

            </v-row>
            <v-sheet
                    height="100"
                    style="background-color: #1D2228"
            >
                <v-avatar
                        class="my-auto ml-15 mt-2 mb-2"
                        color="white"
                        size="64"
                >
                    <v-img sizes="64" aspect-ratio="2" src="../assets/admin.png"></v-img>
                </v-avatar>


                <div class="mx-auto ml-14 white--text">John_Wick</div>
                <v-divider style="background-color: #fceeff"></v-divider>
            </v-sheet>


            <v-list dense dark>
                <v-list-item
                        v-for="[icon, text, link] in links"
                        :key="icon"
                        link
                        :to="link"
                        active-class="active_class"
                        @click=" test = !test"
                >
                    <v-list-item-icon>
                        <v-icon color="#2077b4">{{ icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content class="components">
                        <v-list-item-title>{{ text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main style="padding: 10px 25px 0px 25px;">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        name: "Main",
        data: () => ({
            cards: ['Today', 'Yesterday'],
            drawer: true,
            test: false,
            links: [
                ['mdi-account-key', 'Foydalanuvchilar', '/users'],
                ['mdi-locker-multiple', 'Fanlar', '/subject'],
                ['mdi-account-group', 'O`qituvchilar', '/teacher'],
                ['mdi-account-supervisor-circle-outline', 'Talabalar', '/student'],
                ['mdi-adobe-acrobat', 'Guruhlar', '/group'],
                ['mdi-microsoft-excel', 'Excel', '/excel'],
            ],
        }),
        created() {
            if (!localStorage.token)
                this.$router.push("/")
        }
    }
</script>

<style>
    .active_class {
        margin-left: 5px;
        color: #fceeff!important;
    }
    .components {
        color: #2077b4;
    }
</style>