<template>
  <div class="container">
    <h1>Sign Up Here!</h1>
    <form @submit.prevent="pushSignup()">
      <div class="form-control">
        <label for="name">name:</label>
        <input type="text" id="name" name="name" v-model="name" />
      </div>
      <div class="form-control">
        <label for="email">email:</label>
        <input type="email" id="email" name="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
        />
      </div>
      <base-button type="submit">submit</base-button>
      <span
        ><router-link to="/signin"
          >Already a member? Signin instead!</router-link
        ></span
      >
    </form>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    pushSignup() {
      fetch("http://localhost:3000/sign-up", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
        }),
      });
    },
  },
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
  text-align: left !important;
}
</style>