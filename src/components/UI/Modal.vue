<template>
  <div v-if="status" class="modal-overlay" />
  <transition>
    <div v-if="status" class="dialog">
      <h2>{{ message }}</h2>
      <div v-if="type === 'logout'">
        <base-button
          @click="
            extendLogOut();
            close();
          "
          >yes</base-button
        >
      </div>
      <div v-if="type === 'error'">
        <div v-if="errors" class="errorBody">
          <p><strong>validation errors:</strong></p>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
      <div v-if="type !== 'logout'">
        <base-button @click="close()">close</base-button>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  props: ["status"],
  computed: {
    type() {
      return this.$store.state.modalModule.modalType;
    },
    errors() {
      return this.$store.state.modalModule.modalErrors;
    },
    message() {
      return this.$store.state.modalModule.modalMessage;
    },
  },
  methods: {
    extendLogOut() {
      this.$store.dispatch("setLogOut");
    },
    close() {
      this.$store.commit("updateModalStatus");
    },
  },
  emits: ["extendLogOut"],
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.dialog {
  text-align: center;
  border-radius: 10px;
  position: absolute;
  left: calc(50% - 20rem);
  top: calc(50% - 10rem);
  width: 40rem;
  border: 2px solid #00f6f6;
  background-color: #0f0f0f;
  color: #efefef;
  padding: 10px;
  z-index: 95;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 93;
}

.errorBody {
  margin-top: 10px;
  display: inline-block;
  width: 70%;
  text-align: left;
}

button {
  margin: 10px 0px !important;
}

h2 {
  font-size: 2rem;
}

.v-enter-active {
  animation: enter 0.2s ease-out;
}

.v-leave-active {
  animation: leave 0.2s ease-in;
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