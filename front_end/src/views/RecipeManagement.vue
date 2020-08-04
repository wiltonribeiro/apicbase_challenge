<template>
    <div class="management">
        <v-row no-gutters class="pa-8 pb-4 management__back">
            <v-col class="col-12 primary--text">
                <v-btn @click="() => $router.back()" class="primary--text" text>
                    <v-icon class="mr-4">mdi-arrow-left</v-icon>
                    return to home
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="pa-8 pt-2 pb-0">
            <v-col class="management__content md-6 pa-8 pb-4">
                <div class="management__header">
                    <div v-if="action === 'create'">
                        <p class="text-h3 font-weight-medium">
                            Let's add a new recipe
                        </p>
                        <p class="text-subtitle-1 primary--text">
                            In order to add a new recipe you need to fulfill
                            some few fields.
                        </p>
                    </div>
                    <div v-else>
                        <p class="text-h3 font-weight-medium">
                            Let's update the recipe
                        </p>
                        <p class="text-subtitle-1 primary--text">
                            In order to update a new recipe just change what you
                            you want and click in update.
                        </p>
                    </div>
                </div>
                <div class="management__form">
                    <v-form ref="form" class="pt-4" v-model="valid">
                        <v-row>
                            <v-col class="col-6">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="form.name"
                                    placeholder="e.g. Chef John's Blueberry Dutch Baby"
                                    color="secondary"
                                    label="Name"
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-6">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="form.origin_country"
                                    placeholder="e.g. Netherlands"
                                    color="secondary"
                                    label="Origin's country"
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-12">
                                <v-text-field
                                    v-model="search"
                                    color="secondary"
                                    label="Ingredients"
                                    placeholder="e.g. Cheese"
                                    prepend-inner-icon="mdi-magnify"
                                ></v-text-field>
                                <v-data-table
                                    :loading="ingredientsStatusRequest.loading"
                                    :search="search"
                                    :items-per-page="5"
                                    :headers="headers"
                                    hide-default-header
                                    :items="ingredients"
                                    sort-by="calories"
                                    class="elevation-0"
                                >
                                    <template v-slot:item.quantity="{ item }">
                                        <v-btn
                                            @click="addIngredientToRecipe(item)"
                                            color="primary"
                                            text
                                            small
                                            class="mr-2"
                                        >
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                        <span class="font-weight-bold">
                                            {{ getIngredientQuantity(item.id) }}
                                        </span>
                                        <v-btn
                                            color="primary"
                                            text
                                            small
                                            class="ml-2"
                                            @click="decreaseIngredientFromRecipe( item.id )"
                                            :disabled="getIngredientQuantity(item.id) === 0"
                                        >
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </v-col>
                            <v-col class="d-flex col-12 white--text">
                                <div v-if="action === 'create'">
                                    <v-btn
                                        @click="createRecipe"
                                        color="primary"
                                        :disabled="!valid"
                                    >
                                        Create recipe
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <v-btn
                                        @click="updateRecipe"
                                        color="primary"
                                        :disabled="!valid"
                                    >
                                        Update recipe
                                    </v-btn>

                                    <v-btn
                                        @click="deleteRecipe"
                                        text
                                        class="ml-4"
                                        color="error"
                                    >
                                        Delete
                                    </v-btn>
                                </div>
                                <v-btn
                                    @click="clearForm"
                                    :disabled="isEmpty"
                                    color="primary"
                                    class="ml-4"
                                    text
                                >
                                    Clear form
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
                <div class="management__actions"></div>
            </v-col>
            <v-col class="md-6 management__mockup">
                <CursorTracker :speed="20" top="50%" left="50%" width="100%">
                    <img :src="bgImage" />
                </CursorTracker>
                <CursorTracker :speed="40" top="50%" left="65%" width="80%">
                    <RecipeCard :recipe="recipeModel" mockup />
                </CursorTracker>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import bgImage from '../assets/test.png';
import CursorTracker from '../components/CursorTracker';
import { mapGetters, mapActions } from 'vuex';
import RecipeItem from '../models/RecipeItem';
import Recipe from '../models/Recipe';
import RecipeCard from '../components/RecipeCard';

