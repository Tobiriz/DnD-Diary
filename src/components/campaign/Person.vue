<script>
import Confirm from '../Confirm.vue'
import Alert from '../Alert.vue'

export default {
  name: 'Person',

  emits: ['deletePerson', 'plusEdit', 'minusEdit'],

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
      editPerson: false,

      changes: {
        name: '',
        description: ''
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Die Person braucht einen Namen!',
        confirmText: 'OK'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Daten der Person werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmDelete: {
        show: false,
        title: 'Person löschen?',
        message: 'Die Person wird unwiderruflich gelöscht.',
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

    person() {
      return this.item
    }
  },

  watch: {
    forceSave() {
      if (this.editPerson) this.saveChanges()
    },

    forceCancel() {
      this.toggleEditPersonOff()
    }
  },

  methods: {
    toggleEditPersonOn() {
      this.editPerson = true
      this.$emit('plusEdit')
      this.changes.name = this.name
      this.changes.description = this.description
    },

    toggleEditPersonOff() {
      this.editPerson = false
      this.$emit('minusEdit')
    },

    confirmSaveChanges() {
      if (this.changes.name === '') {
        this.alert.show = true
        return
      }
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditPerson()
        return
      }
      this.confirmChanges.show = true
    },

    saveChanges() {
      this.person._name = this.changes.name
      this.person._description = this.changes.description
      this.toggleEditPersonOff()
      this.confirmChanges.show = false
    },

    confirmDeletePerson() {
      this.confirmDelete.show = true
    },

    deletePerson() {
      this.toggleEditPersonOff()
      this.$emit('deletePerson', this.person)
      this.confirmDelete.show = false
    },

    confirmCancelEditPerson() {
      if (this.changes.name === this.name && this.changes.description === this.description) {
        this.cancelEditPerson()
        return
      }
      this.confirmCancel.show = true
    },

    cancelEditPerson() {
      this.toggleEditPersonOff()
      this.confirmCancel.show = false
    }
  }
}
</script>

<template>
  <div class="item">
    <h2 v-if="!editPerson">{{ name }}</h2>
    <pre v-if="!editPerson">{{ description }}</pre>

    <div class="item-buttons" v-if="!editPerson">
      <button class="standard-button" @click="toggleEditPersonOn">Bearbeiten</button>
      <button class="danger-button" @click="confirmDeletePerson">Löschen</button>
    </div>

    <input type="text" v-model="changes.name" v-if="editPerson" placeholder="Name der Person" />
    <textarea
      v-model="changes.description"
      v-if="editPerson"
      placeholder="Informationen zur Person"
    ></textarea>

    <div class="item-buttons" v-if="editPerson">
      <button class="confirm-button" @click="confirmSaveChanges">Speichern</button>
      <button class="danger-button" @click="confirmCancelEditPerson">Abbrechen</button>
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
    @confirm="deletePerson"
    @cancel="confirmDelete.show = false"
  />

  <Confirm
    v-if="confirmCancel.show"
    :title="confirmCancel.title"
    :message="confirmCancel.message"
    :confirmText="confirmCancel.confirmText"
    :cancelText="confirmCancel.cancelText"
    @confirm="cancelEditPerson"
    @cancel="confirmCancel.show = false"
  />
</template>

<style lang="scss" scoped></style>
