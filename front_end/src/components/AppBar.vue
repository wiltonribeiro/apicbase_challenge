<template>
    <v-app-bar elevation="0" color="white pa-8" dense>
        <img width="120px" :src="logo" />
        <span class="font-weight-bold ml-6 d-none d-lg-inline">
            Frontend Developer Assignment 2020
        </span>
        <v-spacer></v-spacer>
        <span class="d-none d-lg-inline font-weight-bold mr-6 primary--text">Wilton Neto</span>
        <v-badge overlap color="secondary" dot>
            <v-avatar color="grey" size="48">
                <v-img
                    src="https://instagram.fflb1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/67665365_2450241365068089_3690825616912809984_n.jpg?_nc_ht=instagram.fflb1-1.fna.fbcdn.net&_nc_ohc=1Mr06IeSlv0AX94Kf5A&oh=763f446bbaf2178d2a370b88c98a5908&oe=5F51BFE4"
                ></v-img>
            </v-avatar>
        </v-badge>
    </v-app-bar>
</template>

<script>
import logo from '../assets/logo.svg';

export default {
    name: 'AppBar',
    data() {
        return {
            logo
        };
    }
};
</script>
