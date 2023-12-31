<template>
    <main-master-page>
        <!-- <div v-if="isLoading" class="loading">
            <svg
                version="1.1"
                id="L1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                xml:space="preserve"
            >
                <circle
                    fill="none"
                    stroke="#fff"
                    stroke-width="6"
                    stroke-miterlimit="15"
                    stroke-dasharray="14.2472,14.2472"
                    cx="50"
                    cy="50"
                    r="47"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="5s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                    />
                </circle>
                <circle
                    fill="none"
                    stroke="#fff"
                    stroke-width="1"
                    stroke-miterlimit="10"
                    stroke-dasharray="10,10"
                    cx="50"
                    cy="50"
                    r="39"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="5s"
                        from="0 50 50"
                        to="-360 50 50"
                        repeatCount="indefinite"
                    />
                </circle>
                <g fill="#fff">
                    <rect x="30" y="35" width="5" height="30">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.1"
                        />
                    </rect>
                    <rect x="40" y="35" width="5" height="30">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.2"
                        />
                    </rect>
                    <rect x="50" y="35" width="5" height="30">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.3"
                        />
                    </rect>
                    <rect x="60" y="35" width="5" height="30">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.4"
                        />
                    </rect>
                    <rect x="70" y="35" width="5" height="30">
                        <animateTransform
                            attributeName="transform"
                            dur="1s"
                            type="translate"
                            values="0 5 ; 0 -5; 0 5"
                            repeatCount="indefinite"
                            begin="0.5"
                        />
                    </rect>
                </g>
            </svg>
        </div>
        <div v-else-if="hasError" class="has-error">error</div> -->
        <div class="game-comp">
            <game-master-page :game="getGameById(gameId)" :user="user" class="game-comp__container">
                <div v-if="getGameById(gameId).category === 'Dice'" class="game__comp-item">
                    <dice-game />
                </div>
                <div v-else-if="getGameById(gameId).category === 'Black Jack'" class="game__comp-item">
                    <black-jack-game />
                </div>
                <div v-else-if="getGameById(gameId).category === 'Slots'" class="game__comp-item">
                    <slot-game />
                </div>
                <div v-else-if="getGameById(gameId).category === 'Spinning Wheel'" class="game__comp-item">
                    <spinning-wheel-game />
                </div>
            </game-master-page>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { mapActions, mapGetters } from 'vuex'

import GameMasterPage from '@/masterpages/GameMasterPage.vue'
import DiceGame from '@/components/GamesComp/DiceGame.vue'
import BlackJackGame from '@/components/GamesComp/BlackJackGame.vue'
import SlotGame from '@/components/GamesComp/SlotGame.vue'
import SpinningWheelGame from '@/components/GamesComp/SpinningWheelGame.vue'

export default {
    name: 'GamePage',

    data() {
        return {
            game: {},
            user: {},
        }
    },

    components: {
        MainMasterPage,
        GameMasterPage,
        DiceGame,
        BlackJackGame,
        SlotGame,
        SpinningWheelGame,
    },

    created() {
        this.setGamesList()
        this.setCoinsList()
        const storageGamesList = JSON.parse(localStorage.getItem('gamesList'))
        let storageGame = storageGamesList.find((game) => game.id == this.gameId)
        const setGameToLocalStorage = JSON.stringify(storageGame)
        localStorage.setItem('game', setGameToLocalStorage)
        if (this.getUserById(this.userProfileId)) {
            this.user = { ...this.getUserById(this.userProfileId) }
            let storageUser = JSON.parse(localStorage.getItem('casinoUser'))
            if (JSON.stringify(storageUser) !== JSON.stringify(this.user)) {
                storageUser = { ...this.user }
                localStorage.setItem('casinoUser', JSON.stringify(storageUser))
            }
        } else {
            this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
            let foundUser = this.usersList.find((user) => user.id == this.user.id)
            if (foundUser !== this.user) {
                foundUser = { ...this.user }
            }
        }
        if (this.getGameById(this.gameId)) {
            this.game = { ...this.getGameById(this.gameId) }
        } else {
            this.game = { ...JSON.parse(localStorage.getItem('game')) }
        }
    },

    computed: {
        ...mapGetters('games', { getGameById: 'getItemById', gamesList: 'getItemsList' }),
        ...mapGetters('games', ['hasError', 'isLoading']),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('coins', { coinsList: 'getItemsList' }),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        gameId() {
            return this.$route.params.gameId
        },
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList', updateGame: 'updateItem' }),

        ...mapActions('coins', { setCoinsList: 'loadList' }),
    },
}
</script>

<style lang="scss" scoped>
</style>