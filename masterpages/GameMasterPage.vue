<template>
    <div v-if="game">
        <h2 class="game-comp__title title">{{ game.name }}</h2>
        <div class="game-comp__balance balance-game">
            <h4 class="balance-game__title small-title">Balance</h4>
            <template v-if="userCoins && userCoins.length > 0">
                <div v-for="coin in userCoins" :key="coin.id" class="balance-game__item">
                    <template v-if="coin && coin.amount > 0">
                        <img
                            class="balance-game-img"
                            :src="getCoinById(coin.id).img"
                            :alt="getCoinById(coin.id).name"
                        />
                        <div class="balance-game-amount">{{ coin.amount }}</div>
                    </template>
                    <div v-else class="balance-game__item">
                        <div>You do not have needed coins:(</div>
                        <router-link :to="{ name: 'shop' }">Go and buy some!</router-link>
                    </div>
                </div>
            </template>
            <div v-else class="balance-game__item">
                You do not have needed coins:(
                <router-link :to="{ name: 'shop' }">Go and buy some!</router-link>
            </div>
        </div>
        <slot></slot>
        <div class="game-comp__bg-img">
            <img :src="game.img" alt="game background" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'GameMasterPage',

    props: {
        game: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },

    computed: {
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        userCoins() {
            return this.user.inventory.filter((coin) => {
                if (this.getCoinById(coin.id)) {
                    return this.getCoinById(coin.id).category === this.game.category
                } else {
                    const storageCoinsList = JSON.parse(localStorage.getItem('coinsList'))
                    let storageCoin = storageCoinsList.find((coinStore) => coinStore.id == coin.id)
                    return storageCoin.category === this.game.category
                }
            })
        },
    },

    created() {
        this.setUsersList()
        this.setPrizesList()
        this.setGamesList()
        this.setCoinsList()
    },

    methods: {
        ...mapActions('login', { setUsersList: 'loadList' }),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('games', { setGamesList: 'loadList' }),

        ...mapActions('wheel_prizes', { setPrizesList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>