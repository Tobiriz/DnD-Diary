<script>
export default {
  name: 'CampaignDetails',

  props: {
    campaign: {
      type: Object,
      required: false
    },

    openTabName: {
      type: String,
      required: true
    },

    buttonText: {
      type: String,
      required: true
    },

    choiceButtonText: {
      type: String,
      required: false
    }
  },

  emits: ['buttonClick', 'choiceClick'],

  computed: {
    textForButton() {
      return this.buttonText
    },

    needChoiceButton() {
      return this.choiceButtonText !== undefined && this.choiceButtonText !== ''
    },

    textForChoiceButton() {
      return this.choiceButtonText
    },

    tabName() {
      return this.openTabName
    }
  },

  methods: {
    buttonClick() {
      this.$emit('buttonClick')
    },

    choiceClick() {
      this.$emit('choiceClick')
    }
  }
}
</script>

<template>
  <div class="campaign-details">
    <div class="header">
      <h1>{{ tabName }}</h1>
      <div class="buttons">
        <button
          @click="buttonClick"
          class="standard-button"
          :class="{ 'alternative-button-style': needChoiceButton }"
        >
          {{ textForButton }}
        </button>
        <button @click="choiceClick" class="danger-button" v-if="needChoiceButton">
          {{ textForChoiceButton }}
        </button>
      </div>
    </div>

    <div class="items">
      <slot name="info"></slot>
      <slot name="items"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.campaign-details {
  z-index: 3;
  position: absolute;
  top: var(--header-height);
  right: 0;
  width: 80%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .items {
    height: 100%;
    overflow-y: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2rem;
    background-color: var(--color-background-soft);
    border-bottom: 3px solid var(--color-border);

    h1 {
      padding: 1rem 1.5rem;
      font-size: 3vh;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;

      button {
        position: relative;
        top: 10px;
        left: 10px;
        margin-bottom: 1rem;
      }
    }
  }
}

.alternative-button-style {
  background-color: var(--color-button-confirm) !important;

  &:hover {
    background-color: var(--color-button-confirm-hover) !important;
  }
}
</style>
