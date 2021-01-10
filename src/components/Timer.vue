<template>
  <div class="container">
    <h1 class="timer">{{ displayMinutes }}:{{ displaySeconds }}</h1>
    <div>
      <base-button @click="startTimer">START</base-button>
      <base-button @click="resetTimer">NEXT</base-button>
    </div>
    <div class="bar-container">
      <div class="outest-bar bar">
        <div
          class="outer-bar bar"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
    <div class="count">
      <h3>count: {{ pomodoroCount }}/4</h3>
    </div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "displayMinutes",
      "displaySeconds",
    ]),
    // ...mapState([]),
    progressSeconds() {
      return this.$store.state.timerModule.progressSeconds;
    },
    progressWidth() {
      return this.$store.state.timerModule.progressWidth;
    },
    pomodoroCount() {
      return this.$store.state.timerModule.pomodoroCount;
    },
  },
  methods: {
    startTimer() {
      this.$store.dispatch("startTimer");
    },
    resetTimer() {
      this.$store.dispatch("resetTimer");
    },
  },
  mounted: function () {
    this.$store.commit("initMinutes");
  },
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.count {
  margin-top: 5px;
}

.timer {
  font-size: 200px;
  color: #efefef;
}

.bar-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
  display: inline-block;
  height: 20px;
}

.outest-bar {
  display: inline-block;
  width: 700px;
  background-color: #efefef;
}

.outer-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00f3f3;
  animation: fill 25s linear infinite;
}

/* .container {
  animation: enter 0.5s linear;
}

@keyframes enter {
  0% {
    transform: translateY(50px);
    opacity: 0%;
  }
  100% {
    transform: translateY(0px);
    opacity: 100%;
  }
} */
</style>