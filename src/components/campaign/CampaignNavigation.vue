<script>
import { RouterLink } from 'vue-router'
import Confirm from '../Confirm.vue'

export default {
  name: 'CampaignNavigation',

  emits: ['backToSelection'],

  components: {
    RouterLink,
    Confirm
  },

  props: {
    campaign: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      confirm: {
        title: 'Zurück zur Auswahl',
        message: 'Wirklich zurück zur Kampagnenauswahl?',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      showConfirm: false
    }
  },

  computed: {
    campaignName() {
      if (this.campaign) return this.campaign._name
      else return ''
    }
  },

  methods: {
    confirmBackToSelection() {
      this.showConfirm = true
    },

    backToSelection() {
      this.showConfirm = false
      this.$emit('backToSelection')
    },

    cancelBackToSelection() {
      this.showConfirm = false
    }
  }
}
</script>

<template>
  <div class="campaign-navigation">
    <h3>{{ campaignName }}</h3>

    <RouterLink :to="{ name: 'information' }">Übersicht</RouterLink>
    <RouterLink :to="{ name: 'session' }">Spieltage</RouterLink>
    <RouterLink :to="{ name: 'persons' }">Personen</RouterLink>
    <RouterLink :to="{ name: 'locations' }">Orte</RouterLink>
    <RouterLink :to="{ name: 'campaignNotes' }">Notizen</RouterLink>

    <div class="campaign-navigation__back" @click="confirmBackToSelection">Zurück zur Auswahl</div>
  </div>

  <Confirm
    v-if="showConfirm"
    :title="confirm.title"
    :message="confirm.message"
    :confirmText="confirm.confirmText"
    :cancelText="confirm.cancelText"
    @confirm="backToSelection"
    @cancel="cancelBackToSelection"
  />
</template>

<style lang="scss" scoped>
.campaign-navigation {
  z-index: 3;
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 25%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background-soft);
  box-sizing: border-box;
  border-right: 3px solid var(--color-border);

  h3 {
    padding: 1rem 1.5rem;
    font-size: 3vh;
    border-bottom: 3px solid var(--color-border);
  }

  a,
  .campaign-navigation__back {
    display: block;
    text-decoration: none;
    background-color: var(--color-link);
    padding: 1rem 1.5rem;
    font-size: 2vh;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;

    &:hover:not(.router-link-active) {
      background-color: var(--color-link-hover);
    }
  }

  a:nth-child(1),
  .campaign-navigation__back {
    border-top: 1px solid var(--color-border);
  }

  &__back {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-link);
    border-bottom: 0px !important;
  }
}
</style>
