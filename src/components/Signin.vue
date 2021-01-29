<template>
  <div class="container">
    <h1>Log In Here!</h1>
    <form action="POST" @submit.prevent="signInVal()">
      <div class="form-control">
        <label for="email">email:</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="values.email"
          @blur="validate('email')"
          :style="[
            errors.email
              ? { 'border-color': '#ff6961', 'border-width': '2px' }
              : {},
          ]"
        />
      </div>
      <div class="form-control">
        <label for="password">password:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="values.password"
          @blur="validate('password')"
          :style="[
            errors.password
              ? { 'border-color': '#ff6961', 'border-width': '2px' }
              : {},
          ]"
        />
      </div>
      <base-button>submit</base-button>
      <span
        ><router-link to="/signup"
          >Not a member? Sign up instead!</router-link
        ></span
      >
    </form>
    <div v-if="Object.values(errors).length > 0">
      <ul class="errorMessage">
        <li v-if="errors.email">{{ errors.email }}</li>
        <li v-if="errors.password">{{ errors.password }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import * as yup from "yup";

export default {
  data() {
    const signInFormSchema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    return {
      errorArray: [],
      values: {
        email: "",
        password: "",
      },
      errors: {},
      signInFormSchema,
    };
  },
  methods: {
    async signInVal() {
      this.signInFormSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          this.pushSignIn();
        })
        .catch((err) => {
          console.log("err =>", err);
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
    validate(field) {
      this.signInFormSchema
        .validateAt(field, this.values)
        .then(() => {
          delete this.errors[field];
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    async pushSignIn() {
      try {
        this.$store.commit("load");
        const result = await this.$store.dispatch("pushSignIn", {
          email: this.values.email,
          password: this.values.password,
        });
        this.$store.commit("load");
        if (result.status !== 200) {
          const err = new Error(result.message);
          if (result.data) {
            const messageArray = result.data.map((data) => data.msg);
            err.data = messageArray;
          }
          throw err;
        } else {
          this.$store.commit("updateLogInState", true);
          this.$store.commit("updateModalType", "signin");
          this.$store.commit(
            "updateModalMessage",
            `Welcome Back, ${result.name}!`
          );
          this.$store.commit("updateModalStatus");
          this.$router.push("timer");
        }
      } catch (err) {
        this.$store.commit("load");
        if (err.data) {
          this.$store.commit("updateModalErrorData", err.data);
        }
        this.$store.commit("updateModalType", "error");
        this.$store.commit("updateModalMessage", err.message);
        this.$store.commit("updateModalStatus");
      }
    },
  },
  components: {
    BaseButton,
  },
};
</script>

<style scoped>
h1 {
  font-size: 6em;
}

label,
input {
  font-size: 3em;
  display: block;
  width: 100%;
}

button,
label,
input,
a {
  margin: 5px 0px;
}

span {
  margin-left: 10px;
}

a {
  text-decoration: none;
  color: inherit;
  font-size: 1.5em;
}

.container {
  width: 30%;
  margin: auto;
  /* display: flex; */
  text-align: left !important;
  /* overflow: visible;
  white-space: nowrap; */
}

.errorMessage {
  font-size: 1rem;
  list-style-type: none;
  color: #ff6961;
}

@media screen and (max-width: 1555px) {
  .container {
    width: 35%;
  }
  h1 {
    font-size: 5em;
  }
}

@media screen and (max-width: 1100px) {
  .container {
    width: 50%;
  }
}

@media screen and (max-width: 950px) {
  .container {
    width: 60%;
  }
  a {
    display: inline-block;
    width: 100%;
  }
  span {
    margin: 0;
  }
}

@media screen and (max-width: 775px) {
  .container {
    width: 80%;
  }
  a {
    font-size: 15px;
  }
  button {
    width: 100%;
  }
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 40px;
  }
}

@media screen and (max-width: 380px) {
  h1 {
    font-size: 32.5px;
  }
  label,
  input {
    font-size: 20px;
  }
  a {
    display: inline-block;
    width: 100%;
  }
  span {
    margin: 0;
  }
}
</style>