<script>
import { RouterView } from 'vue-router'
import { useCampaignStore } from '../stores/CampaignStore'
import SelectionList from '../components/SelectionList.vue'
import SelectionDetails from '../components/SelectionDetails.vue'
import InputPromt from '../components/InputPromt.vue'

export default {
  name: 'SelectCampaignView',

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      loadButtonText: 'Kampagne laden',
      deleteButtonText: 'Kampagne löschen',
      addItemText: 'Kampagne hinzufügen',

      showInputPromtAddCampaign: false,
      inputPromtAddCampaignTitle: 'Kampagne hinzufügen',
      inputPromtAddCampaignMessage: 'Gib deiner Kampagne einen Namen:',
      inputPromtAddCampaignConfirmText: 'Bestätigen',
      inputPromtAddCampaignCancelText: 'Abbrechen',

      showInputPromtDeleteCampaign: false,
      inputPromtDeleteCampaignTitle: 'Kampagne löschen',
      inputPromtDeleteCampaignMessage: 'Um die Kampagne zu löschen, gib ihren Namen ein:',
      inputPromtDeleteCampaignConfirmText: 'Bestätigen',
      inputPromtDeleteCampaignCancelText: 'Abbrechen'
    }
  },

  components: {
    RouterView,
    SelectionList,
    SelectionDetails,
    InputPromt
  },

  computed: {
    campaigns() {
      return this.campaignStore.getCampaigns
    },

    title() {
      return 'Deine Kampagnen'
    },

    selectedCampaign() {
      if (this.campaignStore.getSelectedCampaign) return this.campaignStore.getSelectedCampaign
      else return {}
    },

    hasItemSelected() {
      return this.campaignStore.getSelectedCampaign !== null
    },

    campaignName() {
      if (this.selectedCampaign) return this.selectedCampaign._name
      else return ''
    },

    campaignDescription() {
      return this.selectedCampaign._description
    },

    campaignDm() {
      return this.selectedCampaign._dm
    },

    campaignPlayers() {
      const players = this.selectedCampaign._players
      const array = []
      if (players) {
        for (let player of players) {
          array.push(player._name)
        }
      }
      return array
    }
  },

  methods: {
    selectItem(index) {
      this.campaignStore.selectCampaign(index)
    },

    setSelectedItemToActive() {
      this.campaignStore.setSelectedCampaignToActive()
      this.$router
        .push({ name: 'campaign', params: { campaign: this.selectedCampaign._name } })
        .then(() => {
          this.$router.push({ name: 'information' })
        })
    },

    addCampaign() {
      this.showInputPromtAddCampaign = true
    },

    confirmAddCampaign(name) {
      if (!(name === '' || name === null)) this.campaignStore.addCampaign(name)
      this.showInputPromtAddCampaign = false
    },

    cancelAddCampaign() {
      this.showInputPromtAddCampaign = false
    },

    deleteSelectedCampaign() {
      this.showInputPromtDeleteCampaign = true
    },

    confirmDeleteCampaign(name) {
      if (name === this.selectedCampaign._name) this.campaignStore.deleteCampaign(name)
      this.showInputPromtDeleteCampaign = false
    },

    cancelDeleteCampaign() {
      this.showInputPromtDeleteCampaign = false
    }
  },

  mounted() {
    //this.campaignStore.loadCampaigns()
  },

  beforeRouteEnter(to, from, next) {
    const campaignStore = useCampaignStore()
    if (campaignStore.getActiveCampaign && to.name === 'campaign-selection')
      next(campaignStore.getLastPath)
    else next()
  }
}
</script>

<template>
  <SelectionList
    :items="campaigns"
    :title="title"
    :selected="selectedCampaign"
    :addItemText="addItemText"
    @selectItem="selectItem"
    @addItem="addCampaign"
  />
  <SelectionDetails
    :isCampaign="true"
    :titleText="campaignName"
    :descriptionText="campaignDescription"
    :dmName="campaignDm"
    :playerArray="campaignPlayers"
    :hasItemSelected="hasItemSelected"
    :loadButtonText="loadButtonText"
    :deleteButtonText="deleteButtonText"
    @setSelectedItemToActive="setSelectedItemToActive"
    @deleteSelectedItem="deleteSelectedCampaign"
  />

  <InputPromt
    v-if="showInputPromtAddCampaign"
    :title="inputPromtAddCampaignTitle"
    :message="inputPromtAddCampaignMessage"
    :confirmText="inputPromtAddCampaignConfirmText"
    :cancelText="inputPromtAddCampaignCancelText"
    @confirm="confirmAddCampaign"
    @cancel="cancelAddCampaign"
  />

  <InputPromt
    v-if="showInputPromtDeleteCampaign"
    :title="inputPromtDeleteCampaignTitle"
    :message="inputPromtDeleteCampaignMessage"
    :confirmText="inputPromtDeleteCampaignConfirmText"
    :cancelText="inputPromtDeleteCampaignCancelText"
    @confirm="confirmDeleteCampaign"
    @cancel="cancelDeleteCampaign"
  />

  <RouterView />
</template>

<style lang="scss" scoped></style>
