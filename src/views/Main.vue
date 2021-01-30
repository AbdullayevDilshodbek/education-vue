<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                style="background-color: #1D2228;"
                permanent
        >
            <v-sheet
                    height="100"
                    style="background-color: #1D2228"
            >
                <v-avatar
                        class="my-auto ml-15 mt-2 mb-2"
                        color="white"
                        size="64"
                >
                    <v-icon size="64">mdi-account</v-icon>
                </v-avatar>


                <div class="mx-auto ml-13 white--text">Dilshodbek</div>
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
            drawer: null,
            test: false,
            links: [
                ['mdi-account-key', 'Foydalanuvchilar', '/users'],
                ['mdi-locker-multiple', 'Fanlar', '/subject'],
                ['mdi-account-group', 'O`qituvchilar', '/teacher'],
                ['mdi-account-supervisor-circle-outline', 'Talabalar', '/student'],
                ['mdi-adobe-acrobat', 'Guruhlar', '/group'],
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