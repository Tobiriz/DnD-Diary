<script>
import Overlay from './Overlay.vue'

export default {
  name: 'Confirm',

  emits: ['confirm', 'cancel', 'choice'],

  components: {
    Overlay
  },
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false
    },
    confirmText: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      required: true
    },
    extraText: {
      type: String,
      required: false
    },
    choiceColor: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('cancel')
    },
    choice() {
      this.$emit('choice')
    }
  },

  computed: {
    showExtraButton() {
      return this.extraText !== undefined
    },

    needChoiceColor() {
      if (this.choiceColor !== undefined) {
        return this.choiceColor
      } else {
        return false
      }
    }
  }
}
</script>

<template>
  <Overlay />
  <div class="confirm">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <div class="confirm__actions">
      <button class="confirm-button" @click="confirm">{{ confirmText }}</button>
      <button
        v-if="!needChoiceColor"
        v-show="showExtraButton"
        class="danger-button"
        @click="choice"
      >
        {{ extraText }}
      </button>
      <button v-if="needChoiceColor" v-show="showExtraButton" class="choice-button" @click="choice">
        {{ extraText }}
      </button>
      <button class="danger-button" @click="cancel">{{ cancelText }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.25);
  text-align: center;
  max-width: 500px;
  border: 1px solid var(--color-border);

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
  }

  .confirm__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    gap: 10px;

    button {
      flex: 1;
    }
  }
}
</style>
