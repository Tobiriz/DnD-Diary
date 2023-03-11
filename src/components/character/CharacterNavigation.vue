<script>
import { RouterLink } from 'vue-router'
import Confirm from '../Confirm.vue'

export default {
  name: 'CharacterNavigation',

  emits: ['backToSelection'],

  components: {
    RouterLink,
    Confirm
  },

  props: {
    character: {
      type: Object,
      required: false
    }
  },

  data() {
    return {
      confirm: {
        title: 'Zurück zur Auswahl',
        message: 'Wirklich zurück zur Charakterauswahl?',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      showConfirm: false
    }
  },

  computed: {
    characterName() {
      if (this.character) return this.character.name
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
  <div class="character-navigation">
    <h3>{{ characterName }}</h3>

    <RouterLink :to="{ name: 'personality' }">Persönlichkeit</RouterLink>
    <RouterLink :to="{ name: 'skills' }">Fertigkeiten</RouterLink>
    <RouterLink :to="{ name: 'equipment' }">Ausrüstung</RouterLink>
    <RouterLink :to="{ name: 'spells' }">Zauber</RouterLink>
    <RouterLink :to="{ name: 'characterNotes' }">Notizen</RouterLink>

    <div class="character-navigation__back" @click="confirmBackToSelection">Zurück zur Auswahl</div>
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
.character-navigation {
  z-index: 3;
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 20%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background-soft);
  box-sizing: border-box;
  border-right: 1px solid var(--color-border);

  h3 {
    padding: 1rem 1.5rem;
    font-size: 3vh;
    border-bottom: 1px solid var(--color-border);
  }

  a,
  .character-navigation__back {
    display: block;
    text-decoration: none;
    padding: 1rem 1.5rem;
    font-size: 2.5dvh;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;

    &:hover:not(.router-link-active) {
      background-color: var(--color-background-mute);
    }
  }

  a:nth-child(1),
  .character-navigation__back {
    border-top: 1px solid var(--color-border);
  }

  &__back {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-background-soft);
    border-bottom: 0px !important;

    &:hover {
      background-color: var(--color-background-mute);
    }
  }
}
</style>
