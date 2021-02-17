<template>
    <v-row justify="center">
        <v-overlay
                z-index="10"
                :value="overlay"
        >
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
            ></v-progress-circular>
        </v-overlay>
    </v-row>
</template>

<script>
    export default {
        name: "overlay",
        props: ['overlay']
    }
</script>

<style scoped>

</style>