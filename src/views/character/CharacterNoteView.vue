<script>
import { useCharacterStore } from '../../stores/CharacterStore'
import CharacterDetails from '../../components/character/CharacterDetails.vue'

export default {
  name: 'CharacterNoteView',

  components: {
    CharacterDetails
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
    },

    title() {
      return 'Notizen'
    }
  }
}
</script>

<template>
  <CharacterDetails :activeTab="title" :character="character" />
</template>

<style lang="scss" scoped></style>
