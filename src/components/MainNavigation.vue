<script>
import { RouterLink } from 'vue-router'
import { useCharacterStore } from '../stores/CharacterStore'
import { useCampaignStore } from '../stores/CampaignStore'

export default {
  name: 'App',

  components: {
    RouterLink
  },

  setup() {
    const characterStore = useCharacterStore()
    const campaignStore = useCampaignStore()
    return {
      characterStore,
      campaignStore
    }
  },

  computed: {
    character() {
      if (this.characterStore.getActiveCharacter) {
        return this.characterStore.getActiveCharacter._name
      } else {
        return 'Charaktere'
      }
    },

    campaign() {
      if (this.campaignStore.getActiveCampaign) {
        return this.campaignStore.getActiveCampaign._name
      } else {
        return 'Kampagnen'
      }
    },

    isOnCharacterPage() {
      return this.$route.matched.some((route) => route.path.startsWith('/character'))
    },

    isOnCampaignPage() {
      return this.$route.matched.some((route) => route.path.startsWith('/campaign'))
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink
      to="/characters"
      :class="{ inactive: this.characterStore.getActiveCharacter && isOnCharacterPage }"
    >
      {{ character }}
    </RouterLink>

    <RouterLink
      to="/campaigns"
      :class="{ inactive: this.campaignStore.getActiveCampaign && isOnCampaignPage }"
    >
      {{ campaign }}
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  border-bottom: 3px solid var(--color-border);

  a:nth-child(1) {
    border-right: 1px solid var(--color-border);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    font-weight: 700;
    text-decoration: none;
    background-color: var(--color-link);

    &:hover:not(.router-link-active) {
      background-color: var(--color-link-hover);
    }
  }
}

.inactive {
  pointer-events: none;
}
</style>
