<template>
    <div class="pl-6 pr-6 recipes">
        <transition name="fade">
            <div class="mb-4" v-show="statusRequest.loading">
                <v-progress-linear
                    rounded
                    color="primary"
                    indeterminate
                ></v-progress-linear>
            </div>
        </transition>

        <section
            class="recipes__list--empty"
            v-if="!statusRequest.loading && notFound"
        >
            <img :src="notFoundImg" />
            <p class="text-caption">
                There's no <b>recipes</b> registred in the system
            </p>
        </section>

        <section v-else-if="!notFound" class="recipes-list">
            <div class="mb-8" v-for="(recipe, i) in recipes" :key="i">
                <RecipeCard :recipe="recipe" />
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import notFoundImg from '../assets/not_found.png';
import RecipeCard from './RecipeCard';

export default {
    name: 'RecipesList',
    components: {
        RecipeCard
    },
    data() {
        return {
            notFoundImg: notFoundImg
        };
    },
    methods: {
        ...mapActions({
            fetchAll: 'recipe/fetchAll'
        })
    },
    computed: {
        ...mapGetters({
            statusRequest: 'recipe/getStatus',
            recipes: 'recipe/getRecipes'
        }),
        notFound() {
            return this.recipes == null || this.recipes.length == 0;
        }
    },
    created() {
        if (this.notFound && !this.statusRequest.loading) {
            this.fetchAll();
        }
    }
};
</script>

<style lang="scss">
#app .recipes {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__list {
        &--empty {
            align-self: center;
            text-align: center;
            margin: auto;

            img {
                max-width: 200px;
            }
        }
    }
}
</style>
