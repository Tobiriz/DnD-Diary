<script>
import { RouterLink } from 'vue-router'
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'CampaignNavigation',

  emits: ['backToSelection'],

  components: {
    RouterLink,
    Confirm,
    Alert
  },

  props: {
    campaign: {
      type: Object,
      required: false
    },

    activeEditing: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      confirm: {
        show: false,
        title: 'Zurück zur Auswahl',
        message: 'Wirklich zurück zur Kampagnenauswahl?',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      alert: {
        show: false,
        title: 'Aktive Bearbeitung',
        message: 'Speicher die Änderungen oder breche die Bearbeitung ab, bevor du zur Kampagnenauswahl zurückkehrst.',
        confirmText: 'Ok'
      }
    }
  },

  computed: {
    campaignName() {
      if (this.campaign) return this.campaign._name
      else return ''
    },

    editingActive() {
      return this.activeEditing
    }
  },

  methods: {
    confirmBackToSelection() {
      if (this.editingActive) {
        this.alert.show = true
        return
      }
      this.confirm.show = true
    },

    backToSelection() {
      this.confirm.show = false
      this.$emit('backToSelection')
    },

    cancelBackToSelection() {
      this.confirm.show = false
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
    v-if="confirm.show"
    :title="confirm.title"
    :message="confirm.message"
    :confirmText="confirm.confirmText"
    :cancelText="confirm.cancelText"
    @confirm="backToSelection"
    @cancel="cancelBackToSelection"
  />

  <Alert v-if="alert.show" :title="alert.title" :message="alert.message" :confirmText="alert.confirmText" @confirm="alert.show = false" />
</template>

<style lang="scss" scoped>
.campaign-navigation {
  z-index: 3;
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 20%;
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
    font-size: 2.5dvh;
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
