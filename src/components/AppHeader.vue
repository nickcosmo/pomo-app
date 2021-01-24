<template>
  <nav>
    <div>
      <router-link to="/timer">
        <h1 class="title">POMO.</h1>
        <p>the pomodoro app</p>
      </router-link>
    </div>
    <div>
      <div class="hamburger" @click="showMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul class="menu" v-bind:class="{ open: isOpen }" @click="showMenu">
        <router-link to="/signin" v-if="!isLoggedIn"
          ><li>log in</li></router-link
        >
        <router-link to="/signup" v-if="!isLoggedIn"
          ><li>sign up</li></router-link
        >
        <router-link to="/dashboard"><li>dashboard</li></router-link>
        <router-link to="/timer"><li>timer</li></router-link>
        <router-link to="/settings"><li>settings</li></router-link>
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
  /* width: 40px; */
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

h1,
p {
  display: inline;
}

.title {
  font-size: 40px;
}

nav {
  padding: 10px 60px;
  display: flex;
  color: #efefef;
  width: 100%;
  height: 5%;
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
}

li:hover {
  border-color: #00f6f6;
  color: #00f6f6;
}

a {
  text-decoration: none;
  color: inherit;
}

@media screen and (max-width: 900px) {
  .hamburger {
    display: block;
    cursor: pointer;
  }

  ul {
    display: flex;
    margin: 2rem 10px;
    flex-direction: column;
    position: absolute;
    align-items: center;
    /* justify-content: center; */
    top: 10%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #0f0f0f;
    z-index: 80;
    transform: translateX(130%);
    transition: transform 0.5s;
  }

  .open {
    transform: translateX(0%);
  }

  li {
    width: 20rem;
    text-align: center;
    padding: 8px 5px;
    margin: 4px 5px;
    font-size: 2rem;
  }
}

@media screen and (max-width: 500px) {
  nav {
    padding: 10px 15px;
  }
}
</style>