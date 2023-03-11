<template>
  <div class="overlay"></div>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  background-color: rgba($color: #000000, $alpha: 0.2);
  backdrop-filter: blur(4px);
}
</style>
