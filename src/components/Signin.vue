<template>
  <div class="container">
    <h1>Log In Here!</h1>
    <form action="POST" @submit.prevent="pushSignIn()">
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
      <base-button>submit</base-button>
      <span
        ><router-link to="/signup"
          >Not a member? Signup instead!</router-link
        ></span
      >
    </form>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";

export default {
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    pushSignIn() {
      this.$store.dispatch("pushSignIn", {
        email: this.email,
        password: this.password
      })
    }
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