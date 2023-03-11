<script>
import { RouterView } from 'vue-router'
import { useCharacterStore } from '../stores/CharacterStore'
import SelectionList from '../components/SelectionList.vue'
import SelectionDetails from '../components/SelectionDetails.vue'
import InputPromt from '../components/InputPromt.vue'

export default {
  name: 'SelectCharacterView',

  setup() {
    const characterStore = useCharacterStore()
    return {
      characterStore
    }
  },

  data() {
    return {
      loadButtonText: 'Charakter laden',
      deleteButtonText: 'Charakter löschen',
      addItemText: 'Charakter hinzufügen',

      showInputPromtAddCharacter: false,
      inputPromtAddCharacterTitle: 'Charakter hinzufügen',
      inputPromtAddCharacterMessage: 'Gib deinem Charakter einen Namen:',
      inputPromtAddCharacterConfirmText: 'Bestätigen',
      inputPromtAddCharacterCancelText: 'Abbrechen',

      showInputPromtDeleteCharacter: false,
      inputPromtDeleteCharacterTitle: 'Charakter löschen',
      inputPromtDeleteCharacterMessage: 'Um den Charakter zu löschen, gib seinen Namen ein:',
      inputPromtDeleteCharacterConfirmText: 'Bestätigen',
      inputPromtDeleteCharacterCancelText: 'Abbrechen'
    }
  },

  components: {
    RouterView,
    SelectionList,
    SelectionDetails,
    InputPromt
  },

  computed: {
    characters() {
      return this.characterStore.getCharacters
    },

    title() {
      return 'Deine Charaktere'
    },

    selectedCharacter() {
      if (this.characterStore.getSelectedCharacter) return this.characterStore.getSelectedCharacter
      else return {}
    },

    hasItemSelected() {
      return this.characterStore.getSelectedCharacter !== null
    },

    characterName() {
      if (this.selectedCharacter) return this.selectedCharacter._name
      else return ''
    }
  },

  methods: {
    selectItem(index) {
      this.characterStore.selectCharacter(index)
    },

    setSelectedItemToActive() {
      this.characterStore.setSelectedCharacterToActive()
      this.$router
        .push({ name: 'character', params: { character: this.selectedCharacter.name } })
        .then(() => {
          this.$router.push({ name: 'personality' })
        })
    },

    addCharacter() {
      this.showInputPromtAddCharacter = true
    },

    confirmAddCharacter(name) {
      if (!(name === '' || name === null)) this.characterStore.addCharacter(name)
      this.showInputPromtAddCharacter = false
    },

    cancelAddCharacter() {
      this.showInputPromtAddCharacter = false
    },

    deleteSelectedCharacter() {
      this.showInputPromtDeleteCharacter = true
    },

    confirmDeleteCharacter(name) {
      if (name === this.selectedCharacter.name) this.characterStore.deleteCharacter()
      this.showInputPromtDeleteCharacter = false
    },

    cancelDeleteCharacter() {
      this.showInputPromtDeleteCharacter = false
    }
  },

  mounted() {
    //this.characterStore.loadCharacters()
  },

  beforeRouteEnter(to, from, next) {
    const characterStore = useCharacterStore()
    if (characterStore.getActiveCharacter && to.name === 'character-selection')
      next(characterStore.getLastPath)
    else next()
  }
}
</script>

<template>
  <SelectionList
    :items="characters"
    :title="title"
    :selected="selectedCharacter"
    :addItemText="addItemText"
    @selectItem="selectItem"
    @addItem="addCharacter"
  />
  <SelectionDetails
    :isCampaign="false"
    :titleText="characterName"
    :hasItemSelected="hasItemSelected"
    :loadButtonText="loadButtonText"
    :deleteButtonText="deleteButtonText"
    @setSelectedItemToActive="setSelectedItemToActive"
    @deleteSelectedItem="deleteSelectedCharacter"
  />

  <InputPromt
    v-if="showInputPromtAddCharacter"
    :title="inputPromtAddCharacterTitle"
    :message="inputPromtAddCharacterMessage"
    :confirmText="inputPromtAddCharacterConfirmText"
    :cancelText="inputPromtAddCharacterCancelText"
    @confirm="confirmAddCharacter"
    @cancel="cancelAddCharacter"
  />

  <InputPromt
    v-if="showInputPromtDeleteCharacter"
    :title="inputPromtDeleteCharacterTitle"
    :message="inputPromtDeleteCharacterMessage"
    :confirmText="inputPromtDeleteCharacterConfirmText"
    :cancelText="inputPromtDeleteCharacterCancelText"
    @confirm="confirmDeleteCharacter"
    @cancel="cancelDeleteCharacter"
  />

  <RouterView />
</template>

<style lang="scss" scoped></style>
