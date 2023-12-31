<template>
    <div class="header-popup-body__filter">
        <label>
            <input v-model.trim="filterData.name" type="text" placeholder="Search..." />
        </label>
        <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'PopupFilter',

    data() {
        return {
            filterData: {},
        }
    },

    computed: {
        ...mapGetters(['errorMessage']),
    },

    watch: {
        filterData: {
            handler(newValue) {
                this.updateFilter(newValue)
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('games', ['updateFilter']),
    },
}
</script>

<style lang="scss" scoped>
</style>