<script>
import { RouterLink, RouterView } from 'vue-router'
import MainNavigation from './components/MainNavigation.vue'

import { useCharacterStore } from './stores/CharacterStore'
import { useCampaignStore } from './stores/CampaignStore'

export default {
  name: 'App',

  components: {
    RouterLink,
    RouterView,
    MainNavigation
  },

  data() {
    return {
      showLandingPage: true
    }
  },

  setup() {
    const characterStore = useCharacterStore()
    const campaignStore = useCampaignStore()
    return {
      characterStore,
      campaignStore
    }
  },

  methods: {
    goToDiary() {
      this.showLandingPage = false
      this.$router.replace('/characters')
    }
  },

  mounted() {
    this.$router.replace('/')
    this.campaignStore.loadCampaignsFromLocalStorage()
  },

  beforeUnmount() {
    this.campaignStore.saveCampaginsInLocalStorage()
  }
}
</script>

<template>
  <MainNavigation v-show="!showLandingPage" />
  <RouterView />

  <div class="landing-page" v-show="showLandingPage">
    <h1>DnD-Diary</h1>
    <p>Willkommen in deinem Dungeons and Dragons Tagebuch!</p>
    <button @click="goToDiary" class="standard-button">Zum Tagebuch</button>

    <div class="contact">
      <p>Entwickelt von <a href="https://www.tobiasweinlich.com/">Tobias Weinlich</a></p>
      <p>Quellcode auf <a href="https://github.com/Tobiriz/DnD-Diary">GitHub</a></p>
    </div>

    <div class="notice">
      <h3>Wichtiger Hinweis</h3>
      <p>
        Diese Website speichert Ihre Daten lokal auf Ihrem Endgerät, um Ihnen eine personalisierte
        Erfahrung zu ermöglichen. Bitte beachten Sie, dass diese Daten nur auf diesem Endgerät
        verfügbar sind und verloren gehen, wenn Sie Ihre Browserdaten löschen. Wenn Sie Ihre Daten
        auf einem anderen Gerät verwenden möchten, können Sie diese manuell exportieren und auf dem
        anderen Gerät importieren. Ich empfehle Ihnen daher, Ihre Daten regelmäßig zu sichern, indem
        Sie sie manuell exportieren und an einem sicheren Ort aufbewahren. Wenn Sie Fragen zur
        Datensicherheit haben, zögern Sie bitte nicht, mich zu kontaktieren.
      </p>
    </div>

    <div class="impressum">
      <h3>Impressum</h3>
      <p>© 2023 Tobias Weinlich</p>
      <p>
        Kontakt:
        <a class="email" href="emailto:dnddiary@tobiasweinlich.com">dnddiary@tobiasweinlich.com</a>
      </p>
      <p>Alle Rechte vorbehalten.</p>
<!--
      <div class="legal-notice">
        <div class="legal-notice__copyright">
          <h4>Urheberrecht</h4>
          <p>
            Alle Inhalte dieser Web-App, insbesondere Texte, Bilder, Grafiken und Designelemente,
            sind urheberrechtlich geschützt. Eine Verwendung oder Vervielfältigung ohne
            ausdrückliche Zustimmung des Betreibers ist nicht gestattet.
          </p>
        </div>

        <div class="legal-notice__disclaimer">
          <h4>Haftungsausschluss</h4>
          <p>
            Der Betreiber übernimmt keine Gewähr für die Aktualität, Richtigkeit, Vollständigkeit
            oder Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Betreiber,
            die sich auf Schäden materieller oder immaterieller Art beziehen, die durch die Nutzung
            oder Nichtnutzung der angebotenen Informationen bzw. durch die Nutzung fehlerhafter und
            unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
          </p>
        </div>

        <div class="legal-notice__data-protection">
          <h4>Datenschutz</h4>
          <p>
            Der Betreiber nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Die Nutzung der
            Web-App ist ohne Angabe personenbezogener Daten möglich. Sofern innerhalb der Web-App
            personenbezogene Daten (z.B. Name, E-Mail-Adresse) erhoben werden, erfolgt dies stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an
            Dritte weitergegeben.
          </p>
        </div>
      </div>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-size: 1.5rem;
  text-align: center;
  overflow-y: auto;

  h1 {
    font-size: 3rem;
    margin-bottom: 0;
  }

  button {
    margin-top: 1rem;
    font-size: 2rem;
  }
}

.contact {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  p {
    margin-bottom: 0;
    font-size: 0.8rem;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.notice {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 1rem;

  h3 {
    margin-bottom: 0;
    font-size: 1.2rem;
    text-decoration: underline;
  }

  p {
    font-size: 0.8rem;
  }
}

.impressum {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 1rem;
  padding: 1rem;

  .email {
    font-size: 0.8rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h3 {
    margin-bottom: 0;
    font-size: 1.2rem;
    text-decoration: underline;
  }

  p {
    font-size: 0.8rem;
  }
}

.legal-notice {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  > div {
    width: 30%;

    h4 {
      margin-bottom: 0;
      font-size: 1rem;
      text-decoration: underline;
    }

    p {
      padding: 0.5rem;
      font-size: 0.6rem;
    }
  }
}
</style>
