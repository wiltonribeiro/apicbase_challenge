<template>
    <div class="home">
        <v-row no-gutters>
            <v-col class="col-md-9 home__welcome">
                <app-bar class="app-bar" />
                <div class="about">
                    <v-row class="pa-8 mt-12">
                        <v-col class="about__content col-md-6">
                            <p class="text-h1 font-weight-black primary--text">
                                Epicbase Challenge
                            </p>
                            <p class="text-body-1">
                                That's a challenge made with love to Epicbase
                                company
                            </p>
                            <div class="d-flex mt-8">
                                <v-btn
                                    @click="goToCreatePage"
                                    rounded
                                    large
                                    color="primary"
                                >
                                    Add a new ingredient
                                </v-btn>
                                <v-btn text large color="primary">
                                    or create a new recipe
                                </v-btn>
                            </div>
                        </v-col>
                        <v-col class="about__image col-md-6">
                            <img :src="img" />
                        </v-col>
                    </v-row>
                </div>
                <div
                    class="footer d-flex justify-space-between pa-8 text-caption primary--text"
                >
                    <span>DEVELOPED BY <b>WILTON NETO</b></span>
                    <span>FINISHED AT <b>AUGUST, 2020 - BRAZIL</b></span>
                </div>
            </v-col>
            <v-col class="col-md-3 home__inventory">
                <v-tabs
                    v-model="tab"
                    class="pt-8 pa-4"
                    slider-color="transparent"
                    background-color="transparent"
                >
                    <v-tab v-for="(tab, i) in tabs" :key="i">
                        {{ tab.tabName }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="(tab, i) in tabs" :key="i">
                        <component :is="tab.tabComponent" />
                    </v-tab-item>
                </v-tabs-items>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import AppBar from '../components/AppBar';
import img from '../assets/clip-chef-made-giant-hamburger.png';
import IngredientsList from '../components/IngredientsList';
import RecipesList from '../components/RecipesList';

export default {
    name: 'Home',
    components: {
        AppBar,
        RecipesList,
        IngredientsList
    },
    data() {
        return {
            img: img,
            tab: null,
            tabs: [
                {
                    tabName: 'Ingredients',
                    tabComponent: 'IngredientsList'
                },
                {
                    tabName: 'Recipes',
                    tabComponent: 'RecipesList'
                }
            ]
        };
    },
    methods: {
        goToCreatePage() {
            this.$router.push({
                name: 'IngredientManagement',
                params: { action: 'create' }
            });
        }
    }
};
</script>

<style lang="scss">
$light_blue: #e4eefd;

#app .home {
    height: 100%;

    & > .row {
        height: 100%;
    }

    &__welcome {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: white;

        .about {
            flex: 1;
            display: flex;
            align-items: center;

            &__image {
                text-align: center;
                img {
                    margin-top: 10%;
                    width: 100%;
                }
            }
        }

        .app-bar {
            flex: 0;
        }

        .footer {
            flex: 0;
        }
    }

    &__inventory {
        height: 100vh;
        background-color: $light_blue;
        display: flex;
        flex-direction: column;

        .v-tab {
            text-transform: unset;
        }

        .v-tabs {
            flex: 0;
            &-items {
                flex: 1;
                overflow: auto;
                background-color: transparent;
                .v-window__container,
                .v-window-item {
                    height: 100%;
                }
            }
        }
    }
}
</style>
