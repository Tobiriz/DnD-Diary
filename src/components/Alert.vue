<script>
import Overlay from './Overlay.vue'

export default {
  name: 'Alert',

  emits: ['confirm'],

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
    }
  },

  methods: {
    confirm() {
      this.$emit('confirm')
    }
  },

  mounted() {
    document.addEventListener('keydown', (event) => {
      switch(event.key) {
        case 'Escape':
          this.confirm()
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
          this.confirm()
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
  <div class="alert">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>

    <div class="alert__actions">
      <button class="confirm-button" @click="confirm">{{ confirmText }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
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

  .alert__actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>
