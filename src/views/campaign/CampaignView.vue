<script>
import { RouterView } from 'vue-router'
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignNavigation from '../../components/campaign/CampaignNavigation.vue'

export default {
  name: 'CampaignView',

  components: {
    RouterView,
    CampaignNavigation
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  computed: {
    campaign() {
      return this.campaignStore.getActiveCampaign
    }
  },

  methods: {
    backToSelection() {
      this.$router.replace('/campaigns')
      this.campaignStore.deselectActiveCampaign()
    }
  },

  beforeRouteLeave(to, from, next) {
    this.campaignStore.saveLastPath(from.fullPath)
    next()
  }
}
</script>

<template>
  <CampaignNavigation :campaign="campaign" @backToSelection="backToSelection" />
  <RouterView />
</template>

<style lang="scss" scoped></style>
