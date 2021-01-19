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
  /* animation: enter 0.25s linear; */
  overflow: hidden;
  z-index: 91;
}

.modal-overlay {
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
  animation: move 1s linear;
}

.loading-enter-active {
  animation: enter 0.2s ease-out;
}

.loading-leave-active {
  animation: leave 0.2s ease-in;
}

@keyframes move {
  0% {
    transform: translateX(-90px);
  }
  100% {
    transform: translateX(50px);
  }
}

@keyframes enter {
  0% {
    opacity: 0%;
    transform: scale(0);
  }
  100% {
    opacity: 100%;
    transform: scale(1);
  }
}

@keyframes leave {
  0% {
    transform: scale(1);
    opacity: 100%;
  }
  100% {
    transform: scale(0);
    opacity: 0%;
  }
}
</style>