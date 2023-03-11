<script>
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'Player',

  emits: ['deletePlayer', 'plusEdit', 'minusEdit'],

  components: {
    Confirm,
    Alert
  },

  props: {
    item: {
      type: Object,
      required: true
    },

    activeEditing: {
      type: Boolean,
      required: true
    },

    forceSave: {
      type: Boolean,
      required: true
    },

    forceCancel: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      editPlayer: false,

      changes: {
        name: '',
        description: '',
        character: {
          name: '',
          showName: true,
          race: '',
          showRace: true,
          class: '',
          showClass: true,
          level: '',
          showLevel: true,
          alignment: '',
          showAlignment: true
        }
      },

      show: {
        characterName: true,
        race: true,
        class: true,
        level: true,
        alignment: true
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Dieser Spieler braucht einen Namen!',
        confirmText: 'OK'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Daten des Spielers werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmDelete: {
        show: false,
        title: 'Spieler löschen?',
        message: 'Diser Spieler wird unwiderruflich gelöscht.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmCancel: {
        show: false,
        title: 'Änderungen verwerfen?',
        message: 'Alle Änderungen gehen dabei verloren.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      }
    }
  },

  computed: {
    playerName() {
      return this.item._name
    },

    character() {
      return this.item._character
    },

    characterName() {
      return this.character._name
    },

    showCharacterName() {
      return this.character._showName
    },

    race() {
      return this.character._race
    },

    showRace() {
      return this.character._showRace
    },

    charClass() {
      return this.character._class
    },

    showClass() {
      return this.character._showClass
    },

    level() {
      return this.character._level
    },

    showLevel() {
      return this.character._showLevel
    },

    alignment() {
      return this.character._alignment
    },

    showAlignment() {
      return this.character._showAlignment
    },

    description() {
      return this.item._description
    },

    hasDescription() {
      return this.description !== ''
    },

    player() {
      return this.item
    },

    editActive() {
      return this.activeEditing
    }
  },

  watch: {
    forceSave() {
      if (this.editPlayer) this.saveChanges()
    },

    forceCancel() {
      this.toggleEditPlayerOff()
    }
  },

  methods: {
    toggleEditPlayerOn() {
      this.editPlayer = true
      this.$emit('plusEdit')
      this.changes.name = this.playerName
      this.changes.description = this.description
      this.changes.character.name = this.characterName
      this.changes.character.showName = this.showCharacterName
      this.changes.character.race = this.race
      this.changes.character.showRace = this.showRace
      this.changes.character.class = this.charClass
      this.changes.character.showClass = this.showClass
      this.changes.character.level = this.level
      this.changes.character.showLevel = this.showLevel
      this.changes.character.alignment = this.alignment
      this.changes.character.showAlignment = this.showAlignment
    },

    toggleEditPlayerOff() {
      this.editPlayer = false
      this.$emit('minusEdit')
    },

    confirmSaveChanges() {
      if (this.changes.name === '') {
        this.alert.show = true
        return
      }
      if (this.noChanges()) {
        this.cancelEditPlayer()
        return
      }
      this.confirmChanges.show = true
    },

    saveChanges() {
      this.player._name = this.changes.name
      this.player._description = this.changes.description
      this.player._character._name = this.changes.character.name
      this.player._character._showName = this.changes.character.showName
      this.player._character._race = this.changes.character.race
      this.player._character._showRace = this.changes.character.showRace
      this.player._character._class = this.changes.character.class
      this.player._character._showClass = this.changes.character.showClass
      this.player._character._level = this.changes.character.level
      this.player._character._showLevel = this.changes.character.showLevel
      this.player._character._alignment = this.changes.character.alignment
      this.player._character._showAlignment = this.changes.character.showAlignment
      this.toggleEditPlayerOff()
      this.confirmChanges.show = false
    },

    confirmDeletePlayer() {
      this.confirmDelete.show = true
    },

    deletePlayer() {
      this.toggleEditPlayerOff()
      this.$emit('deletePlayer', this.player)
      this.confirmDelete.show = false
    },

    confirmCancelEditPlayer() {
      if (this.noChanges()) {
        this.cancelEditPlayer()
        return
      }
      this.confirmCancel.show = true
    },

    cancelEditPlayer() {
      this.toggleEditPlayerOff()
      this.confirmCancel.show = false
    },

    noChanges() {
      return (
        this.changes.name === this.playerName &&
        this.changes.description === this.description &&
        this.changes.character.name === this.characterName &&
        this.changes.character.showName === this.showCharacterName &&
        this.changes.character.race === this.race &&
        this.changes.character.showRace === this.showRace &&
        this.changes.character.class === this.charClass &&
        this.changes.character.showClass === this.showClass &&
        this.changes.character.level === this.level &&
        this.changes.character.showLevel === this.showLevel &&
        this.changes.character.alignment === this.alignment
      )
    }
  }
}
</script>

