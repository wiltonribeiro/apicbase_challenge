<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            @click="mockup ? null : goToEditPage(ingredient)"
            class="pa-6 pb-4 rounded-xl ingredient-card"
            :class="{ white: !hover, 'primary white--text': hover }"
        >
            <p class="text-h6 font-weight-medium mb-0">
                <span v-if="mockup && isAttributeEmpty(ingredient.name)">
                    Ingredient name
                </span>
                <span v-else>{{ ingredient.name }}</span>
            </p>
            <p class="text-caption font-weight-medium">
                <span v-if="mockup && isAttributeEmpty(ingredient.unit)">
                    Ingredient unit
                </span>
                <span class="text-capitalize" v-else
                    >Unit: {{ ingredient.unit }}
                </span>
            </p>

            <p v-show="hover || mockup" class="text-caption">
                {{ ingredient.description }}
            </p>

            <p class="mt-6 mb-0 font-weight-medium secondary--text text-h6">
                €
                <span v-if="!isAttributeEmpty(ingredient.cost)">
                    {{ parseFloat(ingredient.cost).toFixed(2) }}
                </span>
            </p>
            <div
                v-show="!mockup"
                class="ingredient-card__edit-msg text-uppercase"
                :class="{ white: hover, primary: !hover }"
            >
                <v-icon small :color="hover ? 'primary' : 'white'">
                    mdi-pencil
                </v-icon>
                <span class="text-caption font-weight-medium primary--text">
                    Click to edit
                </span>
            </div>
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
        mockup: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        isAttributeEmpty(attribute) {
            return attribute == null || attribute.length === 0;
        },
        goToEditPage(ingredient) {
            this.$router.push({
                name: 'IngredientManagement',
                params: { action: 'update', ingredient }
            });
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

        & > .ingredient-card__edit-msg {
            width: 50%;
            display: flex;
            flex-wrap: nowrap;
            span {
                display: block;
            }
        }
    }

    &__edit-msg {
        right: 0;
        bottom: 0;
        width: 15%;
        overflow: hidden;
        padding: 10px 15px;
        position: absolute;
        transition: all 0.5s ease;
        border-radius: 20px 0 20px 0;

        span {
            white-space: nowrap;
            margin-left: 15px;
            display: none;
        }
    }
}
</style>
