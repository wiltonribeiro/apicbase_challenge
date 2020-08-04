<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            @click="mockup ? null : goToEditPage(recipe)"
            class="pa-6 pb-4 rounded-xl recipe-card"
            :class="{ white: !hover, 'primary white--text': hover }"
        >
            <p class="text-h6 font-weight-medium mb-0">
                <span v-if="mockup && isAttributeEmpty(recipe.name)">
                    Recipe name
                </span>
                <span v-else>{{ recipe.name }}</span>
            </p>
            <p class="text-caption font-weight-medium">
                <span v-if="mockup && isAttributeEmpty(recipe.origin_country)">
                    Country of origin
                </span>
                <span class="text-capitalize" v-else
                    >Origin : {{ recipe.origin_country }}
                </span>
            </p>

            <div v-show="hover || mockup || !isDesktop" class="mt-2 mb-2">
                <div
                    class="d-flex justify-space-between text-caption"
                    v-for="(item, i) in recipe.items"
                    :key="i"
                >
                    <span>
                        {{ item.quantity }} x - {{ item.ingredient.name }}
                    </span>
                    <span class="font-weight-bold secondary--text">
                        € {{ parseFloat(item.calculateCost()).toFixed(2) }}
                    </span>
                </div>
            </div>

            <p
                class="mt-6 mb-0 font-weight-medium secondary--text text-h6"
                :class="{ 'd-flex justify-space-between': mockup }"
            >
                <span v-if="mockup">Total cost:</span>
                <span>
                    € {{ parseFloat(recipe.calculateTotalCost()).toFixed(2) }}
                </span>
            </p>
            <div
                v-show="!mockup"
                class="recipe-card__edit-msg text-uppercase"
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
    name: 'RecipeCard',
    props: {
        recipe: {
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
        goToEditPage(recipe) {
            this.$router.push({
                name: 'RecipeManagement',
                params: { action: 'update', recipe }
            });
        }
    },
    computed: {
        isDesktop() {
             return this.$vuetify.breakpoint.lg;
        }
    }
};
</script>

<style lang="scss">
#app .recipe-card {
    cursor: pointer;
    position: relative;
    transition: all 0.5s ease;
    box-shadow: 0px 10px 11px 1px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: translateX(-10px) translateZ(0);

        & > .recipe-card__edit-msg {
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
        width: 50px;
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
