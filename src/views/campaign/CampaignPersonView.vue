<script>
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignDetails from '../../components/campaign/CampaignDetails.vue'
import InputPromt from '../../components/InputPromt.vue'
import Confirm from '../../components/Confirm.vue'
import Person from '../../components/campaign/Person.vue'

export default {
  name: 'CampaignPersonView',

  components: {
    CampaignDetails,
    InputPromt,
    Confirm,
    Person
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      addItemText: 'Person hinzufügen',
      tabName: 'Personen',
      personsBeingEdited: 0,
      forceSave: false,
      forceCancel: false,

      inputPromtAddPerson: {
        show: false,
        title: 'Person hinzufügen',
        message: 'Wie soll die Person heißen?',
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

    persons() {
      return this.campaign._persons
    }
  },

  methods: {
    addPerson() {
      this.inputPromtAddPerson.show = true
    },

    confirmAddPerson(name) {
      if (name !== '') this.campaignStore.addPersonToActiveCampaign(name)
      this.inputPromtAddPerson.show = false
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
    if (this.personsBeingEdited > 0) {
      this.confirmLeave.route = to.fullPath
      this.confirmLeave.show = true
      next(false)
    } else next()
  }
}
</script>

<template>
  <CampaignDetails :buttonText="addItemText" :openTabName="tabName" @buttonClick="addPerson">
    <template #items>
      <Person
        v-for="(person, index) in persons"
        :key="index"
        :item="person"
        :forceSave="forceSave"
        :forceCancel="forceCancel"
        @deletePerson="campaignStore.deletePersonFromActiveCampaign"
        @plusEdit="personsBeingEdited++"
        @minusEdit="personsBeingEdited--"
      />
    </template>
  </CampaignDetails>

  <InputPromt
    v-if="inputPromtAddPerson.show"
    :title="inputPromtAddPerson.title"
    :message="inputPromtAddPerson.message"
    :confirmText="inputPromtAddPerson.confirm"
    :cancelText="inputPromtAddPerson.cancel"
    @confirm="confirmAddPerson"
    @cancel="inputPromtAddPerson.show = false"
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
