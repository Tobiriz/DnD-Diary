<script>
export default {
  name: 'SelectionDetails',

  props: {
    isCampaign: {
      type: Boolean,
      required: true
    },

    titleText: {
      type: String,
      required: false
    },

    descriptionText: {
      type: String,
      required: false
    },

    dmName: {
      type: String,
      required: false
    },

    playerArray: {
      type: Array,
      required: false
    },

    hasItemSelected: {
      type: Boolean,
      required: true
    },

    loadButtonText: {
      type: String,
      required: true
    },

    deleteButtonText: {
      type: String,
      required: true
    }
  },

  computed: {
    title() {
      return this.titleText
    },

    hasTitle() {
      return this.titleText !== undefined
    },

    showCampaignDetails() {
      return this.isCampaign
    },

    description() {
      return this.descriptionText
    },

    dm() {
      if (this.dmName) return this.dmName
      else return 'Kein DungeonMaster'
    },

    player() {
      if (this.playerArray !== undefined && this.playerArray.length > 0) return this.playerArray
      else return ['Keine Spieler']
    }
  }
}
</script>

<template>
  <div class="selection-details">
    <div class="buttons">
      <button
        class="standard-button"
        v-show="hasItemSelected"
        @click="$emit('setSelectedItemToActive')"
      >
        {{ loadButtonText }}
      </button>

      <button class="danger-button" v-show="hasItemSelected" @click="$emit('deleteSelectedItem')">
        {{ deleteButtonText }}
      </button>
    </div>

    <div v-if="showCampaignDetails && hasTitle" class="campaign-details">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>

      <h3>DungeonMaster</h3>
      <p>{{ dm }}</p>

      <h3>Spieler</h3>
      <ul>
        <li v-for="item in player" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selection-details {
  z-index: 1;
  position: absolute;
  top: var(--header-height);
  right: 0;
  width: 80%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background-soft);
  box-sizing: border-box;

  .campaign-details {
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem 1rem 2rem;

    h2 {
      font-size: 3vh;
    }

    h3 {
      font-size: 2.5vh;
      margin-top: 1rem;
      padding-left: 1rem;
    }

    p {
      padding: 1rem 1.5rem;
      font-size: 2vh;
    }

    ul {
      padding: 0.5rem 3rem;
      font-size: 2vh;
    }
  }

  .buttons {
    position: relative;
    top: 20px;
    left: 20px;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    width: 35vw;
    gap: 15px;

    button {
      flex: 1;
      position: relative;
      font-size: 2dvh;
      z-index: 2;
    }
  }
}
</style>
