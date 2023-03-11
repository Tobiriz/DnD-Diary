<script>
import { RouterView } from 'vue-router'
import { useCharacterStore } from '../../stores/CharacterStore'
import CharacterNavigation from '../../components/character/CharacterNavigation.vue'

export default {
  name: 'CharacterView',

  components: {
    RouterView,
    CharacterNavigation
  },

  setup() {
    const characterStore = useCharacterStore()
    return {
      characterStore
    }
  },

  computed: {
    character() {
      return this.characterStore.getActiveCharacter
    }
  },

  methods: {
    backToSelection() {
      this.$router.replace('/diary/character-selection')
      this.characterStore.deselectActiveCharacter()
    }
  },

  beforeRouteLeave(to, from, next) {
    this.characterStore.saveLastPath(from.fullPath)
    next()
  }
}
</script>

<template>
  <CharacterNavigation :character="character" @backToSelection="backToSelection" />
  <RouterView />
</template>

<style lang="scss" scoped></style>
