import { createRouter, createWebHistory } from 'vue-router'

import Home from '../App.vue'
import LandingPage from '../LandingPage.vue'
import Impressum from '../Impressum.vue'
import DiaryView from '../views/DiaryView.vue'

import CharacterSelection from '../views/SelectCharacterView.vue'
import CharacterView from '../views/character/CharacterView.vue'
import CharacterPersonalityView from '../views/character/CharacterPersonalityView.vue'
import CharacterSkillView from '../views/character/CharacterSkillView.vue'
import CharacterEquipmentView from '../views/character/CharacterEquipmentView.vue'
import CharacterSpellView from '../views/character/CharacterSpellView.vue'
import CharacterNoteView from '../views/character/CharacterNoteView.vue'

import CampaignSelection from '../views/SelectCampaignView.vue'
import CampaignView from '../views/campaign/CampaignView.vue'
import CampaignInformationView from '../views/campaign/CampaignInformationView.vue'
import SessionView from '../views/campaign/CampaignSessionView.vue'
import CampaignPersonView from '../views/campaign/CampaignPersonView.vue'
import CampaignLocationView from '../views/campaign/CampaignLocationView.vue'
import CampaignNoteView from '../views/campaign/CampaignNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/landing-page',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: Impressum
    },
    {
      path: '/diary',
      name: 'diary',
      component: DiaryView,
      children: [
        {
          path: 'character-selection',
          name: 'character-selection',
          component: CharacterSelection,
          children: [
            {
              path: ':character',
              name: 'character',
              component: CharacterView,
              children: [
                {
                  path: 'personality',
                  name: 'personality',
                  component: CharacterPersonalityView
                },
                {
                  path: 'skills',
                  name: 'skills',
                  component: CharacterSkillView
                },
                {
                  path: 'equipment',
                  name: 'equipment',
                  component: CharacterEquipmentView
                },
                {
                  path: 'spells',
                  name: 'spells',
                  component: CharacterSpellView
                },
                {
                  path: 'notes',
                  name: 'characterNotes',
                  component: CharacterNoteView
                }
              ]
            }
          ]
        },
        {
          path: 'campaign-selection',
          name: 'campaign-selection',
          component: CampaignSelection,
          children: [
            {
              path: ':campaign',
              name: 'campaign',
              component: CampaignView,
              children: [
                {
                  path: 'information',
                  name: 'information',
                  component: CampaignInformationView
                },
                {
                  path: 'session',
                  name: 'session',
                  component: SessionView
                },
                {
                  path: 'persons',
                  name: 'persons',
                  component: CampaignPersonView
                },
                {
                  path: 'locations',
                  name: 'locations',
                  component: CampaignLocationView
                },
                {
                  path: 'notes',
                  name: 'campaignNotes',
                  component: CampaignNoteView
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
