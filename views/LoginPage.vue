<template>
    <main>
        <div class="login">
            <div class="login__container">
                <div class="login__top">
                    <div class="login__logo">
                        <img src="@/assets/logo.png" alt="Ace Vise logo" />
                    </div>
                </div>
                <div v-if="signUp" class="login__form form-login">
                    <div class="form-login__top">
                        <h3 class="form-login__title small-title">Sign Up</h3>
                        <div class="form-login__subtitle">
                            <p>It will take less than a minute</p>
                        </div>
                    </div>
                    <form action="#" class="form-login__main">
                        <div class="form-login__items">
                            <div class="form-login__item item-form">
                                <label>
                                    Login
                                    <input v-model.trim="userName" type="text" maxlength="30" />
                                </label>
                            </div>
                            <div class="form-login__item item-form">
                                <label>
                                    Email
                                    <input v-model.trim="userEmail" type="email" maxlength="35" />
                                </label>
                            </div>
                            <div class="form-login__item item-form">
                                <label>
                                    Password
                                    <input v-model.trim="userPassword" :type="passwordFieldType" maxlength="30" />
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
                        <button type="button" class="form-login__button button" @click="onSignUp">Sign Up</button>
                    </form>
                    <div class="form-login__change">
                        You do have an account?<span @click="changeLogForm">Log in</span>
                    </div>
                </div>
                <div v-else class="login__form form-login">
                    <div class="form-login__top">
                        <h3 class="form-login__title small-title">Login</h3>
                        <div class="form-login__subtitle">
                            <p>We are waiting for you come back!</p>
                        </div>
                    </div>
                    <form action="#" class="form-login__main">
                        <div class="form-login__items">
                            <div class="form-login__item item-form">
                                <label>
                                    Login
                                    <input v-model.trim="userName" type="text" maxlength="30" />
                                </label>
                            </div>
                            <div class="form-login__item item-form">
                                <label>
                                    Email
                                    <input v-model.trim="userEmail" type="email" maxlength="35" />
                                </label>
                            </div>
                            <div class="form-login__item item-form">
                                <label>
                                    Password
                                    <input v-model.trim="userPassword" :type="passwordFieldType" maxlength="30" />
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
                        <button type="button" class="form-login__button button" @click="onLogIn">Log In</button>
                    </form>
                    <div class="form-login__change">
                        You do not have an account?<span @click="changeLogForm">Sign Up</span>
                    </div>
                </div>
                <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
            </div>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'LoginPage',

    data() {
        return {
            userName: null,
            userEmail: null,
            userPassword: null,
            signUp: false,
            logIn: true,
            showPassword: false,
        }
    },

    computed: {
        ...mapGetters('login', { usersList: 'getItemsList' }),
        ...mapGetters(['errorMessage']),
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password'
        },
    },

    created() {
        this.setUsersList()
        this.setErrorMessage(null)
    },

    methods: {
        ...mapActions('login', { addUser: 'addItem', setUsersList: 'loadList' }),
        ...mapActions(['setErrorMessage']),
        ...mapActions('user', ['setUserName', 'setUserId', 'setUserInventory']),

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(email)
        },

        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },

        clearTheInputs() {
            this.userName = null
            this.userEmail = null
            this.userPassword = null
        },

        onSignUp() {
            const userInfo = {
                login: this.userName,
                email: this.userEmail,
                password: this.userPassword,
                balance: 0,
                avatar: 'https://firebasestorage.googleapis.com/v0/b/course-project-326a3.appspot.com/o/user%2Fcasino-avatar.jpg?alt=media&token=35f4fb67-1de1-43b7-a26a-873983754d12',
                inventory: [],
            }

            const userExists = this.usersList.some(
                (user) => user.login === userInfo.login || user.email === userInfo.email
            )

            if (
                userInfo.login &&
                userInfo.email &&
                userInfo.password &&
                this.isValidEmail(userInfo.email) &&
                !userExists
            ) {
                this.setUserName(userInfo.login)
                this.addUser(userInfo)
                const setUserToLocalStorage = JSON.stringify(userInfo)
                localStorage.setItem('casinoUser', setUserToLocalStorage)
                this.setErrorMessage(null)
                this.clearTheInputs()
                this.$router.push({ name: 'home' })
            } else {
                if (!userInfo.email || !this.isValidEmail(userInfo.email)) {
                    this.setErrorMessage('Invalid email')
                } else {
                    this.setErrorMessage(userExists ? 'This info is used, try something different' : 'Fill all fields')
                }
            }
        },

        changeLogForm() {
            this.setErrorMessage(null)
            this.clearTheInputs()
            this.signUp = !this.signUp
            this.logIn = !this.logIn
            this.setUserName(null)
            this.setUserId(null)
        },

        onLogIn() {
            const foundUser = this.usersList.find(
                (user) =>
                    this.userName === user.login && this.userEmail === user.email && this.userPassword === user.password
            )

            if (foundUser) {
                this.setUserName(this.userName)
                this.setUserInventory(foundUser.inventory)
                this.setUserId(foundUser.id)
                const setUserToLocalStorage = JSON.stringify(foundUser)
                localStorage.setItem('casinoUser', setUserToLocalStorage)
                this.clearTheInputs()
                this.$router.push({ name: 'home' })
            } else {
                this.setErrorMessage('There are no such users, check the info you have just entered or sign up!')
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>