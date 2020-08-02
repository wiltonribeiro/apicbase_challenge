<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            class="pa-6 pb-4 rounded-xl ingredient-card"
            :class="{ white: !hover, 'primary white--text': hover }"
        >
            <p class="text-h6 font-weight-medium mb-0">
                {{ ingredient.name }}
            </p>
            <p class="text-caption font-weight-medium text-capitalize">
                Unit: {{ ingredient.unit }}
            </p>

            <p class="mt-6 mb-0 font-weight-medium secondary--text text-h6">{{ parseFloat(ingredient.cost).toFixed(2) }} ‎€</p>
            <button
                class="ingredient-card__edit-button"
                :class="{ white: hover, primary: !hover }"
            >
                <v-icon small :color="hover ? 'primary' : 'white'">
                    mdi-pencil
                </v-icon>
            </button>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: 'IngredientCard',
    props: {
        ingredient: {
            type: Object,
            required: true
        },
        expanded: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
#app .ingredient-card {
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease;
    box-shadow: 0px 10px 11px 1px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: translateX(-10px) translateZ(0);
    }

    &__edit-button {
        right: 0;
        bottom: 0;
        padding: 10px 15px;
        position: absolute;
        transition: all 0.5s ease;
        border-radius: 20px 0 20px 0;
    }
}
</style>
