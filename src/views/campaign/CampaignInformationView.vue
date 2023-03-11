<script>
import { useCampaignStore } from '../../stores/CampaignStore'
import CampaignDetails from '../../components/campaign/CampaignDetails.vue'
import InputPromt from '../../components/InputPromt.vue'
import Confirm from '../../components/Confirm.vue'
import Player from '../../components/campaign/Player.vue'
import Alert from '../../components/Alert.vue'

export default {
  name: 'CampaignInformationView',

  components: {
    CampaignDetails,
    InputPromt,
    Confirm,
    Player,
    Alert
  },

  setup() {
    const campaignStore = useCampaignStore()
    return {
      campaignStore
    }
  },

  data() {
    return {
      editInfo: false,
      headerButtonText: 'Bearbeiten',
      headerChoiceButtonText: '',
      openTab: 'Übersicht',
      playersBeingEdited: 0,
      forceSave: false,
      forceCancel: false,

      changes: {
        campaignName: '',
        dungeonMaster: '',
        description: ''
      },

      inputPromtAddPlayer: {
        show: false,
        title: 'Spieler hinzufügen',
        message: 'Wie heißt der Spieler?',
        confirm: 'Hinzufügen',
        cancel: 'Abbrechen'
      },

      confirmChanges: {
        show: false,
        title: 'Änderungen speichern?',
        message: 'Die Informationen werden überschrieben.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmCancel: {
        show: false,
        title: 'Änderungen verwerfen?',
        message: 'Alle Änderungen gehen dabei verloren.',
        confirmText: 'Ja',
        cancelText: 'Nein'
      },

      confirmLeave: {
        route: '',
        show: false,
        title: 'Informationen oder Spieler werden bearbeitet',
        message: 'Wie wollen Sie fortfahren?',
        confirmText: 'Speichern und verlassen',
        extraText: 'Verlassen ohne zu speichern',
        cancelText: 'Abbrechen'
      },

      alert: {
        show: false,
        title: 'Fehler',
        message: 'Es werden noch Spieler bearbeitet.',
        confirmText: 'Ok'
      }
    }
  },

  computed: {
    campaign() {
      return this.campaignStore.getActiveCampaign
    },

    title() {
      return 'Info'
    },

    name() {
      return this.campaign._name
    },

    dungeonMaster() {
      return this.campaign._dm
    },

    description() {
      return this.campaign._description
    },

    players() {
      return this.campaign._players
    }
  },

  methods: {
    playersBeingEditedPlus() {
      this.playersBeingEdited++
      this.campaignStore.setActiveEditing(true)
    },

    playersBeingEditedMinus() {
      this.playersBeingEdited--
      if (this.playersBeingEdited === 0) {
        this.campaignStore.setActiveEditing(false)
      }
    },

    editInformation() {
      if (this.editInfo) {
        this.confirmSaveChanges()
      } else {
        this.editInfo = true
        this.changes.campaignName = this.name
        this.changes.dungeonMaster = this.dungeonMaster
        this.changes.description = this.description
        this.headerButtonText = 'Speichern'
        this.headerChoiceButtonText = 'Abbrechen'
        this.playersBeingEditedPlus()
      }
    },

    confirmSaveChanges() {
      if (this.playersBeingEdited > 0) {
        this.alert.show = true
        return
      } else {
        if (this.noChanges()) {
          this.editInfo = false
          this.resetButtonText()
          return
        }
        this.confirmChanges.show = true
      }
    },

    saveChanges() {
      this.campaignStore.updateActiveCampaignName(this.changes.campaignName)
      this.campaignStore.updateActiveCampaignDungeonMaster(this.changes.dungeonMaster)
      this.campaignStore.updateActiveCampaignDescription(this.changes.description)
      this.confirmChanges.show = false
      this.resetButtonText()
      this.editInfo = false
      this.playersBeingEditedMinus()
    },

    confirmCancelEdit() {
      if (this.playersBeingEdited > 0) {
        this.alert.show = true
        return
      } else {
        if (this.noChanges()) {
          this.editInfo = false
          this.resetButtonText()
          return
        }
        this.confirmCancel.show = true
      }
    },

    noChanges() {
      return (
        this.changes.campaignName === this.name &&
        this.changes.dungeonMaster === this.dungeonMaster &&
        this.changes.description === this.description
      )
    },

    cancelEdit() {
      this.resetButtonText()
      this.confirmCancel.show = false
      this.playersBeingEditedMinus()
      this.editInfo = false
    },

    resetButtonText() {
      this.headerButtonText = 'Bearbeiten'
      this.headerChoiceButtonText = ''
    },

    confirmAddPlayer() {
      this.inputPromtAddPlayer.show = true
    },

    addPlayer(name) {
      if (name !== '') this.campaignStore.addPlayerToActiveCampaign(name)
      this.inputPromtAddPlayer.show = false
    },

    saveAndLeave() {
      this.forceSave = true
      this.confirmLeave.show = false
      this.saveChanges()
      setTimeout(() => {
        this.forceSave = false
        this.$router.replace(this.confirmLeave.route)
      }, 10)
    },

    leaveWithoutSaving() {
      this.forceCancel = true
      this.confirmLeave.show = false
      this.cancelEdit()
      setTimeout(() => {
        this.forceCancel = false
        this.$router.replace(this.confirmLeave.route)
      }, 10)
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.playersBeingEdited > 0 || this.editInfo) {
      this.confirmLeave.route = to.fullPath
      this.confirmLeave.show = true
      next(false)
    } else next()
  }
}
</script>

