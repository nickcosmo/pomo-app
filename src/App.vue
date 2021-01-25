<template>
  <div>
    <modal :status="status"></modal>
    <app-header :isLoggedIn="isLoggedIn"></app-header>
    <loader :loading="loading"></loader>
    <!-- <div class="main-body" v-if="!loading"> -->
    <div class="main-body">
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
      await this.$store.dispatch("tryLogIn");
      this.$store.commit("updateLogInState", true);
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
};
</script>

<style scoped>
html {
  width: 100%;
  margin: none;
}

.main-body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #efefef;
  font-size: 10px;
  background-color: #0f0f0f;
  overflow: hidden;
}

@media screen and (max-width: 500px) {
  .main-body {
    margin-top: 6%;
  }
}
</style>
