import { defineStore } from 'pinia'

export const useCampaignStore = defineStore('campaignStore', {
  state: () => {
    return {
      lastPath: null,
      campaigns: [],
      selectedCampaign: null,
      activeCampaign: null,
      activeEditing: false,
    }
  },

  actions: {
    saveCampaginsInLocalStorage() {
      localStorage.setItem('campaigns', JSON.stringify(this.campaigns))
    },

    loadCampaignsFromLocalStorage() {
      const campaigns = JSON.parse(localStorage.getItem('campaigns'))
      if (campaigns) {
        this.campaigns = campaigns
      }
    },

    addCampaign(name) {
      this.campaigns.push(new campaign(name))
      this.saveCampaginsInLocalStorage()
    },

    selectCampaign(index) {
      this.selectedCampaign = this.campaigns[index]
    },

    setSelectedCampaignToActive() {
      this.activeCampaign = this.selectedCampaign
    },

    deselectActiveCampaign() {
      this.activeCampaign = null
    },

    saveLastPath(path) {
      this.lastPath = path
    },

    setActiveEditing(editing) {
      this.activeEditing = editing
    },

    deleteCampaign() {
      this.campaigns = this.campaigns.filter((campaign) => campaign !== this.selectedCampaign)
      this.selectedCampaign = null
      this.activeCampaign = null
      this.saveCampaginsInLocalStorage()
    },

    addSessionToActiveCampaign(name) {
      this.activeCampaign._sessions.push(new session(name))
      this.saveCampaginsInLocalStorage()
    },

    deleteSessionFromActiveCampaign(session) {
      this.activeCampaign._sessions = this.activeCampaign._sessions.filter((s) => s !== session)
      this.saveCampaginsInLocalStorage()
    },

    addPersonToActiveCampaign(name) {
      this.activeCampaign._persons.push(new person(name))
      this.saveCampaginsInLocalStorage()
    },

    deletePersonFromActiveCampaign(person) {
      this.activeCampaign._persons = this.activeCampaign._persons.filter((p) => p !== person)
      this.saveCampaginsInLocalStorage()
    },

    addLocationToActiveCampaign(name) {
      this.activeCampaign._locations.push(new location(name))
      this.saveCampaginsInLocalStorage()
    },

    deleteLocationFromActiveCampaign(location) {
      this.activeCampaign._locations = this.activeCampaign._locations.filter((l) => l !== location)
      this.saveCampaginsInLocalStorage()
    },

    addNoteToActiveCampaign(name) {
      this.activeCampaign._notes.push(new campaignNote(name))
      this.saveCampaginsInLocalStorage()
    },

    deleteNoteFromActiveCampaign(note) {
      this.activeCampaign._notes = this.activeCampaign._notes.filter((cn) => cn !== note)
      this.saveCampaginsInLocalStorage()
    },

    addPlayerToActiveCampaign(name) {
      this.activeCampaign._players.push(new player(name))
      this.saveCampaginsInLocalStorage()
    },

    deletePlayerFromActiveCampaign(player) {
      this.activeCampaign._players = this.activeCampaign._players.filter((p) => p !== player)
      this.saveCampaginsInLocalStorage()
    },

    updateActiveCampaignName(name) {
      this.activeCampaign._name = name
      this.saveCampaginsInLocalStorage()
    },

    updateActiveCampaignDungeonMaster(dm) {
      this.activeCampaign._dm = dm
      this.saveCampaginsInLocalStorage()
    },

    updateActiveCampaignDescription(description) {
      this.activeCampaign._description = description
      this.saveCampaginsInLocalStorage()
    },
  },

  getters: {
    getCampaigns(state) {
      return state.campaigns
    },

    getSelectedCampaign(state) {
      return state.selectedCampaign
    },

    getActiveCampaign(state) {
      return state.activeCampaign
    },

    getLastPath(state) {
      return state.lastPath
    },

    getActiveEditing(state) {
      return state.activeEditing
    }
  }
})

class campaign {
  constructor(name) {
    this._name = name
    this._dm = ''
    this._description = ''
    this._sessions = []
    this._players = []
    this._persons = []
    this._locations = []
    this._notes = []
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }

  get dm() {
    return this._dm
  }

  set dm(dm) {
    this._dm = dm
  }

  get sessions() {
    return this._sessions
  }

  set sessions(sessions) {
    this._sessions = sessions
  }

  get players() {
    return this._players
  }

  set players(players) {
    this._players = players
  }

  get persons() {
    return this._persons
  }

  set persons(persons) {
    this._persons = persons
  }

  get locations() {
    return this._locations
  }

  set locations(locations) {
    this._locations = locations
  }

  get notes() {
    return this._notes
  }

  set notes(notes) {
    this._notes = notes
  }
}

class person {
  constructor(name) {
    this._name = name
    this._description = ''
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}

class session {
  constructor(name) {
    this._name = name
    this._players = []
    this._description = ''
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get players() {
    return this._players
  }

  set players(players) {
    this._players = players
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}

class location {
  constructor(name) {
    this._name = name
    this._description = ''
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}

class campaignNote {
  constructor(name) {
    this._name = name
    this._description = ''
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}

class player {
  constructor(name) {
    this._name = name
    this._character = new character(name + "'s Character")
    this._description = ''
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get character() {
    return this._character
  }

  set character(character) {
    this._character = character
  }

  get description() {
    return this._description
  }

  set description(description) {
    this._description = description
  }
}

class character {
  constructor(name) {
    this._name = name
    this._showName = true
    this._race = ''
    this._showRace = true
    this._class = ''
    this._showClass = true
    this._level = ''
    this._showLevel = true
    this._alignment = ''
    this._showAlignment = true
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }

  get showName() {
    return this._showName
  }

  set showName(showName) {
    this._showName = showName
  }

  get race() {
    return this._race
  }

  set race(race) {
    this._race = race
  }

  get showRace() {
    return this._showRace
  }

  set showRace(showRace) {
    this._showRace = showRace
  }

  get class() {
    return this._class
  }

  set class(charClass) {
    this._class = charClass
  }

  get showClass() {
    return this._showClass
  }

  set showClass(showClass) {
    this._showClass = showClass
  }

  get level() {
    return this._level
  }

  set level(level) {
    this._level = level
  }

  get showLevel() {
    return this._showLevel
  }

  set showLevel(showLevel) {
    this._showLevel = showLevel
  }

  get alignment() {
    return this._alignment
  }

  set alignment(alignment) {
    this._alignment = alignment
  }

  get showAlignment() {
    return this._showAlignment
  }

  set showAlignment(showAlignment) {
    this._showAlignment = showAlignment
  }
}
