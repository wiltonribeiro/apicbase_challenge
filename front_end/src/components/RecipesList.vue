<template>
    <div class="pl-8 pr-8 recipes">
        <transition name="fade">
            <v-progress-linear
                rounded
                color="primary"
                indeterminate
                v-show="statusRequest.loading"
            ></v-progress-linear>
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
            oi cheio
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import notFoundImg from '../assets/not_found.png';

export default {
    name: 'RecipesList',
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
            recipes: 'recipe/getrecipes'
        }),
        notFound() {
            return this.recipes == null || this.recipes.length == 0;
        }
    },
    created() {
        this.fetchAll();
    }
};
</script>

<style lang="scss">
#app .recipes {
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
