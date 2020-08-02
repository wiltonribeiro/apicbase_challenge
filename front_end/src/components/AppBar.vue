<template>
    <v-app-bar elevation="0" color="white pa-8" dense>
        <v-autocomplete
            class="mx-4 ml-0"
            flat
            rounded
            hide-no-data
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
        ></v-autocomplete>
        <v-spacer></v-spacer>

        <v-badge overlap color="#F6B643" dot>
            <v-avatar color="grey" size="48">
                <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                ></v-img>
            </v-avatar>
        </v-badge>
    </v-app-bar>
</template>

<script>
export default {
    name: 'AppBar'
};
</script>
