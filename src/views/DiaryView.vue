<script>
import { RouterView } from 'vue-router'
import { useCharacterStore } from '../stores/CharacterStore'
import { useCampaignStore } from '../stores/CampaignStore'
import MainNavigation from '../components/MainNavigation.vue'

export default {
    name: 'Diary',

    components: {
        RouterView,
        MainNavigation
    },

    setup() {
        const characterStore = useCharacterStore()
        const campaignStore = useCampaignStore()
        return {
            characterStore,
            campaignStore
        }
    },

    mounted() {
        this.campaignStore.loadCampaignsFromLocalStorage()
    },

    beforeUnmount() {
        this.campaignStore.saveCampaginsInLocalStorage()
    }
}
</script>

<template>
    <MainNavigation />
    <RouterView />
</template>