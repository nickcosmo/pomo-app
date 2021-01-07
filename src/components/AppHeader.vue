<template>
  <nav>
    <div><router-link to="/timer">
      <h1 class="title">POMO.</h1>
      <p>the pomodoro app</p>
    </router-link></div>
    <div>
      <ul>
        <router-link to="/signin"><li>log in</li></router-link>
        <router-link to="/signup"><li>sign up</li></router-link>
        <router-link to="/dashboard"><li>dashboard</li></router-link>
        <router-link to="/timer"><li>timer</li></router-link>
        <router-link to="/settings"><li>settings</li></router-link>
        <a href="#" @click="postLogOut()"><li>log out</li></a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    postLogOut() {
      this.$store.dispatch("postLogOut");
    }
  }
};
</script>

<style scoped>
h1, p {
  display: inline;
}

.title {
  font-size: 40px;
}

nav {
  width: 100%;
  height: 80px;
  padding: 10px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #efefef;
}

ul {
  display: flex;
  align-items: flex-end;
}

li {
  list-style-type: none;
  display: inline-block;
  cursor: pointer;
  margin-left: 15px;
  border: 2px solid #EFEFEF;
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
</style>