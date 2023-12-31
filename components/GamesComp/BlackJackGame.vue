<template>
    <div class="game-comp-item" style="text-align: center">
        <TheGameArea />
        <TheTitleScreen v-if="isTitleShowing" />
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import TheTitleScreen from '@/components/GamesComp/BlackJack/TheTitleScreen.vue'
import TheGameArea from '@/components/GamesComp/BlackJack/TheGameArea.vue'

export default {
    name: 'BlackJackGame',

    data() {
        return {
            game: {},
            user: {},
        }
    },

    components: {
        TheTitleScreen,
        TheGameArea,
    },

    computed: {
        ...mapState('blackjack', ['isTitleShowing']),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('games', { getGameById: 'getItemById', gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        gameId() {
            return this.$route.params.gameId
        },
        userCoins() {
            const coinsData = this.user.inventory.filter(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            if (coinsData.length === 1) {
                return coinsData[0].amount
            } else if (!coinsData.length) return 0
            const highestCoin = coinsData.reduce((maxCoin, currentCoin) => {
                const maxCoinData = this.getCoinById(maxCoin.id)
                const currentCoinData = this.getCoinById(currentCoin.id)
                return maxCoinData.amount > currentCoinData.amount ? maxCoin : currentCoin
            })

            return highestCoin.amount
        },
    },

    created() {
        this.setGamesList()
        if (this.getUserById(this.userProfileId)) {
            this.user = { ...this.getUserById(this.userProfileId) }
        } else {
            this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        }
        if (this.getGameById(this.gameId)) {
            this.game = { ...this.getGameById(this.gameId) }
        } else {
            this.game = { ...JSON.parse(localStorage.getItem('game')) }
        }
        if (this.userCoins && this.userCoins > 0) {
            this.startNewGame(this.userCoins)
        }
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('blackjack', ['startNewGame']),
    },
}
</script>

<style lang="scss" scoped>
</style>