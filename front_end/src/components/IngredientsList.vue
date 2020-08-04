<template>
    <div class="ingredients">
        <transition name="fade">
            <div class="mb-4 pl-6 pr-6" v-show="statusRequest.loading">
                <v-progress-linear
                    rounded
                    color="primary"
                    indeterminate
                ></v-progress-linear>
            </div>
        </transition>

        <SearchBar
            v-if="!notFound && !statusRequest.loading"
            :items="ingredients"
            @filtered-items="items => (filteredIngredients = items)"
        />

        <section
            class="ingredients__list--empty pl-6 pr-6"
            v-if="!statusRequest.loading && notFound"
        >
            <img :src="notFoundImg" />
            <p class="text-caption">
                There's no <b>ingredients</b> registred in the system
            </p>
        </section>

        <section v-else-if="!notFound" class="ingredients-list pl-6 pr-6">
            <div
                class="mb-8"
                v-for="ingredient in filteredIngredients"
                :key="ingredient.id"
            >
                <IngredientCard :ingredient="ingredient" />
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import notFoundImg from '../assets/not_found.png';
import IngredientCard from './IngredientCard';
import SearchBar from '../components/SearchBar';

export default {
    name: 'IngredientsList',
    components: {
        IngredientCard,
        SearchBar
    },
    data() {
        return {
            notFoundImg: notFoundImg,
            filteredIngredients: []
        };
    },
    methods: {
        ...mapActions({
            fetchAll: 'ingredient/fetchAll'
        })
    },
    computed: {
        ...mapGetters({
            statusRequest: 'ingredient/getStatus',
            ingredients: 'ingredient/getIngredients'
        }),
        notFound() {
            return this.ingredients == null || this.ingredients.length == 0;
        }
    },
    created() {
        if (this.notFound && !this.statusRequest.loading) {
            this.fetchAll();
        }
    },
    watch: {
        ingredients: function(value) {
            this.filteredIngredients = value;
        }
    }
};
</script>

<style lang="scss">
#app .ingredients {
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
