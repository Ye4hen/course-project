<template>
    <main-master-page>
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
        <div v-else-if="hasError" class="has-error">error</div>
        <div v-else class="editor">
            <div class="editor__container">
                <h2 class="editor__title title">Hello, dear Admin!</h2>
                <h4 class="editor__subtitle small-title">
                    Here you are able to edit, delete and add items to your Casino!
                </h4>
                <div class="editor__items">
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Users</h4>
                        <ul class="item-editor__list">
                            <li v-for="user in usersList" :key="user.id" class="item-editor__object item-editor-object">
                                <div class="item-editor-object__img">
                                    <img :src="user.avatar" :alt="user.login" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ user.login }} <span v-if="user.edit">Admin</span>
                                </h5>
                                <h6 class="item-editor-object__email">{{ user.email }}</h6>
                                <strong class="item-editor-object__balance">${{ user.balance }}</strong>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'user_editor', params: { userId: user.id } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="deleteUser(user.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'user_editor' }" class="item-editor__add button"
                            >Add User</router-link
                        >
                    </div>
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Coins</h4>
                        <ul class="item-editor__list">
                            <li v-for="coin in coinsList" :key="coin.id" class="item-editor__object item-editor-object">
                                <div class="item-editor-object__img">
                                    <img :src="coin.img" :alt="coin.name" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ coin.name }}
                                </h5>
                                <h6 class="item-editor-object__category">{{ coin.category }}</h6>
                                <strong class="item-editor-object__price">${{ coin.price }}</strong>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'coin_editor', params: { coinId: coin.id } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="onDeleteCoin(coin.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'coin_editor' }" class="item-editor__add button"
                            >Add Coin</router-link
                        >
                    </div>
                    <div class="editor__item item-editor">
                        <h4 class="item-editor__title small-title">Games</h4>
                        <ul class="item-editor__list">
                            <li v-for="game in gamesList" :key="game.id" class="item-editor__object item-editor-object">
                                <div class="item-editor-object__img">
                                    <img :src="game.img" :alt="game.name" />
                                </div>
                                <h5 class="item-editor-object__name">
                                    {{ game.name }}
                                </h5>
                                <h6 class="item-editor-object__category">{{ game.category }}</h6>
                                <ul class="item-editor-object__coins">
                                    <li
                                        v-for="coin in getCoinByCategory(game.category)"
                                        :key="coin.id"
                                        class="item-editor-object__coin"
                                    >
                                        <img :src="coin.img" :alt="coin.name" />
                                    </li>
                                </ul>
                                <div class="item-editor-object__buttons">
                                    <router-link
                                        :to="{ name: 'game_editor', params: { gameId: game.id } }"
                                        class="item-editor-object__button button"
                                        >Edit</router-link
                                    >
                                    <button class="item-editor-object__button button" @click="deleteGame(game.id)">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <router-link :to="{ name: 'game_editor' }" class="item-editor__add button"
                            >Add Game</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'EditorView',
    components: {
        MainMasterPage,
    },

    computed: {
        ...mapGetters('login', ['isLoading', 'hasError']),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('games', { gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById', coinsList: 'getItemsList' }),
        getCoinByCategory() {
            return (category) => this.coinsList.filter((coin) => coin.category.toLowerCase() === category.toLowerCase())
        },
    },

    created() {
        this.setCoinsList()
        this.setGamesList()
        this.setUsersList()
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList', deleteGame: 'deleteItem' }),
        ...mapActions('coins', { setCoinsList: 'loadList', deleteCoin: 'deleteItem' }),
        ...mapActions('login', { setUsersList: 'loadList', deleteUser: 'deleteItem', updateUser: 'updateItem' }),
        onDeleteCoin(coinId) {
            this.deleteCoin(coinId)
            this.usersList.forEach((user) => {
                if (user.inventory) {
                    const coin = user.inventory.find((coin) => coin.id == coinId)
                    if (coin) {
                        user.inventory = user.inventory.filter((coin) => coin.id !== coinId)
                        this.updateUser({
                            itemId: user.id,
                            data: user,
                        })
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>