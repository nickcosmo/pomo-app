<template>
  <teleport to="body">
    <div class="modal-overlay">
      <div class="dialog">
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
        <div v-if="type === 'auth'">
          <base-button @click="close(); redirect();">close</base-button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  props: ["type", "data", "nextRoute"],
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
      if(this.data) {
        return true;
      }
      return false;
    }
  },
  methods: {
    extendLogOut() {
      this.$store.dispatch("setLogOut");
    },
    close() {
      this.$emit("close", false);
    },
    redirect() {
      this.$router.push(this.nextRoute);
    }
  },
  emits: ["close", "extendLogOut", "redirect"],
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.dialog {
  margin: 80px auto;
  text-align: center;
  border-radius: 10px;
  width: 20%;
  border: 2px solid #00f6f6;
  background-color: #0f0f0f;
  color: #efefef;
  padding: 10px;
  animation: enter 0.25s linear;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
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
  font-size: 40px;
}

@keyframes enter {
  0% {
    transform: translateY(20px);
    opacity: 0%;
  }
  100% {
    transform: translateY(0px);
    opacity: 100%;
  }
}
</style>