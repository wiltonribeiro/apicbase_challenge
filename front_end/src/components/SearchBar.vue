<template>
    <div
        class="mb-6 search-bar primary"
        :class="{ 'search-bar--active': activated }"
    >
        <v-text-field
            dark
            dense
            height="30px"
            v-model="input"
            @input="filterItems"
            placeholder="Serach by id or name"
            class="search-bar__input text-body-2 white--text"
        />
        <v-icon
            @click="activated = !activated"
            class="search-bar__icon"
            color="white"
        >
            {{ activated ? 'mdi-close' : 'mdi-magnify' }}
        </v-icon>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: ['items'],
    data() {
        return {
            activated: false,
            input: ''
        };
    },
    methods: {
        filterItems() {
            let filteredItems = [];
            if (this.input == null || this.input.trim().length === 0) {
                filteredItems = this.items;
            } else {
                filteredItems = this.items.filter(item => {
                    return (
                        item.id == this.input ||
                        item.name.toUpperCase().includes(this.input.toUpperCase())
                    );
                });
            }
            this.$emit('filtered-items', filteredItems);
        }
    },
    created() {
        this.filterItems();
    }
};
</script>

<style lang="scss">
#app .search-bar {
    width: 45px;
    padding: 10px;
    display: flex;
    transition: all 0.5s ease;
    border-radius: 0 10px 10px 0;
    justify-content: space-between;

    .v-text-field {
        visibility: hidden;
    }

    &--active {
        width: 95%;
        .v-text-field {
            visibility: visible;
        }
    }

    &__input {
        max-width: 80%;
        .v-text-field__details {
            display: none;
        }
    }

    &__icon {
        cursor: pointer;
    }
}
</style>
