<template>
  <nav>
    <div>
      <router-link class="title" to="/timer">
        <h1>POMO.</h1>
        <p>the pomodoro app</p>
      </router-link>
    </div>
    <div>
      <div
        class="hamburger"
        v-bind:class="{ hamOpen: isOpen }"
        @click="showMenu"
      >
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div>
      </div>
      <ul class="menu" v-bind:class="{ open: isOpen }" @click="showMenu">
        <router-link to="/signin" v-if="!isLoggedIn"
          ><li>log in</li></router-link
        >
        <router-link to="/signup" v-if="!isLoggedIn"
          ><li>sign up</li></router-link
        >
        <router-link to="/timer"><li>timer</li></router-link>
        <router-link to="/settings"><li>settings</li></router-link>
        <router-link to="/dashboard"><li>dashboard</li></router-link>
        <a href="#" @click="postLogOut()" v-if="isLoggedIn"><li>log out</li></a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["isLoggedIn"],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async postLogOut() {
      this.$store.commit("load");
      await this.$store.dispatch("postLogOut");
      this.$store.commit("updateLogInState", false);
      this.$store.commit("load");
      this.$router.push("timer");
    },
    showMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.hamburger div {
  height: 3px;
  margin: 7px auto;
  background-color: #efefef;
}

.hamburger {
  display: none;
  width: 40px;
}

ul {
  flex-direction: row;
  align-items: flex-end;
}

.title h1 {
  font-size: 3em;
}
.title p {
  font-size: 1.25em;
}

h1,
p {
  display: inline;
}

nav {
  padding: 10px 60px;
  display: flex;
  color: #efefef;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

li {
  list-style-type: none;
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
  border: 2px solid #efefef;
  padding: 3px 5px;
  font-size: 1.25em;
}

li:hover {
  border-color: #00f6f6;
  color: #00f6f6;
}

a {
  text-decoration: none;
  color: inherit;
}

@media screen and (max-width: 1100px) {
  li,
  .title p {
    font-size: 1em;
  }
}

@media screen and (max-width: 950px) {
  .hamburger {
    display: block;
    cursor: pointer;
  }

  .top,
  .middle,
  .bottom {
    transition: all 04s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
  }

  .hamOpen .top {
    transform: translateY(10px);
    transform: rotate(45deg) translate(10px, 5px);
  }

  .hamOpen .middle {
    opacity: 0;
    transform: scale(0);
  }

  .hamOpen .bottom {
    transform: translateY(-10px);
    transform: rotate(-45deg) translate(10px, -5px);
  }

  ul {
    display: flex;
    visibility: hidden;
    padding: 15px 10px;
    flex-direction: column;
    position: fixed;
    align-items: center;
    top: 73px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0f0f0f;
    z-index: 80;
    transform: translateX(130%);
    transition: all 0.5s ease-in-out;
  }

  .open {
    transform: translateX(0%);
    visibility: visible;
  }

  li {
    width: 20rem;
    text-align: center;
    padding: 8px 5px;
    margin: 4px 5px;
    font-size: 2rem;
  }

  a:first-child {
    margin-top: 60px;
  }
}

@media screen and (max-width: 590px) {
  nav {
    padding: 10px 15px;
  }
}

@media screen and (max-width: 450px) {
  .title h1 {
    font-size: 2.75em;
  }
  .title p {
    font-size: 1em;
  }
}

@media screen and (max-width: 380px) {
  .title h1 {
    font-size: 2em;
  }
  .title p {
    font-size: 0.9em;
  }

  li {
    width: 17rem;
    text-align: center;
    padding: 8px 5px;
    margin: 4px 5px;
    font-size: 2rem;
  }
  a:first-child {
    margin-top: 30px;
  }
}
</style>