<script>
export default {
    name: 'LandingPage',
    
    methods: {
        goToDiary() {
            this.$router.replace('/diary/character-selection')
        },

        goToImpressum() {
            this.$router.replace('/impressum')
        }
    },
}
</script>

<template>
    <div class="landing-page">
      <h1>DnD-Diary</h1>
      <p>Willkommen in deinem Dungeons and Dragons Tagebuch!</p>
      <button @click="goToDiary" class="standard-button">Zum Tagebuch</button>
  
      <div class="contact">
        <p>Entwickelt von <a href="https://www.tobiasweinlich.com/">Tobias Weinlich</a></p>
        <p>Quellcode auf <a href="https://github.com/Tobiriz/DnD-Diary">GitHub</a></p>
        <p>
          Kontakt:
          <a class="email" href="emailto:dnddiary@tobiasweinlich.com">dnddiary@tobiasweinlich.com</a>
        </p>
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
        <p>Alle Rechte vorbehalten.</p>
        <button @click="goToImpressum" class="standard-button">Zum Impressum</button>
      </div>
    </div>
  </template>
  
  <style lang="scss" scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
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

  button {
    margin-top: 1rem;
    font-size: 1.2rem;
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
