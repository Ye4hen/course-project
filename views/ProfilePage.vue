<template>
    <main-master-page>
        <div class="profile">
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
            <div v-else class="profile__container">
                <h2 class="profile__title title">
                    <span>Hello, </span><span>{{ user.login }}!</span>
                </h2>
                <h5 class="profile__subtitle small-title">You can see your profile here!</h5>
                <div class="profile__info info-profile">
                    <div class="info-profile__body">
                        <div class="info-profile__main main-info-profile">
                            <h4 class="main-info-profile__name small-title">{{ user.login }}</h4>
                            <h6 class="main-info-profile__email">{{ user.email }}</h6>
                            <div class="info-profile__action action-info-profile">
                                <button class="action-info-profile__button button" @click="onLogOut">Log Out</button>
                            </div>
                        </div>
                        <div class="info-profile__image">
                            <div class="info-profile__image-body">
                                <div class="info-profile__image-action">
                                    <label>
                                        Upload your avatar here:
                                        <input
                                            type="file"
                                            name="userAvatar"
                                            accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                            @change="onFileChange"
                                        />
                                    </label>
                                </div>
                                <div v-if="user.avatar" class="info-profile__avatar">
                                    <img :src="user.avatar" :alt="user.login" />
                                </div>
                            </div>
                            <div v-if="errorMessage && !user.avatar" class="err-msg">
                                {{ errorMessage }}
                            </div>
                        </div>
                    </div>
                </div>
                <form action="#" class="profile__form form-profile">
                    <h3 class="form-profile__title small-title">
                        You can change your personal information whenever you want!
                    </h3>
                    <div class="form-profile__items">
                        <div class="form-profile__item item-form">
                            <label>
                                Login
                                <input v-model.trim="user.login" type="text" maxlength="30" />
                            </label>
                        </div>
                        <div class="form-profile__item item-form">
                            <label>
                                Email
                                <input v-model.trim="user.email" type="text" maxlength="35" />
                            </label>
                        </div>
                        <div class="form-profile__item item-form">
                            <label>
                                Password
                                <input v-model.trim="user.password" :type="passwordFieldType" maxlength="30" />
                                <button type="button" class="see-pass-btn" @click="togglePasswordVisibility">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="16"
                                        width="18"
                                        viewBox="0 0 576 512"
                                    >
                                        <path
                                            d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                                        />
                                    </svg>
                                </button>
                            </label>
                        </div>
                    </div>
                    <div class="form-profile__buttons">
                        <button type="button" class="form-profile__button button" @click="onSave">Save</button>
                        <button type="button" class="form-profile__button button" @click="onCancel">Cancel</button>
                    </div>
                </form>
                <div class="profile__balance balance-profile">
                    <div class="balance-profile__top">
                        <h4 class="balance-profile__title small-title">Here you can replenish your balance</h4>
                        <div style="display: grid">
                            <strong class="balance-profile__balance small-title"
                                >$<span>{{ user.balance }}</span></strong
                            >
                        </div>
                    </div>
                    <div class="balance-profile__main item-form">
                        <label>
                            <input type="number" v-model.trim="userBalanceInput" />
                            <div v-if="balanceError" class="err-msg">{{ balanceError }}</div>
                        </label>
                        <button type="button" class="balance-profile__button button" @click="replenishBalance">
                            replenish
                        </button>
                    </div>
                </div>
                <div class="profile__inventory inventory-profile">
                    <div v-if="user.inventory.length" class="inventory-profile__body">
                        <h4 class="inventory-profile__title small-title">Here is your inventory</h4>
                        <ul class="inventory-profile__list">
                            <li
                                v-for="item in user.inventory"
                                :key="item.id"
                                class="inventory-profile__item item-inventory-profile"
                            >
                                <template v-if="item.amount > 0">
                                    <div class="item-inventory-profile__info">
                                        <div class="item-inventory-profile__amount">{{ item.amount }}</div>
                                        <h6 class="item-inventory-profile__title">{{ getCoinById(item.id).name }}</h6>
                                        <div class="item-inventory-profile__image">
                                            <img :src="getCoinById(item.id).img" :alt="getCoinById(item.id).name" />
                                        </div>
                                    </div>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="inventory-profile__top">
                        <h4 class="inventory-profile__title small-title">Here must be your inventory...</h4>
                        <h6 class="inventory-profile__subtitle">
                            I cant find anything in your inventory...
                            <router-link :to="{ name: 'shop' }" class="inventory-profile__subtitle-link">
                                Try adding something to it
                            </router-link>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
export default {
    name: 'ProfilePage',

    data() {
        return {
            user: {},
            userBalanceInput: null,
            balanceError: null,
            showPassword: false,
        }
    },

    components: {
        MainMasterPage,
    },

    computed: {
        ...mapGetters('user', ['getUserById']),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters('login', ['isLoading', 'hasError']),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters(['errorMessage']),
        userId() {
            return this.$route.params.userId
        },
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password'
        },
    },

    created() {
        this.setUsersList()
        if (this.getUserById(this.userId)) {
            this.user = { ...this.getUserById(this.userId) }

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
        this.setErrorMessage(null)

        const self = this
        window.addEventListener('storage', function (event) {
            if (event.key === 'logoutEvent') {
                self.user = null
                self.setUserName(null)
                self.setUserId(null)
                localStorage.removeItem('casinoUser')
                self.$router.push({ name: 'home' })
            }
        })
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('user', ['setUserName', 'setUserId']),
        ...mapActions('login', { updateUser: 'updateItem', setUsersList: 'loadList' }),
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },
        onDeleteAvatar() {
            if (this.user.avatar) {
                this.user.avatar = ''
                this.setErrorMessage(null)
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
            } else {
                this.setErrorMessage('You have not chosen the image')
            }
        },
        onLogOut() {
            this.$router.push({
                name: 'home',
            })
            this.setUserId(null)
            this.setUserName(null)
            this.user = null
            localStorage.removeItem('casinoUser')
            localStorage.setItem('logoutEvent', Date.now().toString())
        },
        onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.user.avatar = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(() => {
                    this.updateUser({
                        itemId: this.user.id,
                        data: this.user,
                    })
                }, 100)
            }
        },
        onSave() {
            if (this.user.login && this.user.email && this.user.password && this.isValidEmail(this.user.email)) {
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
                this.setErrorMessage(null)
                this.$router.push({ name: 'home' })
            } else {
                if (!this.user.email || !this.isValidEmail(this.user.email)) {
                    this.setErrorMessage('Invalid email')
                } else {
                    this.setErrorMessage('Fill all fields')
                }
            }
        },
        onCancel() {
            this.$router.push({ name: 'home' })
        },
        replenishBalance() {
            if (this.userBalanceInput > 0) {
                const inputBalanceSum = this.user.balance + parseInt(this.userBalanceInput, 10)
                this.user.balance = inputBalanceSum
                this.setErrorMessage(null)
                this.userBalanceInput = null
                this.balanceError = null
                this.updateUser({
                    itemId: this.user.id,
                    data: this.user,
                })
            } else if (!this.userBalanceInput) {
                setTimeout(() => {
                    this.balanceError = 'Please enter a number'
                }, 1000)
            } else {
                setTimeout(() => {
                    this.balanceError = "You can't replenish a negative number"
                }, 1000)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>