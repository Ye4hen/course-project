<template>
    <div v-if="userCoins > 0" @click="closeDrawer" :class="{ 'is-dimmed': showDrawer }" class="game-area">
        <section class="dealer-side">
            <GameHand v-if="hands.length" :hand="hands[0]" :index="0" />
        </section>
        <section class="player-side">
            <template v-for="(hand, i) in hands" :key="i">
                <GameHand v-if="i > 0" :hand="hand" :index="i" />
            </template>
        </section>
        <TheControls :class="{ 'no-pointer-events': showDrawer }" />
    </div>
</template>

<script>
import GameHand from './TheGameArea/GameHand.vue'
import TheControls from './TheGameArea/TheControls.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    components: {
        GameHand,
        TheControls,
    },
    computed: {
        ...mapState('blackjack', ['activeHandIndex', 'hands', 'showDrawer']),
        ...mapGetters('blackjack', ['isGameOver']),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('games', { getGameById: 'getItemById' }),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        userCoins() {
            const coin = this.user.inventory.find((coin) => this.getCoinById(coin.id).category === this.game.category)
            return coin ? coin.amount : 0
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

    methods: {
        ...mapMutations('blackjack', ['toggleDrawer']),
        closeDrawer() {
            this.toggleDrawer({ show: false })
        },
    },
}
</script>

<style scoped>
.game-area {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    z-index: 50;
}
.is-dimmed {
    opacity: 0.5;
}
.no-pointer-events {
    pointer-events: none;
}
.dealer-side {
    margin-top: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    min-height: 12.4rem;
}
.player-side {
    flex: 1 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
}
</style>