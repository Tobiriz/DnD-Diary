<script>
export default {
  name: 'SelectionList',

  props: {
    items: {
      type: Array,
      required: true
    },

    title: {
      type: String,
      required: false
    },

    selected: {
      type: Object,
      required: false
    },

    addItemText: {
      type: String,
      required: true
    }
  },

  emits: ['selectItem', 'addItem']
}
</script>

<template>
  <div class="selection-list">
    <h3>{{ title }}</h3>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('selectItem', index)"
        :class="{ selected: selected === item }"
      >
        {{ item._name }}
      </li>
    </ul>

    <button class="standard-button" @click="$emit('addItem')">{{ addItemText }}</button>
  </div>
</template>

<style lang="scss" scoped>
.selection-list {
  z-index: 1;
  position: absolute;
  top: var(--header-height);
  left: 0;
  width: 25%;
  height: calc(100dvh - var(--header-height));
  background-color: var(--color-background-soft);
  box-sizing: border-box;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;

  h3 {
    padding: 1rem 1.5rem;
    font-size: 3vh;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li:nth-child(1) {
      border-top: 1px solid var(--color-border);
    }

    li {
      padding: 1rem 1.5rem;
      font-size: 2vh;
      border-bottom: 1px solid var(--color-border);
      cursor: pointer;

      &:hover:not(.selected) {
        background-color: var(--color-background-mute);
      }
    }
  }

  button {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 2rem;
    left: 20%;
    width: 60%;
    min-width: 120px;
    font-size: 2vh;
  }
}

.selected {
  background-color: var(--color-link-active);
}
</style>
