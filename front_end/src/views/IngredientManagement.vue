<template>
    <div class="management">
        <v-row no-gutters class="pa-8 management__back">
            <v-col class="col-12 primary--text">
                <v-btn @click="() => $router.back()" class="primary--text" text>
                    <v-icon class="mr-4">mdi-arrow-left</v-icon>
                    return to home
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="pa-8">
            <v-col class="management__content md-6 pa-8">
                <div class="management__header">
                    <div v-if="action === 'create'">
                        <p class="text-h3 font-weight-medium">
                            Let's add a new ingredient
                        </p>
                        <p class="text-subtitle-1 primary--text">
                            In order to add a new ingredient you need to fulfill
                            some few fields.
                        </p>
                    </div>
                    <div v-else>
                        <p class="text-h3 font-weight-medium">
                            Let's update the ingredient
                        </p>
                        <p class="text-subtitle-1 primary--text">
                            In order to update a new ingredient just change what
                            you want and click in update.
                        </p>
                    </div>
                </div>
                <div class="management__form">
                    <v-form ref="form" class="pt-8" v-model="valid">
                        <v-row>
                            <v-col class="col-12">
                                <v-text-field
                                    :rules="[rules.required]"
                                    v-model="form.name"
                                    placeholder="e.g. Parmesan Cheese"
                                    color="secondary"
                                    label="Name"
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-md-6">
                                <v-text-field
                                    type="number"
                                    :rules="[rules.required, rules.positive]"
                                    v-model="form.cost"
                                    prefix="€"
                                    color="secondary"
                                    label="Cost by unit"
                                ></v-text-field>
                            </v-col>
                            <v-col class="col-md-6">
                                <v-select
                                    :rules="[rules.required]"
                                    v-model="form.unit"
                                    :items="units"
                                    label="Unit"
                                ></v-select>
                            </v-col>
                            <v-col class="col-12">
                                <v-textarea
                                    v-model="form.description"
                                    rows="2"
                                    placeholder="e.g. Parmesan cheese is made from raw cow's milk. It is a hard granulated cheese that is cooked but not pressed. Parmesan cheese has a fruity nutty taste."
                                    color="secondary"
                                >
                                    <template v-slot:label>
                                        <div>
                                            Description
                                            <small>(optional)</small>
                                        </div>
                                    </template>
                                </v-textarea>
                            </v-col>
                            <v-col class="d-flex col-12 white--text">
                                <div v-if="action === 'create'">
                                    <v-btn
                                        color="primary"
                                        :disabled="!valid"
                                        @click="createIngredient"
                                    >
                                        Create ingredient
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <v-btn
                                        color="primary"
                                        :disabled="!valid"
                                        @click="updateIngredient"
                                    >
                                        Update ingredient
                                    </v-btn>

                                    <v-btn
                                        text
                                        class="ml-4"
                                        color="error"
                                        @click="deleteIngredient"
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
                    <IngredientCard :ingredient="form" mockup />
                </CursorTracker>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import bgImage from '../assets/test.png';
import IngredientCard from '../components/IngredientCard';
import CursorTracker from '../components/CursorTracker';
import { mapActions } from 'vuex';

export default {
    name: 'IngredientManagement',
    props: {
        action: {
            type: String,
            default: 'create'
        },
        ingredient: {
            type: Object
        }
    },
    components: {
        IngredientCard,
        CursorTracker
    },
    data() {
        return {
            bgImage: bgImage,
            valid: false,
            form: {
                id: null,
                cost: null,
                name: '',
                unit: '',
                description: ''
            },
            rules: {
                required: value => !!value || 'This field is required',
                positive: value =>
                    value > 0 || 'Cost should be greater than zero'
            },
            units: ['grams', 'kilograms', 'centiliter', 'liter']
        };
    },
    computed: {
        isEmpty() {
            let emptyFlag = true;
            Object.keys(this.form).forEach(key => {
                if (this.form[key] != '' && this.form[key] !== null) {
                    emptyFlag = false;
                }
            });
            return emptyFlag;
        }
    },
    methods: {
        ...mapActions({
            create: 'ingredient/create',
            update: 'ingredient/update',
            delete: 'ingredient/delete'
        }),
        clearForm: function() {
            this.$refs.form.reset();
        },
        mapIngredientToFields: function() {
            this.form = { ...this.ingredient };
        },
        createIngredient() {
            this.create({ ...this.form });
            this.$router.back();
        },
        updateIngredient() {
            this.update({ ...this.form });
            this.$router.back();
        },
        deleteIngredient() {
            this.delete(this.ingredient.id);
            this.$router.back();
        }
    },
    created() {
        if (this.action === 'update') {
            this.mapIngredientToFields();
        }
    },
    mounted() {
        if (this.action === 'update') {
            this.$refs.form.validate();
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
    }

    &__mockup {
        position: relative;

        img {
            max-width: 100%;
        }
    }
}
</style>
