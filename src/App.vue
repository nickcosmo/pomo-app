<template>
  <div>
    <modal :status="status"></modal>
    <app-header :isLoggedIn="isLoggedIn"></app-header>
    <loader :loading="loading"></loader>
    <loader></loader>
    <div class="main-body" v-if="!loading">
      <router-view :isLoggedIn="isLoggedIn"></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Modal from "./components/UI/Modal.vue";
import Loader from "./components/UI/Loader.vue";

export default {
  async created() {
    const cookies = document.cookie.split("=");
    const found = cookies.find((cookie) => cookie === "loggedIn");
    if (found) {
      this.$store.commit("updateLogInState", true);
      await this.$store.dispatch("tryLogIn");
      this.$store.commit("initMinutes");
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.authModule.isLoggedIn;
    },
    logOutTime() {
      return this.$store.getters.logOutTime;
    },
    loading() {
      return this.$store.state.modalModule.loading;
    },
    status() {
      return this.$store.state.modalModule.modalStatus;
    },
  },
  components: {
    AppHeader,
    Modal,
    Loader,
  },
  // watch: {
  //   logOutTime: function () {
  //     if (this.logOutTime === 5000) {
  //       this.$store.commit("updateModalType", "signin");
  //       this.$store.commit(
  //         "updateModalMessage",
  //         `Welcome Back, ${result.name}!`
  //       );
  //       this.$store.commit("updateModalStatus");
  //     }
  //   },
  // },
};
</script>

<style scoped>
html {
  width: 100%;
  margin: none;
}

.main-body,
header {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 100px;
  color: #efefef;
  background-color: #0f0f0f;
}
</style>
