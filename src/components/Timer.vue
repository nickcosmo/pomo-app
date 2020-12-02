<template>
  <div class="container">
    <h3 v-if="status == 'study'">STUDY STUDY STUDY</h3>
    <h3 v-if="status == 'break'">BREAK BREAK BREAK</h3>
    <keep-alive
      ><h1 class="timer">
        {{ displayMinutes }}:{{ displaySeconds }}
      </h1></keep-alive
    >

    <div>
      <base-button @click="startTimer">START</base-button>
      <base-button @click="resetTimer">RESET</base-button>
    </div>
    <div class="bar-container">
      <div class="outest-bar bar">
        <div
          class="outer-bar bar"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";

export default {
  data() {
    return {
      minutes: 25,
      seconds: 0,
      startCount: 0,
      intId: null,
      progressWidth: 0,
      progressSeconds: 0,
      status: "study",
    };
  },
  computed: {
    displayMinutes() {
      if (this.minutes <= 9) {
        return `0${this.minutes}`;
      }
      return this.minutes;
    },
    displaySeconds() {
      if (this.seconds <= 9) {
        return `0${this.seconds}`;
      }
      return this.seconds;
    },
  },
  methods: {
    setTitle() {
      return (document.title = `${this.displayMinutes}:${this.displaySeconds}`);
    },
    startTimer() {
      this.startCount++;
      if (this.startCount === 1) {
        this.intId = setInterval(() => {
          if (this.seconds === 0 && this.minutes === 0) {
            return this.resetTimer();
          }
          if (this.minutes >= 0) {
            if (this.seconds === 0) {
              this.seconds = 59;
              this.minutes--;
            } else {
              this.seconds--;
            }
            this.progressSeconds++;
            this.progressWidth = (this.progressSeconds / 1500) * 100;
            this.setTitle();
          }
        }, 1000);
      }
    },
    resetTimer() {
      if (this.intId) {
        clearInterval(this.intId);
        this.startCount = 0;
        this.progressSeconds = 0;
        this.progressWidth = 0;
        if (this.status === "study") {
          this.status = "break";
          this.minutes = 5;
          this.seconds = 0;
        } else {
          this.status = "study";
          this.minutes = 25;
          this.seconds = 0;
        }
        this.setTitle();
      }
    },
  },
  mounted: function () {
    this.setTitle();
  },
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
.timer {
  font-size: 200px;
  color: white;
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

.container {
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
}
</style>