<template>
  <div class="player">
    <div v-if="!editPlayer" class="player__info">
      <h2>{{ playerName }}</h2>

      <div class="player__info__character">
        <p v-if="showCharacterName">Name:</p>
        <span v-if="showCharacterName">{{ characterName }}</span>

        <p v-if="showRace">Rasse:</p>
        <span v-if="showRace">{{ race }}</span>

        <p v-if="showClass">Klasse:</p>
        <span v-if="showClass">{{ charClass }}</span>

        <p v-if="showLevel">Level:</p>
        <span v-if="showLevel">{{ level }}</span>

        <p v-if="showAlignment">Ausrichtung:</p>
        <span v-if="showAlignment">{{ alignment }}</span>
      </div>

      <p class="player__info__character__info-header" v-if="hasDescription">
        Zusätzliche Informationen:
      </p>

      <pre class="player__info__character__info">{{ description }}</pre>
    </div>

    <div class="item-buttons" v-if="!editPlayer">
      <button v-if="editActive" class="standard-button" @click="toggleEditPlayerOn">
        Bearbeiten
      </button>
      <button v-if="editActive" class="danger-button" @click="confirmDeletePlayer">Löschen</button>
    </div>

    <div v-if="editPlayer" class="player__edit">
      <input type="text" v-model="changes.name" placeholder="Name des Spielers" />

      <div class="player__edit__character">
        <input type="text" v-model="changes.character.name" placeholder="Name des Charakters" />
        <input type="checkbox" v-model="changes.character.showName" />
        <p>Namen anzeigen</p>

        <input type="text" v-model="changes.character.race" placeholder="Rasse des Charakters" />
        <input type="checkbox" v-model="changes.character.showRace" />
        <p>Rasse anzeigen</p>

        <input type="text" v-model="changes.character.class" placeholder="Klasse des Charakters" />
        <input type="checkbox" v-model="changes.character.showClass" />
        <p>Klasse anzeigen</p>

        <input type="text" v-model="changes.character.level" placeholder="Level des Charakters" />
        <input type="checkbox" v-model="changes.character.showLevel" />
        <p>Level anzeigen</p>

        <input
          type="text"
          v-model="changes.character.alignment"
          placeholder="Ausrichtung des Charakters"
        />
        <input type="checkbox" v-model="changes.character.showAlignment" />
        <p>Ausrichtung anzeigen</p>
      </div>

      <textarea v-model="changes.description" placeholder="Informationen zum Spieler"></textarea>
    </div>

    <div class="item-buttons" v-if="editPlayer">
      <button class="confirm-button" @click="confirmSaveChanges">Speichern</button>
      <button class="danger-button" @click="confirmCancelEditPlayer">Abbrechen</button>
    </div>
  </div>

  <Alert
    v-if="alert.show"
    :title="alert.title"
    :message="alert.message"
    :confirmText="alert.confirmText"
    @confirm="alert.show = false"
  />

  <Confirm
    v-if="confirmChanges.show"
    :title="confirmChanges.title"
    :message="confirmChanges.message"
    :confirmText="confirmChanges.confirmText"
    :cancelText="confirmChanges.cancelText"
    @confirm="saveChanges"
    @cancel="confirmChanges.show = false"
  />

  <Confirm
    v-if="confirmDelete.show"
    :title="confirmDelete.title"
    :message="confirmDelete.message"
    :confirmText="confirmDelete.confirmText"
    :cancelText="confirmDelete.cancelText"
    @confirm="deletePlayer"
    @cancel="confirmDelete.show = false"
  />

  <Confirm
    v-if="confirmCancel.show"
    :title="confirmCancel.title"
    :message="confirmCancel.message"
    :confirmText="confirmCancel.confirmText"
    :cancelText="confirmCancel.cancelText"
    @confirm="cancelEditPlayer"
    @cancel="confirmCancel.show = false"
  />
</template>

<style lang="scss" scoped>
.player {
  margin-bottom: 0.5rem;
  padding: 0 1.5rem 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);

  &__info {
    width: 80%;

    h2 {
      margin-top: 0;
      text-decoration: underline;
    }

    &__character {
      margin-top: 0;
      padding-left: 1rem;
      display: grid;
      grid-template-columns: auto 2fr;
      column-gap: 0.5rem;

      p {
        margin: 0;
        font-weight: bold;
        justify-self: end;
      }

      &__info-header {
        margin-top: 0.5rem;
        font-style: italic;
      }

      &__info {
        margin-top: 0;
      }
    }
  }

  input {
    width: 40%;
    font-size: 1rem;
  }

  &__edit {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: 80%;

    &__character {
      display: grid;
      grid-template-columns: 50% auto 40%;
      gap: 0.5rem;
      width: 100%;

      input[type='text'] {
        width: 100%;
      }

      input[type='checkbox'] {
        transform: scale(0.6);
        justify-self: end;
      }

      p {
        justify-self: start;
        align-self: center;
      }
    }

    textarea {
      width: 100%;
      height: 5rem;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
}
</style>
