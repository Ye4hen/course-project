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
                                    name="gameAvatar"
                                    accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                                    @change="onFileChange"
                                />
                            </label>
                        </div>
                        <div v-if="game.img" class="info-profile__avatar game-img">
                            <img :src="game.img" :alt="game.name" />
                        </div>
                    </div>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Name
                        <input v-model.trim="game.name" type="text" />
                    </label>
                </div>
                <div class="editor-item-page__label item-form">
                    <label>
                        Category
                        <select v-model="game.category">
                            <option v-for="category in getCategoriesList" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
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
    name: 'GameEditor',

    data() {
        return {
            game: {},
        }
    },

    computed: {
        ...mapGetters('games', ['getCategoriesList']),
        ...mapGetters('games', { getGameById: 'getItemById' }),
        ...mapGetters(['errorMessage']),
        gameId() {
            return this.$route.params.gameId
        },
        actionButtonTitle() {
            return this.gameId ? 'Save' : 'Add'
        },
    },

    created() {
        this.game = { ...this.getGameById(this.gameId) }
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('games', { updateGame: 'updateItem', addGame: 'addItem' }),
        onFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.game.img = e.target.result
                }
                reader.readAsDataURL(file)
                setTimeout(() => {
                    this.updateGame({
                        itemId: this.game.id,
                        data: this.game,
                    })
                }, 100)
            }
        },
        onAction() {
            if (this.game.name && this.game.category && this.game.img) {
                if (!this.gameId) this.addGame(this.game)
                else {
                    this.updateGame({
                        itemId: this.game.id,
                        data: this.game,
                    })
                }

                this.setErrorMessage(null)
                this.$router.push({ name: 'editor' })
            } else {
                this.setErrorMessage('Fill all fields')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.game-img {
    background-color: transparent;
}
</style>