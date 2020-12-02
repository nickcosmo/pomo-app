<template>
  <div>
    <h1>Signup here!</h1>
    <div class="container">
      <form action="">
        <div class="form-control">
          <label for="username">name:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div class="form-control">
          <label for="username">email:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div class="form-control">
          <label for="password">password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <base-button>submit</base-button>
        <span><router-link to="/signin">Already a member? Signin instead!</router-link></span>
      </form>
    </div>
    
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
h1 {
  font-size: 60px;
}

label,
input {
  font-size: 30px;
  display: block;
  width: 100%;
}

button,
input {
  margin: 5px 0px;
}

span {
    margin-left: 10px;
}

a {
    text-decoration: none;
    color: inherit;
}

.container {
    width: 30%;
    margin: auto;
    text-align: left;
}
</style>