<script>
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'Location',

  emits: ['deleteLocation', 'plusEdit', 'minusEdit'],

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
      editLocation: false,

      changes: {
        name: '',
        description: ''
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Dieser Ort braucht einen Namen!',
        confirmText: 'OK'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Daten deises Ortes werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmDelete: {
        show: false,
        title: 'Ort löschen?',
        message: 'Dieser Ort wird unwiderruflich gelöscht.',
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

    location() {
      return this.item
    }
  },

  watch: {
    forceSave() {
      if (this.editLocation) this.saveChanges()
    },

    forceCancel() {
      this.toggleEditLocationOff()
    }
  },

  methods: {
    toggleEditLocationOn() {
      this.editLocation = true
      this.$emit('plusEdit')
      this.changes.name = this.name
      this.changes.description = this.description
    },

    toggleEditLocationOff() {
      this.editLocation = false
      this.$emit('minusEdit')
    },

    confirmSaveChanges() {
      if (this.changes.name === '') {
        this.alert.show = true
        return
      }
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditLocation()
        return
      }
      this.confirmChanges.show = true
    },

    saveChanges() {
      this.location._name = this.changes.name
      this.location._description = this.changes.description
      this.toggleEditLocationOff()
      this.confirmChanges.show = false
    },

    confirmDeleteLocation() {
      this.confirmDelete.show = true
    },

    deleteLocation() {
      this.toggleEditLocationOff()
      this.$emit('deleteLocation', this.location)
      this.confirmDelete.show = false
    },

    confirmCancelEditLocation() {
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditLocation()
        return
      }
      this.confirmCancel.show = true
    },

    cancelEditLocation() {
      this.toggleEditLocationOff()
      this.confirmCancel.show = false
    }
  }
}
</script>

<template>
  <div class="item">
    <h2 v-if="!editLocation">{{ name }}</h2>
    <pre v-if="!editLocation">{{ description }}</pre>

    <div class="item-buttons" v-if="!editLocation">
      <button class="standard-button" @click="toggleEditLocationOn">Bearbeiten</button>
      <button class="danger-button" @click="confirmDeleteLocation">Löschen</button>
    </div>

    <input type="text" v-model="changes.name" v-if="editLocation" placeholder="Name des Ortes" />
    <textarea
      v-model="changes.description"
      v-if="editLocation"
      placeholder="Informationen zum Ort"
    ></textarea>

    <div class="item-buttons" v-if="editLocation">
      <button class="confirm-button" @click="confirmSaveChanges">Speichern</button>
      <button class="danger-button" @click="confirmCancelEditLocation">Abbrechen</button>
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
    @confirm="deleteLocation"
    @cancel="confirmDelete.show = false"
  />

  <Confirm
    v-if="confirmCancel.show"
    :title="confirmCancel.title"
    :message="confirmCancel.message"
    :confirmText="confirmCancel.confirmText"
    :cancelText="confirmCancel.cancelText"
    @confirm="cancelEditLocation"
    @cancel="confirmCancel.show = false"
  />
</template>

<style lang="scss" scoped></style>
