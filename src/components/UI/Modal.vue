<template>
  <div v-if="status" class="modal-overlay"></div>
  <transition name="modal">
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
  /* margin-top: 20%; */
  width: 40rem;
  border: 2px solid #00f6f6;
  background-color: #0f0f0f;
  color: #efefef;
  padding: 10px;
  z-index: 94;
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
  margin-top: 15px !important;
}

h2 {
  font-size: 40px;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0%;
  transform: scale(0);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 100%;
  transform: scale(1);
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-active {
  transition: all 0.3s ease;
}

@media screen and (max-width: 775px) {
  h2 {
    font-size: 30px;
  }
  .dialog {
    position: absolute;
    left: calc(50% - 9rem);
    width: 18rem;
  }
}
</style>