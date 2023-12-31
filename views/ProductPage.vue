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

        <template v-else>
            <div class="product">
                <div class="product__container">
                    <div class="product__main main-product">
                        <div class="main-product__info">
                            <h3 class="main-product__title title">{{ getCoinById(coinId).name }}</h3>
                            <strong class="main-product__price">${{ productPrice }}</strong>
                            <div class="main-product__count item-form">
                                <span @click="decreaseCount">-</span>
                                <input v-model.trim="productCount" type="number" min="1" />
                                <span @click="increaseCount">+</span>
                            </div>
                            <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
                            <div v-if="successMessage" class="scs-msg">{{ successMessage }}</div>
                            <div class="main-product__desc">
                                <p>{{ getCoinById(coinId).desc }}</p>
                            </div>
                            <button class="main-product__button button" @click="buyProduct">Buy</button>
                        </div>
                        <div class="main-product__image">
                            <img :src="getCoinById(coinId).img" :alt="getCoinById(coinId).name" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </main-master-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

export default {
    name: 'ProductPage',
    data() {
        return {
            currentProduct: {},
            productCount: 1,
            user: {},
            successMessage: null,
        }
    },
    components: {
        MainMasterPage,
    },
    computed: {
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters('coins', ['isLoading']),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters(['errorMessage']),
        coinId() {
            return this.$route.params.productId
        },
        productPrice() {
            return this.getCoinById(this.coinId).price * this.productCount
        },
    },
    created() {
        this.setCoinsList()
        this.currentProduct = { ...this.getCoinById(this.coinId) }
        if (this.getUserById(this.userProfileId)) {
            this.user = { ...this.getUserById(this.userProfileId) }
        } else {
            this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        }
        this.setErrorMessage(null)
    },
    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('coins', { setCoinsList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        decreaseCount() {
            if (this.productCount > 1) {
                this.productCount -= 1
            } else {
                this.setErrorMessage("You can't buy less than 1 product")
            }
        },
        increaseCount() {
            this.productCount += 1
            this.setErrorMessage(null)
        },
        buyProduct() {
            if (!JSON.parse(localStorage.getItem('casinoUser'))) {
                this.setErrorMessage('You need to be logged in to buy something')
            } else {
                const existingProduct = this.user.inventory.find((item) => item.id == this.coinId)
                const totalPrice = this.productCount * this.getCoinById(this.coinId).price
                if (this.productCount < 1) {
                    this.productCount = 1
                } else {
                    const userBalance = parseFloat(this.user.balance)
                    if (totalPrice > userBalance) {
                        this.setErrorMessage('Not enough money on the balance')
                    } else {
                        this.setErrorMessage(null)
                        if (existingProduct) {
                            existingProduct.amount += this.productCount
                        } else {
                            const product = {
                                id: this.coinId,
                                amount: this.productCount,
                            }
                            this.user.inventory.push(product)
                        }
                        this.user.balance -= totalPrice
                        this.updateUser({
                            itemId: this.user.id,
                            data: this.user,
                        })

                        // localStorage.setItem('casinoUser', JSON.stringify(this.user))
                        setTimeout(() => {
                            this.successMessage = null
                        }, 3000)
                        this.successMessage = 'Purchased successfully'
                        this.productCount = 1
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>