<template>
  <CampaignDetails
    :buttonText="headerButtonText"
    :choiceButtonText="headerChoiceButtonText"
    :openTabName="openTab"
    @buttonClick="editInformation"
    @choiceClick="confirmCancelEdit"
  >
    <template #info>
      <div class="dm" v-if="!editInfo">
        <h1>{{ name }}</h1>
        <h3>
          Dungeon Master: <span>{{ dungeonMaster }}</span>
        </h3>
        <pre>{{ description }}</pre>
      </div>

      <div class="dm-edit" v-if="editInfo">
        <h3>Name der Kampagne</h3>
        <input type="text" v-model="changes.campaignName" />
        <h3>Dungeon Master</h3>
        <input type="text" v-model="changes.dungeonMaster" />
        <textarea v-model="changes.description" placeholder="Weitere Informationen"></textarea>
      </div>
    </template>

    <template #items>
      <div class="player">
        <h2>Mitspieler</h2>

        <Player
          v-for="(player, index) in players"
          :key="index"
          :item="player"
          :forceSave="forceSave"
          :forceCancel="forceCancel"
          :activeEditing="editInfo"
          @deletePlayer="campaignStore.deletePlayerFromActiveCampaign"
          @plusEdit="playersBeingEditedPlus"
          @minusEdit="playersBeingEditedMinus"
        />

        <button v-if="editInfo" @click="confirmAddPlayer" class="button standard-button">
          Spieler hinzufügen
        </button>
      </div>
    </template>
  </CampaignDetails>

  <InputPromt
    v-if="inputPromtAddPlayer.show"
    :title="inputPromtAddPlayer.title"
    :message="inputPromtAddPlayer.message"
    :confirmText="inputPromtAddPlayer.confirm"
    :cancelText="inputPromtAddPlayer.cancel"
    @confirm="addPlayer"
    @cancel="inputPromtAddPlayer.show = false"
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
    v-if="confirmCancel.show"
    :title="confirmCancel.title"
    :message="confirmCancel.message"
    :confirmText="confirmCancel.confirmText"
    :extraText="confirmCancel.extraText"
    :cancelText="confirmCancel.cancelText"
    @confirm="cancelEdit"
    @cancel="confirmCancel.show = false"
  />

  <Alert
    v-if="alert.show"
    :title="alert.title"
    :message="alert.message"
    :confirmText="alert.confirmText"
    @confirm="alert.show = false"
  />
</template>

<style lang="scss" scoped>
div {
  width: 100%;
}

.dm {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem 1rem;
  border-bottom: 2px solid var(--color-border);
  background-color: var(--color-background);
  font-size: 1rem;

  pre {
    margin-top: 0.5rem;
  }
}

.dm-edit {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem 1rem 1rem;
  border-bottom: 2px solid var(--color-border);
  background-color: var(--color-background);
  font-size: 1rem;

  input {
    width: 50%;
    font-size: 1rem;
  }

  textarea {
    width: 50%;
    margin-top: 1rem;
    height: 5rem;
    font-size: 1rem;
  }
}

.player {
  display: flex;
  flex-direction: column;

  h2 {
    padding: 1rem;
    background-color: var(--color-background-soft);
    border-bottom: 2px solid var(--color-border);
    margin-bottom: 0.5rem;
  }

  button {
    width: 50%;
    align-self: center;
    margin-bottom: 1rem;
  }
}
</style>
