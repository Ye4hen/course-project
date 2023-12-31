<template>
    <main-master-page>
        <main-swiper />
        <main-tabs title="Our Games" />
        <main-FAQ />
        <main-CTA title="Start Your Winning Journey Now!" />
    </main-master-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MainSwiper from '@/components/MainSwiper'
import MainTabs from '@/components/MainTabs'
import MainFAQ from '@/components/MainFAQ'
import MainCTA from '@/components/MainCTA'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: {
        MainMasterPage,
        MainSwiper,
        MainTabs,
        MainFAQ,
        MainCTA,
    },

    computed: {
        ...mapGetters('user', ['userProfileName', 'userProfileId']),
        ...mapGetters('login', { usersList: 'getItemsList' }),
        userId() {
            return this.userProfileId
        },
        userName() {
            return this.userProfileName
        },
    },

    methods: {
        ...mapActions('user', ['setUserId']),
    },
}
</script>
