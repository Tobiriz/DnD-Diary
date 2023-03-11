import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('characterStore', {
  state: () => {
    return {
      lastPath: null,
      characters: [],
      selectedCharacter: null,
      activeCharacter: null
    }
  },

  actions: {
    addCharacter(name, description) {
      this.characters.push(new character(name, description))
    },

    selectCharacter(index) {
      this.selectedCharacter = this.characters[index]
    },

    setSelectedCharacterToActive() {
      this.activeCharacter = this.selectedCharacter
    },

    deselectActiveCharacter() {
      this.activeCharacter = null
    },

    saveLastPath(path) {
      this.lastPath = path
    },

    deleteCharacter() {
      this.characters = this.characters.filter((character) => character !== this.selectedCharacter)
      this.selectedCharacter = null
      this.activeCharacter = null
    }
  },

  getters: {
    getCharacters(state) {
      return state.characters
    },

    getSelectedCharacter(state) {
      return state.selectedCharacter
    },

    getActiveCharacter(state) {
      return state.activeCharacter
    },

    getLastPath(state) {
      return state.lastPath
    }
  }
})

class character {
  constructor(name, description) {
    this._name = name
    this._description = description
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}
