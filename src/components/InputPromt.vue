<script>
import Overlay from './Overlay.vue'

export default {
  name: 'Confirm',

  emits: ['confirm', 'cancel'],

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
      required: true
    },
    confirmText: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      inputText: ''
    }
  },

  methods: {
    confirm() {
      this.$emit('confirm', this.inputText)
    },
    cancel() {
      this.$emit('cancel')
    }
  },

  mounted() {
    document.getElementById('input-promt-field').focus()

    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'Escape':
          this.cancel()
          break
        case 'Enter':
          this.confirm()
          break
      }
    })
  },

  beforeUnmount() {
    document.removeEventListener('keydown', (event) => {
      switch(event.key) {
        case 'Escape':
          this.cancel()
          break
        case 'Enter':
          this.confirm()
          break
      }
    })
  }
}
</script>

<template>
  <Overlay />
  <div class="confirm">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <input id="input-promt-field" type="text" v-model="inputText" />
    <div class="confirm__actions">
      <button class="confirm-button" @click="confirm">{{ confirmText }}</button>
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
  width: 80%;
  max-width: 400px;
  border: 1px solid var(--color-border);

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
  }

  input {
    margin: 1rem 0;
    font-size: 1rem;
    width: 100%;
  }

  .confirm__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
}
</style>
