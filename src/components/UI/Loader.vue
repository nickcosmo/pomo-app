<template>
  <div class="modal-overlay" v-if="loading"></div>
  <transition name="loading">
    <div v-if="loading" class="dialog">
      <h1>LOADING</h1>
      <h1 class="dots">
        ......................................................................................................
      </h1>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["loading"],
};
</script>

<style scoped>
.dialog {
  text-align: center;
  border-radius: 10px;
  position: absolute;
  width: 20rem;
  left: calc(50% - 10rem);
  top: calc(50% - 10rem);
  border: 2px solid #00f6f6;
  background-color: #0f0f0f;
  color: #efefef;
  padding: 10px;
  overflow: hidden;
  z-index: 91;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
}

.dots {
  white-space: nowrap;
  animation: move 3.5s linear 0s infinite;
}

.loading-enter-active {
  transition: all 0.3s ease;
}

.loading-leave-from,
.loading-enter-to {
  opacity: 100%;
  transform: scale(1);
}

.loading-leave-active {
  transition: all 0.3s ease;
}

.loading-leave-to,
.loading-enter-from {
  opacity: 0%;
  transform: scale(0);
}

@keyframes move {
  0% {
    transform: translateX(-400px);
  }
  100% {
    transform: translateX(30px);
  }
}

@media screen and (max-width: 775px) {
  .dialog {
    position: absolute;
    left: calc(50% - 9rem);
    top: calc(50% - 9rem);
    width: 18rem;
  }
}
</style>