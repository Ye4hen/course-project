<template>
    <div v-if="isLoading" class="loading">
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
    <template v-else>
        <ul class="games-page__list">
            <li v-for="game in gamesList" :key="game.id" class="games-page__item item-games-page">
                <router-link :to="{ name: 'game', params: { gameId: game.id } }" class="item-games-page__action">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            fill="#39a463"
                            d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                        />
                    </svg>
                </router-link>
                <div class="item-games-page__info">
                    <div class="item-games-page__info-top">
                        <router-link :to="{ name: 'game', params: { gameId: game.id } }">
                            <h3 class="item-games-page__title small-title">{{ game.name }}</h3>
                        </router-link>
                        <h5 class="item-games-page__category">{{ game.category }}</h5>
                    </div>
                    <ul class="item-games-page__coins-list games-coins-list">
                        <h4 class="games-coins-list__title">Coins needed:</h4>
                        <li v-for="coin in getCoinByCategory(game.category)" :key="coin" class="games-coins-list__item">
                            <h5 class="games-coins-list__name">{{ coin.name }}</h5>
                            <div class="games-coins-list__img">
                                <img :src="coin.img" :alt="coin.name" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="item-games-page__img">
                    <img :src="game.img" :alt="game.name" />
                </div>
            </li>
        </ul>
    </template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'GamesList',

    computed: {
        ...mapGetters('games', ['isLoading', 'hasError']),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        getCoinByCategory() {
            return (category) => this.coinsList.filter((coin) => coin.category.toLowerCase() === category.toLowerCase())
        },
    },
}
</script>

<style lang="scss" scoped>
</style>