export default {
    name: 'RecipeManagement',
    props: {
        action: {
            type: String,
            default: 'create'
        },
        recipe: {
            type: Object
        }
    },
    components: {
        CursorTracker,
        RecipeCard
    },
    data() {
        return {
            bgImage: bgImage,
            valid: false,
            search: '',
            form: {
                id: null,
                name: '',
                origin_country: ''
            },
            items: [],
            rules: {
                required: value => !!value || 'This field is required'
            },
            headers: [
                {
                    text: "Ingredient's Name",
                    align: 'start',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'Quantity',
                    value: 'quantity',
                    sortable: false,
                    align: 'end'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            ingredientsStatusRequest: 'ingredient/getStatus',
            ingredients: 'ingredient/getIngredients'
        }),
        ingredientsNotFound() {
            return this.ingredients == null || this.ingredients.length == 0;
        },
        isEmpty() {
            let emptyFlag = true;
            Object.keys(this.form).forEach(key => {
                if (this.form[key] != '' && this.form[key] !== null) {
                    emptyFlag = false;
                }
            });
            return emptyFlag;
        },
        recipeModel() {
            return new Recipe(
                this.form.id,
                this.form.name,
                this.form.origin_country,
                this.items
            );
        }
    },
    methods: {
        ...mapActions({
            fetchAllIngredients: 'ingredient/fetchAll',
            create: 'recipe/create',
            update: 'recipe/update',
            delete: 'recipe/delete'
        }),
        clearForm: function() {
            this.$refs.form.$children[0].reset();
            this.$refs.form.$children[1].reset();
            this.items = [];
        },
        mapRecipeToFields: function() {
            this.form = { ...this.recipe };
            this.items = this.recipe.items;
        },
        getIngredientQuantity(id) {
            let recipeItem = this.getRecipeItemByIngredientId(id);
            if (recipeItem) {
                return recipeItem.quantity;
            }
            return 0;
        },
        getRecipeItemByIngredientId(id) {
            return this.items.find(
                ({ ingredient }) => ingredient.id == id
            );
        },
        addIngredientToRecipe(ingredient) {
            let recipeItem = null;
            if (this.getIngredientQuantity(ingredient.id) === 0) {
                recipeItem = new RecipeItem(null, ingredient, 1);
                this.items.push(recipeItem);
            } else {
                recipeItem = this.getRecipeItemByIngredientId(ingredient.id);
                recipeItem.quantity = recipeItem.quantity + 1;
            }
        },
        decreaseIngredientFromRecipe(id) {
            let quantity = this.getIngredientQuantity(id);
            if (quantity === 1) {
                // Case when the RecipeItem needs to be removed from array
                let index = this.items.findIndex(
                    ({ ingredient }) => ingredient.id == id
                );
                this.items.splice(index, 1);
            } else if (quantity > 1) {
                // Case when the RecipeItem needs to be just decreased
                let recipeItem = this.getRecipeItemByIngredientId(id);
                recipeItem.quantity = recipeItem.quantity - 1;
            }
        },
        createRecipe() {
            this.create(this.recipeModel);
            this.$router.back();
        },
        updateRecipe() {
            this.update(this.recipeModel);
            this.$router.back();
        },
        deleteRecipe() {
            this.delete(this.recipeModel.id);
            this.$router.back();
        }
    },
    created() {
        if (this.ingredientsNotFound) {
            this.fetchAllIngredients();
        }

        if (this.action === 'update') {
            this.mapRecipeToFields();
        }
    },
    mounted() {
        if (this.action === 'update') {
            this.$refs.form.validate();
        }
    },
    watch: {
        statusRequest: {
            handler: function(after, before) {
                // Using watch to cover the case of mapping the recipe fields
                // when the ingredients were not populated yet
                if (
                    !this.ingredientsNotFound &&
                    before.loading === true &&
                    after.loading === false
                ) {
                    this.mapRecipeToFields();
                }
            },
            deep: true
        }
    }
};
</script>

<style lang="scss">
$light_blue: #e4eefd;

#app .management {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__back {
        flex: 0;
    }

    & > div:not(.management__back) {
        flex: 1;
    }

    &__content {
        margin: auto;
        .v-data-table {
            width: 100%;
            min-height: 300px;

            .v-data-table__wrapper {
                min-height: 215px;
            }
        }
    }

    &__mockup {
        position: relative;

        img {
            max-width: 100%;
        }
    }
}
</style>
