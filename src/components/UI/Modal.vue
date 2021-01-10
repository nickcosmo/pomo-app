<template>
  <div class="modal-overlay">
    <div class="dialog">
      <slot></slot>
      <h1>{{ status }}</h1>
      <div v-if="logOutType">
        <base-button @click="extendLogOut()">yes</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  props: ["type"],
  computed: {
    logOutType() {
      if (this.type === "logout") {
        return true;
      }
      return false;
    },
  },
  methods: {
    extendLogOut() {
      this.$store.dispatch("setLogOut");
      this.$emit("close", false);
    },
  },
  emits: ['close'],
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
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

button {
  margin: 10px 0px !important;
}

h2 {
  font-size: 40px;
}
</style>