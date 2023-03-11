<script>
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignDetails from '../../components/campaign/CampaignDetails.vue'
import InputPromt from '../../components/InputPromt.vue'
import Confirm from '../../components/Confirm.vue'
import Note from '../../components/campaign/CampaignNote.vue'

export default {
  name: 'CampaignNoteView',

  components: {
    CampaignDetails,
    InputPromt,
    Confirm,
    Note
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      addItemText: 'Notiz hinzufügen',
      tabName: 'Notizen',
      notesBeingEdited: 0,
      forceSave: false,
      forceCancel: false,

      inputPromtAddNote: {
        show: false,
        title: 'Notiz hinzufügen',
        message: 'Wie soll die Notiz heißen?',
        confirm: 'Hinzufügen',
        cancel: 'Abbrechen'
      },

      confirmLeave: {
        route: '',
        show: false,
        title: 'Notizen werden bearbeitet',
        message: 'Wie wollen Sie fortfahren?',
        confirmText: 'Speichern und verlassen',
        extraText: 'Verlassen ohne zu speichern',
        cancelText: 'Abbrechen'
      }
    }
  },

  computed: {
    campaign() {
      return this.campaignStore.getActiveCampaign
    },

    notes() {
      return this.campaignStore.getActiveCampaign._notes
    }
  },

  methods: {
    notesBeingEditedPlus() {
      this.notesBeingEdited++
      this.campaignStore.setActiveEditing(true)
    },

    notesBeingEditedMinus() {
      this.notesBeingEdited--
      if (this.notesBeingEdited === 0) {
        this.campaignStore.setActiveEditing(false)
      }
    },

    addNote() {
      this.inputPromtAddNote.show = true
    },

    confirmAddNote(name) {
      if (name !== '') this.campaignStore.addNoteToActiveCampaign(name)
      this.inputPromtAddNote.show = false
    },

    saveAndLeave() {
      this.forceSave = true
      this.confirmLeave.show = false
      setTimeout(() => {
        this.forceSave = false
        this.$router.replace(this.confirmLeave.route)
      }, 10)
    },

    leaveWithoutSaving() {
      this.forceCancel = true
      this.confirmLeave.show = false
      setTimeout(() => {
        this.forceCancel = false
        this.$router.replace(this.confirmLeave.route)
      }, 10)
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.notesBeingEdited > 0) {
      this.confirmLeave.route = to.fullPath
      this.confirmLeave.show = true
      next(false)
    } else next()
  }
}
</script>

<template>
  <CampaignDetails :buttonText="addItemText" :openTabName="tabName" @buttonClick="addNote">
    <template #items>
      <Note
        v-for="(note, index) in notes"
        :key="index"
        :item="note"
        :forceSave="forceSave"
        :forceCancel="forceCancel"
        @deleteNote="campaignStore.deleteNoteFromActiveCampaign"
        @plusEdit="notesBeingEditedPlus"
        @minusEdit="notesBeingEditedMinus"
      />
    </template>
  </CampaignDetails>

  <InputPromt
    v-if="inputPromtAddNote.show"
    :title="inputPromtAddNote.title"
    :message="inputPromtAddNote.message"
    :confirmText="inputPromtAddNote.confirm"
    :cancelText="inputPromtAddNote.cancel"
    @confirm="confirmAddNote"
    @cancel="inputPromtAddNote.show = false"
  />

  <Confirm
    v-if="confirmLeave.show"
    :title="confirmLeave.title"
    :message="confirmLeave.message"
    :confirmText="confirmLeave.confirmText"
    :extraText="confirmLeave.extraText"
    :cancelText="confirmLeave.cancelText"
    @confirm="saveAndLeave"
    @choice="leaveWithoutSaving"
    @cancel="confirmLeave.show = false"
  />
</template>

<style lang="scss" scoped></style>
