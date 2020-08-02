<template>
    <div class="pl-6 pr-6 ingredients">
        <transition name="fade">
            <v-progress-linear
                rounded
                color="primary"
                indeterminate
                v-show="statusRequest.loading"
            ></v-progress-linear>
        </transition>

        <section
            class="ingredients__list--empty"
            v-if="!statusRequest.loading && notFound"
        >
            <img :src="notFoundImg" />
            <p class="text-caption">
                There's no <b>ingredients</b> registred in the system
            </p>
        </section>

        <section v-else-if="!notFound" class="ingredients-list">
            <div
                class="mb-8"
                v-for="ingredient in ingredients"
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

export default {
    name: 'IngredientsList',
    components: {
        IngredientCard
    },
    data() {
        return {
            notFoundImg: notFoundImg
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
        this.fetchAll();
    }
};
</script>

<style lang="scss">
#app .ingredients {
    height: 100%;
    display: flex;
    flex-direction: column;

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

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
