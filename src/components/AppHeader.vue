<template>
  <nav>
    <div><router-link to="/timer">
      <h1 class="title">POMO.</h1>
      <p>the pomodoro app</p>
    </router-link></div>
    <div>
      <ul>
        <li><router-link to="/signin">log in</router-link></li>
        <li><router-link to="/signup">sign up</router-link></li>
        <li><router-link to="/dashboard">dashboard</router-link></li>
        <li><router-link to="/timer">timer</router-link></li>
        <li><router-link to="/settings">settings</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
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