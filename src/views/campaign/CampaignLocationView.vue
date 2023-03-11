<script>
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignDetails from '../../components/campaign/CampaignDetails.vue'
import InputPromt from '../../components/InputPromt.vue'
import Confirm from '../../components/Confirm.vue'
import Location from '../../components/campaign/Location.vue'

export default {
  name: 'CampaignLocationView',

  components: {
    CampaignDetails,
    InputPromt,
    Confirm,
    Location
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      addItemText: 'Ort hinzufügen',
      tabName: 'Orte',
      locationsBeingEdited: 0,
      forceSave: false,
      forceCancel: false,

      inputPromtAddLocation: {
        show: false,
        title: 'Ort hinzufügen',
        message: 'Wie soll der Ort heißen?',
        confirm: 'Hinzufügen',
        cancel: 'Abbrechen'
      },

      confirmLeave: {
        route: '',
        show: false,
        title: 'Personen werden bearbeitet',
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

    title() {
      return 'Location'
    },

    locations() {
      return this.campaign._locations
    }
  },

  methods: {
    locationsBeingEditedPlus() {
      this.locationsBeingEdited++
      this.campaignStore.setActiveEditing(true)
    },

    locationsBeingEditedMinus() {
      this.locationsBeingEdited--
      if (this.locationsBeingEdited === 0) {
        this.campaignStore.setActiveEditing(false)
      }
    },

    addLocation() {
      this.inputPromtAddLocation.show = true
    },

    confirmAddLocation(name) {
      if (name !== '') this.campaignStore.addLocationToActiveCampaign(name)
      this.inputPromtAddLocation.show = false
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
    if (this.locationsBeingEdited > 0) {
      this.confirmLeave.route = to.fullPath
      this.confirmLeave.show = true
      next(false)
    } else next()
  }
}
</script>

<template>
  <CampaignDetails :buttonText="addItemText" :openTabName="tabName" @buttonClick="addLocation">
    <template #items>
      <Location
        v-for="(location, index) in locations"
        :key="index"
        :item="location"
        :forceSave="forceSave"
        :forceCancel="forceCancel"
        @deleteLocation="campaignStore.deleteLocationFromActiveCampaign"
        @plusEdit="locationsBeingEditedPlus"
        @minusEdit="locationsBeingEditedMinus"
      />
    </template>
  </CampaignDetails>

  <InputPromt
    v-if="inputPromtAddLocation.show"
    :title="inputPromtAddLocation.title"
    :message="inputPromtAddLocation.message"
    :confirmText="inputPromtAddLocation.confirm"
    :cancelText="inputPromtAddLocation.cancel"
    @confirm="confirmAddLocation"
    @cancel="inputPromtAddLocation.show = false"
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
