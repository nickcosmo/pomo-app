<template>
  <nav>
    <div>
      <h1 class="title">POMO.</h1>
      <p>the pomodoro app</p>
    </div>
    <div>
      <ul>
        <li>sign up</li>
        <li>sign in</li>
        <li>dashboard</li>
        <li>timer</li>
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
</style>