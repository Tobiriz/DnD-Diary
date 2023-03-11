<script>
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'Session',

  emits: ['deleteSession', 'plusEdit', 'minusEdit'],

  components: {
    Confirm,
    Alert
  },

  props: {
    item: {
      type: Object,
      required: true
    },

    players: {
      type: Array,
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
      editSession: false,

      changes: {
        name: '',
        players: [],
        description: ''
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Der Spieltag brauch ein Datum!',
        confirmText: 'OK'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Daten des Spieltages werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmDelete: {
        show: false,
        title: 'Spieltag löschen?',
        message: 'Der Spieltag wird unwiderruflich gelöscht.',
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
    session() {
      return this.item
    },

    name() {
      return this.item._name
    },

    description() {
      return this.item._description
    },

    sessionPlayers() {
      return this.item._players
    },

    campaignPlayers() {
      return this.players
    },
  },

  watch: {
    forceSave() {
      if (this.editSession) this.saveChanges()
    },

    forceCancel() {
      this.toggleEditSessionOff()
    }
  },

  methods: {
    toggleEditSessionOn() {
      this.editSession = true
      this.$emit('plusEdit')
      this.changes.name = this.name
      this.changes.players = this.sessionPlayers
      this.changes.description = this.description
    },

    toggleEditSessionOff() {
      this.editSession = false
      this.$emit('minusEdit')
    },

    confirmSaveChanges() {
      if (this.changes.name === '') {
        this.alert.show = true
        return
      }
      if (this.noChanges()) {
        this.cancelEditSession()
        return
      }
      this.confirmChanges.show = true
    },

    saveChanges() {
      this.session._name = this.changes.name
        this.session._players = this.changes.players
      this.session._description = this.changes.description
      this.toggleEditSessionOff()
      this.confirmChanges.show = false
    },

    confirmDeleteSession() {
      this.confirmDelete.show = true
    },

    deleteSession() {
      this.toggleEditSessionOff()
      this.$emit('deleteSession', this.session)
      this.confirmDelete.show = false
    },

    confirmCancelEditSession() {
      if (this.noChanges()) {
        this.cancelEditSession()
        return
      }
      this.confirmCancel.show = true
    },

    noChanges() {
        return (
            this.changes.name === this.name &&
            this.changes.description === this.description &&
            this.changes.players === this.sessionPlayers
            )
    },

    cancelEditSession() {
      this.toggleEditSessionOff()
      this.confirmCancel.show = false
    }
  }
}
</script>

<template>
  <div class="item">
    <h2 v-if="!editSession">{{ name }}</h2>
    <ul v-if="!editSession" class="session-players">
        <li v-for="player in sessionPlayers" :key="player">
            {{ player._name }}
        </li>
    </ul>
    <pre v-if="!editSession">{{ description }}</pre>

    <div class="item-buttons" v-if="!editSession">
      <button class="standard-button" @click="toggleEditSessionOn">Bearbeiten</button>
      <button class="danger-button" @click="confirmDeleteSession">Löschen</button>
    </div>

    <input type="text" v-model="changes.name" v-if="editSession" placeholder="Datum des Spieltages" />
    <ul v-if="editSession" class="edit-session-players">
        <li v-for="player in campaignPlayers" :key="player">
            <input type="checkbox" :value="player" v-model="changes.players" />
            {{ player._name }}
        </li>
    </ul>
    <textarea
      v-model="changes.description"
      v-if="editSession"
      placeholder="Informationen zum Spieltag"
    ></textarea>

    <div class="item-buttons" v-if="editSession">
      <button class="confirm-button" @click="confirmSaveChanges">Speichern</button>
      <button class="danger-button" @click="confirmCancelEditSession">Abbrechen</button>
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
    @confirm="deleteNote"
    @cancel="confirmDelete.show = false"
  />

  <Confirm
    v-if="confirmCancel.show"
    :title="confirmCancel.title"
    :message="confirmCancel.message"
    :confirmText="confirmCancel.confirmText"
    :cancelText="confirmCancel.cancelText"
    @confirm="cancelEditNote"
    @cancel="confirmCancel.show = false"
  />
</template>

<style lang="scss" scoped>
.item h2 {
    margin: 0;
}
.session-players {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;

  li {
    display: inline-block;
    margin-right: 0.5rem;
  }

    li::after {
        content: ',';
    }

    li:last-child::after {
        content: '';
    }
}

.edit-session-players {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;

  li {
    margin-right: 0.5rem;

    input {
      margin-right: 0.5rem;
      margin-left: .5rem;
    }
  }
}
</style>
