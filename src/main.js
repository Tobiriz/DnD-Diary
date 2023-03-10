import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')

import { useCampaignStore } from './stores/campaignStore'
import { useCharacterStore } from './stores/characterStore'
window.addEventListener('beforeunload', () => {
  const campaignStore = useCampaignStore()
  const characterStore = useCharacterStore()

  campaignStore.saveCampaginsInLocalStorage()
  //characterStore.saveCharactersInLocalStorage()
})
