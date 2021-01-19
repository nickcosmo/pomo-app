<template>
  <div v-if="modalStatus" class="modal-overlay" />
  <transition>
    <div v-if="modalStatus" class="dialog">
      <slot></slot>
      <div v-if="logOutType">
        <base-button
          @click="
            extendLogOut();
            close();
          "
          >yes</base-button
        >
      </div>
      <div v-if="errorType" @click="close()">
        <div v-if="propData" class="errorBody">
          <p><strong>validation errors:</strong></p>
          <ul>
            <li v-for="message in data" :key="message">{{ message }}</li>
          </ul>
        </div>
        <base-button>close</base-button>
      </div>
      <div v-if="type === 'signin' || type === 'signup'">
        <base-button
          @click="
            close();
            redirect();
          "
          >close</base-button
        >
      </div>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  props: ["type", "data", "nextRoute", "modalStatus"],
  computed: {
    logOutType() {
      if (this.type === "logout") {
        return true;
      }
      return false;
    },
    errorType() {
      if (this.type === "error") {
        return true;
      }
      return false;
    },
    propData() {
      if (this.data) {
        return true;
      }
      return false;
    },
  },
  methods: {
    extendLogOut() {
      this.$store.dispatch("setLogOut");
    },
    close() {
      this.$emit("close", false);
      if (this.type === "signin") {
        this.$store.commit("newSignIn");
      }
      if (this.type === "signup") {
        this.$store.commit("newSignUp");
      }
    },
    redirect() {
      // this.$router.push(this.nextRoute);
    },
  },
  emits: ["close", "extendLogOut", "redirect"],
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
  /* animation: enter 0.25s linear; */
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
  font-size: 80px;
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