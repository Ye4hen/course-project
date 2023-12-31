<template>
    <div class="game-comp-item" style="text-align: center">
        <div v-if="userCoins > 0" class="bandit">
            <div class="bandit__body" ref="banditBody">
                <div class="bandit__body--meter">
                    <div class="meter__count meter__count_1">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_2">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                    <div class="meter__count meter__count_3">
                        <div v-for="slot in slotsPrizesList" :key="slot.id">
                            <img class="meter__count-item" :src="getSlotImg(slot)" :alt="slot.name" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bandit__circle" ref="banditCircle"></div>
            <div class="bandit__hand" ref="banditHand"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'SlotGame',

    data() {
        return {
            game: {},
            isAnimated: false,
            overStepFive: false,
            attemptFinished: false,
        }
    },

    mounted() {
        if (this.userCoins > 0) {
            const banditHand = this.$el.querySelector('.bandit__hand')
            const banditCircle = this.$el.querySelector('.bandit__circle')
            banditHand.addEventListener('click', this.getHand)
            banditCircle.addEventListener('click', this.getHand)
        }
    },

    computed: {
        ...mapGetters('games', { getGameById: 'getItemById', gamesList: 'getItemsList' }),
        ...mapGetters('coins', { getCoinById: 'getItemById' }),
        ...mapGetters('user', ['userProfileId', 'getUserById']),
        ...mapGetters('slots__prizes', { slotsPrizesList: 'getItemsList' }),
        gameId() {
            return this.$route.params.gameId
        },
        getSlotImg() {
            return (item) => (this.game.name === 'Black Power' ? item.img_bl : item.img_sl)
        },
        userCoins() {
            const coin = this.user.inventory.find((coin) => this.getCoinById(coin.id).category === this.game.category)
            return coin ? coin.amount : 0
        },
    },

    created() {
        this.setGamesList()
        this.setSlotsPrizesList()
        if (this.getUserById(this.userProfileId)) {
            this.user = { ...this.getUserById(this.userProfileId) }
        } else {
            this.user = { ...JSON.parse(localStorage.getItem('casinoUser')) }
        }
        if (this.getGameById(this.gameId)) {
            this.game = { ...this.getGameById(this.gameId) }
        } else {
            const storageGamesList = JSON.parse(localStorage.getItem('gamesList'))
            let storageGame = storageGamesList.find((game) => game.id == this.gameId)
            this.game = { ...storageGame }
        }
    },

    methods: {
        ...mapActions('games', { setGamesList: 'loadList' }),
        ...mapActions('slots__prizes', { setSlotsPrizesList: 'loadList' }),
        ...mapActions('login', { updateUser: 'updateItem' }),
        getHand() {
            this.$refs.banditHand.classList.add('armGo')
            this.$refs.banditCircle.classList.add('circleGo')
            this.isAnimated = true
            this.getRandom(this.$el.querySelector('.meter__count_1'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_2'), 1, this.slotsPrizesList.length)
            this.getRandom(this.$el.querySelector('.meter__count_3'), 1, this.slotsPrizesList.length)
            setTimeout(() => {
                this.$refs.banditCircle.classList.remove('circleGo')
                this.$refs.banditHand.classList.remove('armGo')
                this.overStepFive = true
                this.isAnimated = false
                this.captureImages()
            }, 3000)
        },
        getRandom(el, min, max) {
            let i = 0
            const random = {
                value: 0,
                getRandomImg: (min, max) => {
                    let randNum = Math.floor(Math.random() * (max - min + 1)) + min

                    if (randNum === random.value) return random.getRandomImg(min, max)
                    random.value = randNum

                    const foundPrize = this.slotsPrizesList.find((prize) => {
                        return prize.number === randNum
                    })

                    const randomImg = foundPrize ? this.getSlotImg(foundPrize) : null
                    return randomImg
                },
            }

            const replay = setInterval(() => {
                if (i >= 15 || !el) {
                    clearInterval(replay)
                    const meterCount = this.$el.querySelector('.meter__count')
                    const eventNew = new Event('change')
                    meterCount.dispatchEvent(eventNew)
                } else {
                    el.classList.add('fadeOutUp')
                    setTimeout(() => {
                        el.classList.remove('fadeOutUp')
                        el.classList.add('fadeInDown')
                    }, 100)
                    el.classList.remove('fadeInDown')
                    const imgSrc = random.getRandomImg(min, max)
                    if (imgSrc) {
                        el.innerHTML = `<img src="${imgSrc}" alt="Slot Image" />`
                        const img = new Image()
                        img.onload = function () {
                            img.style.maxWidth = '100%'
                            el.innerHTML = ''
                            el.appendChild(img)
                        }
                        img.src = imgSrc
                    }
                    i++
                }
            }, 150)
        },
        captureImages() {
            const capturedImages = []

            const meterCount1 = this.$el.querySelector('.meter__count_1 img')
            const meterCount2 = this.$el.querySelector('.meter__count_2 img')
            const meterCount3 = this.$el.querySelector('.meter__count_3 img')

            capturedImages.push(meterCount1.src)
            capturedImages.push(meterCount2.src)
            capturedImages.push(meterCount3.src)

            this.compareImages(capturedImages)
        },

        compareImages(images) {
            const areAllImagesSame = images[0] === images[1] && images[1] === images[2]
            const twoImageSame = images[0] === images[1] || images[0] === images[2] || images[1] === images[2]
            const coinsToDecrement = this.user.inventory.find(
                (coin) => this.getCoinById(coin.id).category === this.game.category
            )
            if (areAllImagesSame) {
                coinsToDecrement.amount = Math.floor(coinsToDecrement.amount * 5)
            } else if (twoImageSame) {
                coinsToDecrement.amount = Math.floor(coinsToDecrement.amount * 2)
            } else {
                if (coinsToDecrement.amount > 4) {
                    coinsToDecrement.amount = Math.floor(coinsToDecrement.amount / 5)
                } else {
                    coinsToDecrement.amount = 0
                    this.user.inventory = this.user.inventory.filter((coin) => coin.id !== coinsToDecrement.id)
                }
            }
            this.updateUser({
                itemId: this.user.id,
                data: this.user,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.bandit {
    position: relative;
    width: 18.75rem;
    height: 21.875rem;
    margin: 0 auto;
    line-height: 1.2;
    margin-top: 0.625rem;
    padding-bottom: 6.25rem;
}
.bandit__body {
    background: url('@/assets/slots/body.png') 0 0 no-repeat;
    width: 18.6875rem;
    height: 18.6875rem;
    position: absolute;
    z-index: 98;
}
.bandit__hand {
    background: url('@/assets/slots/arm.svg') 0 0 no-repeat;
    width: 1.5625rem;
    height: 4.875rem;
    cursor: pointer;
    position: absolute;
    transform-origin: 100% 100%;
    left: 16.625rem;
    top: 8.4375rem;
    z-index: 99;
}
.bandit__circle {
    background: url('@/assets/slots/circle.svg') 0 0 no-repeat;
    width: 2.3125rem;
    height: 2.3125rem;
    cursor: pointer;
    position: absolute;
    transform-origin: 100% 100%;
    left: 16.3125rem;
    top: 6.5625rem;
    z-index: 100;
}
.bandit__finish {
    background: url('@/assets/slots/bg.png');
    visibility: hidden;
    margin-left: 0;
    background-color: #fff;
    padding: 0.5625rem;
    width: 13.9688rem;
    z-index: 97;
    text-align: center;
    position: absolute;
    top: 18.6875rem;
}
.bandit__finish strong {
    font-size: 1.3125rem;
    font-weight: bold;
    color: #df2d2b;
}
.bandit__finish p {
    font-size: 0.9375rem;
    color: #000;
    margin: 0.9375rem 0;
}
.bandit__finish input {
    font-size: 1.1875rem;
    color: #df2d2b;
    border: 0.0625rem solid #f2b61b;
    outline: none;
    padding: 0.4375rem 0.4375rem 0.25rem;
    width: 92%;
}
.bandit__finish button {
    font-size: 1.3125rem;
    color: #fff;
    background-color: #df2d2c;
    border: 0.0625rem solid #f2b61b;
    padding: 0.1875rem 0.5rem;
    margin-top: 0.625rem;
    outline: none;
}
.bandit__finish button:focus {
    opacity: 0.8;
}
.bandit__body--meter {
    height: 4.875rem;
    width: 15.125rem;
    text-align: center;
    margin-top: 7.4375rem;
    overflow: hidden;
    font-size: 4.25rem;
    font-weight: bold;
    color: #df2c2b;
    text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.2901960784313726);
}
.meter__count {
    width: 4.8125rem;
    height: 4.875rem;
    display: inline-block;
}

.meter__count img {
    max-width: 100% !important;
}

.animated {
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
.armGo {
    -webkit-animation: armGo 2s;
    -webkit-animation-delay: none;
    animation: armGo 2s;
    animation-delay: none;
}
.circleGo {
    -webkit-animation: circleGo 2s;
    -webkit-animation-delay: none;
    animation: circleGo 2s;
    animation-delay: none;
}
.fadeOutUp {
    animation-name: fadeOutUp;
}
.fadeInDown {
    animation-name: fadeInDown;
    img {
        max-width: 3.125rem;
    }
}
.bounceOut {
    animation-name: bounceOut;
    animation-duration: 0.75s;
}
.slideInDown {
    animation-name: slideInDown;
    animation-duration: 2s;
}

@keyframes armGo {
    0% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
    50% {
        transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(180deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
        transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -moz-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -o-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        -ms-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    }
}
@keyframes circleGo {
    0% {
        transform: translate3d(0px, 0px, 0px);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -moz-transform: translate3d(0px, 0px, 0px);
        -o-transform: translate3d(0px, 0px, 0px);
        -ms-transform: translate3d(0px, 0px, 0px);
    }
    50% {
        transform: translate3d(0px, 11.25rem, 0px);
        -webkit-transform: translate3d(0px, 11.25rem, 0px);
        -moz-transform: translate3d(0px, 11.25rem, 0px);
        -o-transform: translate3d(0px, 11.25rem, 0px);
        -ms-transform: translate3d(0px, 11.25rem, 0px);
    }
    100% {
        transform: translate3d(0px, 0px, 0px);
        -webkit-transform: translate3d(0px, 0px, 0px);
        -moz-transform: translate3d(0px, 0px, 0px);
        -o-transform: translate3d(0px, 0px, 0px);
        -ms-transform: translate3d(0px, 0px, 0px);
    }
}
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate(0px, -2.5rem);
        -webkit-transform: translate(0rem, -2.5rem);
        -moz-transform: translate(0px, -2.5rem);
        -o-transform: translate(0px, -2.5rem);
        -ms-transform: translate(0px, -2.5rem);
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: translate(0px, 2.5rem);
        -webkit-transform: translate(0px, 2.5rem);
        -moz-transform: translate(0px, 2.5rem);
        -o-transform: translate(0px, 2.5rem);
        -ms-transform: translate(0px, 2.5rem);
    }
}
@keyframes fadeOutUp {
    from {
        opacity: 0;
        transform: translate(0px, 2.5rem);
        -webkit-transform: translate(0px, 2.5rem);
        -moz-transform: translate(0px, 2.5rem);
        -o-transform: translate(0px, 2.5rem);
        -ms-transform: translate(0px, 2.5rem);
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate(0px, -2.5rem);
        -webkit-transform: translate(0px, -2.5rem);
        -moz-transform: translate(0px, -2.5rem);
        -o-transform: translate(0px, -2.5rem);
        -ms-transform: translate(0px, -2.5rem);
    }
}
@keyframes bounceOut {
    20% {
        visibility: visible;
        transform: scale3d(0.9, 0.9, 0.9);
    }

    50%,
    55% {
        opacity: 1;
        transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
        transform: scale3d(0, 0, 0);
    }
}
@keyframes slideInDown {
    /*   
слайдом вниз
from {
	visibility: visible;
  transform: translate3d(0, -100%, 0);
  -webkit-transform: translate3d(0, -100%, 0);
  -moz-transform: translate3d(0, -100%, 0);
  -o-transform: translate3d(0, -100%, 0);
  -ms-transform: translate3d(0, -100%, 0);
}

to {
	visibility: visible;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  } */
    from {
        visibility: visible;
        z-index: 99;
        transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
        z-index: 99;
        visibility: visible;
        transform: scale3d(1, 1, 1);
    }
}
</style>