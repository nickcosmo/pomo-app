<template>
  <div>
    <modal v-if="showStatus" :type="modalType" @close="closeModal()">
      <h2>{{ message }}</h2>
    </modal>
    <app-header></app-header>
    <loader v-if="loading"></loader>
    <div class="main-body" v-if="!loading">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Modal from "./components/UI/Modal.vue";
import Loader from "./components/UI/Loader.vue";

export default {
  data: () => {
    return {
      loading: false,
      showStatus: false,
      message: '',
      modalType: ''
    };
  },
  methods: {
    closeModal(value) {
      this.showStatus = value;
    }
  },
  created() {
    // this.$store.dispatch("tryLogIn"); --> for auto login
  },
  computed: {
    logOutTime() {
      return this.$store.getters.logOutTime;
    },
    logInStatus() {
      return this.$store.getters.logState;
    }
  },
  components: {
    AppHeader,
    Modal,
    Loader
  },
  watch: {
    logOutTime: function() {
      if (this.logOutTime === 5000) {
        this.showStatus = true;
        this.message = "Auto-Logout in 5 seconds.  Are you still Studying?";
        this.modalType = "logout";
      }
    },
    logInStatus: function() {
      if(this.logInStatus === false) {
        this.showStatus = false;
      }
    }
  },
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
