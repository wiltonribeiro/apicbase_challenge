<template>
    <div class="recipes">
        <transition name="fade">
            <div class="mb-4  pl-6 pr-6" v-show="statusRequest.loading">
                <v-progress-linear
                    rounded
                    color="primary"
                    indeterminate
                ></v-progress-linear>
            </div>
        </transition>

        <SearchBar
            v-if="!notFound && !statusRequest.loading"
            :items="recipes"
            @filtered-items="items => (filteredRecipes = items)"
        />

        <section
            class="recipes__list--empty  pl-6 pr-6"
            v-if="!statusRequest.loading && notFound"
        >
            <img :src="notFoundImg" />
            <p class="text-caption">
                There's no <b>recipes</b> registred in the system
            </p>
        </section>

        <section v-else-if="!notFound" class="recipes-list  pl-6 pr-6">
            <div class="mb-8" v-for="(recipe, i) in filteredRecipes" :key="i">
                <RecipeCard :recipe="recipe" />
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import notFoundImg from '../assets/not_found.png';
import RecipeCard from './RecipeCard';
import SearchBar from '../components/SearchBar';

export default {
    name: 'RecipesList',
    components: {
        RecipeCard,
        SearchBar
    },
    data() {
        return {
            notFoundImg: notFoundImg,
            filteredRecipes: []
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
    },
    watch: {
        recipes: function(value) {
            this.filteredRecipes = value;
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
