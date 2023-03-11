<script>
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignDetails from '../../components/campaign/CampaignDetails.vue'
import InputPromt from '../../components/InputPromt.vue'
import Confirm from '../../components/Confirm.vue'
import Session from '../../components/campaign/Session.vue'

export default {
  name: 'SessionView',

  components: {
    CampaignDetails,
    InputPromt,
    Confirm,
    Session
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      addItemText: 'Spieltag hinzufügen',
      tabName: 'Spieltage',
      sessionsBeingEdited: 0,
      forceSave: false,
      forceCancel: false,

      inputPromtAddSession: {
        show: false,
        title: 'Spieltag hinzufügen',
        message: 'Wann fand/findet der Spieltag statt?',
        confirm: 'Hinzufügen',
        cancel: 'Abbrechen'
      },

      confirmLeave: {
        route: '',
        show: false,
        title: 'Spieltage werden bearbeitet',
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

    sessions() {
      return this.campaignStore.getActiveCampaign._sessions
    },

    players() {
      if (this.campaignStore.getActiveCampaign._players)
        return this.campaignStore.getActiveCampaign._players
      else return []
    }
  },

  methods: {
    sessionsBeingEditedPlus() {
      this.sessionsBeingEdited++
      this.campaignStore.setActiveEditing(true)
    },

    sessionsBeingEditedMinus() {
      this.sessionsBeingEdited--
      if (this.sessionsBeingEdited === 0) {
        this.campaignStore.setActiveEditing(false)
      }
    },

    addSession() {
      this.inputPromtAddSession.show = true
    },

    confirmAddSession(name) {
      if (name !== '') this.campaignStore.addSessionToActiveCampaign(name)
      this.inputPromtAddSession.show = false
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
    if (this.sessionsBeingEdited > 0) {
      this.confirmLeave.route = to.fullPath
      this.confirmLeave.show = true
      next(false)
    } else next()
  }
}
</script>

<template>
  <CampaignDetails :buttonText="addItemText" :openTabName="tabName" @buttonClick="addSession">
    <template #items>
      <Session
        v-for="(session, index) in sessions"
        :key="index"
        :item="session"
        :players="players"
        :forceSave="forceSave"
        :forceCancel="forceCancel"
        @deleteSession="campaignStore.deleteSessionFromActiveCampaign"
        @plusEdit="sessionsBeingEditedPlus"
        @minusEdit="sessionsBeingEditedMinus"
      />
    </template>
  </CampaignDetails>

  <InputPromt
    v-if="inputPromtAddSession.show"
    :title="inputPromtAddSession.title"
    :message="inputPromtAddSession.message"
    :confirmText="inputPromtAddSession.confirm"
    :cancelText="inputPromtAddSession.cancel"
    @confirm="confirmAddSession"
    @cancel="inputPromtAddSession.show = false"
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
