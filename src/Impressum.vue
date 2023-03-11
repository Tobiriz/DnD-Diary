<script>
export default {
  name: 'Impressum',

  methods: {
    goBack() {
      this.$router.replace('/landing-page')
    }
  }
}
</script>

<template>
  <main>
    <div class="legal-notice">
      <div class="legal-notice__copyright">
        <h4>Urheberrecht</h4>
        <p>
          Alle Inhalte dieser Web-App, insbesondere Texte, Bilder, Grafiken und Designelemente, sind
          urheberrechtlich geschützt. Eine Verwendung oder Vervielfältigung ohne ausdrückliche
          Zustimmung des Betreibers ist nicht gestattet.
        </p>
      </div>

      <div class="legal-notice__disclaimer">
        <h4>Haftungsausschluss</h4>
        <p>
          Der Betreiber übernimmt keine Gewähr für die Aktualität, Richtigkeit, Vollständigkeit oder
          Qualität der bereitgestellten Informationen. Haftungsansprüche gegen den Betreiber, die
          sich auf Schäden materieller oder immaterieller Art beziehen, die durch die Nutzung oder
          Nichtnutzung der angebotenen Informationen bzw. durch die Nutzung fehlerhafter und
          unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
        </p>
      </div>

      <div class="legal-notice__data-protection">
        <h4>Datenschutz</h4>
        <p>
          Der Betreiber nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Die Nutzung der
          Web-App ist ohne Angabe personenbezogener Daten möglich. Sofern innerhalb der Web-App
          personenbezogene Daten (z.B. Name, E-Mail-Adresse) erhoben werden, erfolgt dies stets auf
          freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte
          weitergegeben.
        </p>
      </div>
    </div>
    <button @click="goBack" class="standard-button">Zurück</button>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
}

.legal-notice {
  max-width: 50rem;
  margin-bottom: 2rem;
}

.legal-notice__copyright,
.legal-notice__disclaimer,
.legal-notice__data-protection {
  margin-bottom: 2rem;
}

.legal-notice__copyright,
.legal-notice__disclaimer {
  h4 {
    margin-bottom: 1rem;
  }
}

.legal-notice__data-protection {
  h4 {
    margin-bottom: 1rem;
  }
}
</style>
