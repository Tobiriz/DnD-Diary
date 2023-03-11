<script>
export default {
  name: 'CharacterDetails',

  props: {
    character: {
      type: Object,
      required: false
    },

    activeTab: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="character-details">
    <h1>{{ activeTab }}</h1>
  </div>
</template>

<style lang="scss" scoped>
.character-details {
  z-index: 3;
  position: absolute;
  top: var(--header-height);
  left: 25%;
  width: 75%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background-soft);
  box-sizing: border-box;

  h1 {
    padding: 1rem 1.5rem;
    font-size: 3vh;
  }
}
</style>
