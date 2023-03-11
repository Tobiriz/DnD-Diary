<script>
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'CampaignNote',

  emits: ['deleteNote', 'plusEdit', 'minusEdit'],

  components: {
    Confirm,
    Alert
  },

  props: {
    item: {
      type: Object,
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
      editNote: false,

      changes: {
        name: '',
        description: ''
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Die Notiz braucht einen Namen!',
        confirmText: 'OK'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Daten der Notiz werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmDelete: {
        show: false,
        title: 'Notiz löschen?',
        message: 'Die Notiz wird unwiderruflich gelöscht.',
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
    name() {
      return this.item._name
    },

    description() {
      return this.item._description
    },

    note() {
      return this.item
    }
  },

  watch: {
    forceSave() {
      if (this.editNote) this.saveChanges()
    },

    forceCancel() {
      this.toggleEditNoteOff()
    }
  },

  methods: {
    toggleEditNoteOn() {
      this.editNote = true
      this.$emit('plusEdit')
      this.changes.name = this.name
      this.changes.description = this.description
    },

    toggleEditNoteOff() {
      this.editNote = false
      this.$emit('minusEdit')
    },

    confirmSaveChanges() {
      if (this.changes.name === '') {
        this.alert.show = true
        return
      }
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditNote()
        return
      }
      this.confirmChanges.show = true
    },

    saveChanges() {
      this.note._name = this.changes.name
      this.note._description = this.changes.description
      this.toggleEditNoteOff()
      this.confirmChanges.show = false
    },

    confirmDeleteNote() {
      this.confirmDelete.show = true
    },

    deleteNote() {
      this.toggleEditNoteOff()
      this.$emit('deleteNote', this.note)
      this.confirmDelete.show = false
    },

    confirmCancelEditNote() {
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditNote()
        return
      }
      this.confirmCancel.show = true
    },

    cancelEditNote() {
      this.toggleEditNoteOff()
      this.confirmCancel.show = false
    }
  }
}
</script>

<template>
  <div class="item">
    <h2 v-if="!editNote">{{ name }}</h2>
    <pre v-if="!editNote">{{ description }}</pre>

    <div class="item-buttons" v-if="!editNote">
      <button class="standard-button" @click="toggleEditNoteOn">Bearbeiten</button>
      <button class="danger-button" @click="confirmDeleteNote">Löschen</button>
    </div>

    <input type="text" v-model="changes.name" v-if="editNote" placeholder="Name der Notiz" />
    <textarea
      v-model="changes.description"
      v-if="editNote"
      placeholder="Informationen zur Notiz"
    ></textarea>

    <div class="item-buttons" v-if="editNote">
      <button class="confirm-button" @click="confirmSaveChanges">Speichern</button>
      <button class="danger-button" @click="confirmCancelEditNote">Abbrechen</button>
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

<style lang="scss" scoped></style>
