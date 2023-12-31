<template>
    <div class="editor-item-page">
        <div class="editor-item-page__container">
            <div class="editor-item-page__forms">
                <div class="info-profile__image">
                    <div class="info-profile__image-body">
                        <div class="info-profile__image-action">
                            <label>
                                Image
                                <input
                                    type="file"
                                    name="coinAvatar"
                                    accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                    @change="onFileChange"
                                />
                            </label>
                        </div>
                        <div v-if="coin.img" class="info-profile__avatar coin-img">
                            <img :src="coin.img" :alt="coin.name" />
                        </div>
                    </div>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Name
                        <input v-model.trim="coin.name" type="text" />
                    </label>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Category
                        <select v-model="coin.category">
                            <option v-for="category in coinsCategoriesList" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </label>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Price
                        <input type="number" v-model.trim="coin.price" />
                        <div v-if="priceError" class="err-msg">{{ priceError }}</div>
                    </label>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Description
                        <textarea v-model="coin.desc" cols="30" rows="10"></textarea>
                    </label>
                </div>
            </div>
            <div class="editor-item-page__actions">
                <button class="button" @click="onAction">{{ actionButtonTitle }}</button>
                <router-link :to="{ name: 'editor' }" class="button">Cancel</router-link>
            </div>
            <div v-if="errorMessage" class="err-msg">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'CoinsEditor',

    data() {
        return {
            coin: {},
        }
    },

    computed: {
        ...mapGetters('coins', ['coinsCategoriesList']),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters(['errorMessage']),
        coinId() {
            return this.$route.params.coinId
        },
        actionButtonTitle() {
            return this.coinId ? 'Save' : 'Add'
        },
    },

    created() {
        this.coin = { ...this.getCoinById(this.coinId) }
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('coins', { updateCoin: 'updateItem', addCoin: 'addItem' }),
        onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.coin.img = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(() => {
                    this.updateCoin({
                        itemId: this.coin.id,
                        data: this.coin,
                    })
                }, 100)
            }
        },
        onAction() {
            if (this.coin.name && this.coin.category && this.coin.price && this.coin.img) {
                if (this.coin.price < 50) this.setErrorMessage('Price should be at least $50')
                else {
                    if (!this.coinId) this.addCoin(this.coin)
                    else {
                        this.updateCoin({
                            itemId: this.coin.id,
                            data: this.coin,
                        })
                    }
                    this.setErrorMessage(null)
                    this.$router.push({ name: 'editor' })
                }
            } else {
                this.setErrorMessage('Fill all fields')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.coin-img {
    background-color: transparent;
}
</style>