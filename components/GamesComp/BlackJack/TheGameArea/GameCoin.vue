<template>
    <img v-if="userCoin" class="game-coin" :src="userCoin.img" alt="" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            user: {},
            game: {},
        }
    },

    computed: {
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('games', { getGameById: 'getItemById' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        userCoin() {
            const coinsData = this.user.inventory.filter(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            if (coinsData.length === 1) {
                return this.getCoinById(coinsData[0].id)
            } else if (!coinsData.length) {
                const defCoin = this.coinsList.filter((coin) => coin.category === this.game.category)
                return this.getCoinById(defCoin[0].id)
            } else {
                const highestCoin = coinsData.reduce((maxCoin, currentCoin) => {
                    const maxCoinData = this.getCoinById(maxCoin.id)
                    const currentCoinData = this.getCoinById(currentCoin.id)
                    return maxCoinData.amount > currentCoinData.amount ? maxCoin : currentCoin
                })

                return this.getCoinById(highestCoin.id)
            }
        },
        gameId() {
            return this.$route.params.gameId
        },
    },

    created() {
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
    },
}
</script>

<style scoped>
.game-coin {
    width: 3.5rem;
    height: 3.5rem;
}

.not-coin {
    display: none;
}
</style>