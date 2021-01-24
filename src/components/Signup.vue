<template>
  <div class="container">
    <h1>Sign Up Here!</h1>
    <form @submit.prevent="signUpVal()">
      <div class="form-control">
        <label for="name">name:</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="values.name"
          @blur="validate('name')"
          :style="[
            errors.name
              ? { 'border-color': '#ff6961', 'border-width': '2px' }
              : {},
          ]"
        />
      </div>
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
      <div class="form-control">
        <label for="password">verify password:</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="values.verifyPassword"
          @blur="validate('verifyPassword')"
          :style="[
            errors.verifyPassword
              ? { 'border-color': '#ff6961', 'border-width': '2px' }
              : {},
          ]"
        />
      </div>
      <base-button type="submit">submit</base-button>
      <span
        ><router-link to="/signin"
          >Already a member? Signin instead!</router-link
        ></span
      >
    </form>
    <div class="errorMessage" v-if="Object.values(errors).length > 0">
      <ul>
        <li v-if="errors.name">{{ errors.name }}</li>
        <li v-if="errors.email">{{ errors.email }}</li>
        <li v-if="errors.password">{{ errors.password }}</li>
        <li v-if="errors.verifyPassword">{{ errors.verifyPassword }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseButton from "./UI/BaseButton.vue";
import * as yup from "yup";

export default {
  data() {
    const signUpFormSchema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      verifyPassword: yup
        .string()
        .required()
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    });
    return {
      values: {
        name: "",
        email: "",
        password: "",
        verifyPassword: "",
      },
      errors: {},
      signUpFormSchema,
    };
  },
  methods: {
    signUpVal() {
      this.signUpFormSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          return this.pushSignUp();
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
    validate(field) {
      this.signUpFormSchema
        .validateAt(field, this.values)
        .then(() => {
          delete this.errors[field];
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    async pushSignUp() {
      try {
        this.$store.commit("load");
        const result = await fetch("http://localhost:3000/sign-up", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.values.name,
            email: this.values.email,
            password: this.values.password,
            verifyPassword: this.values.verifyPassword,
          }),
        });
        this.$store.commit("load");
        const resultJSON = await result.json();
        if (result.status !== 200) {
          const err = new Error(resultJSON.message);
          if (resultJSON.data) {
            const messageArray = resultJSON.data.map((data) => data.msg);
            err.data = messageArray;
          }
          throw err;
        } else {
          this.$store.commit("updateLogInState", true);
          this.$store.commit("updateModalType", "signup");
          this.$store.commit(
            "updateModalMessage",
            `Thanks for signing up, ${resultJSON.name}! Now you can track your progress in the dashboard!`
          );
          this.$store.commit("updateModalStatus");
          this.$store.dispatch("setLogOut");
          this.$router.push("timer");
        }
      } catch (err) {
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
}

input {
  width: 100%;
}

button,
input {
  margin: 10px 0px;
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

.errorMessage {
  font-size: 1rem;
  list-style-type: none;
  color: #ff6961;
}

@media screen and (max-width: 1555px) {
  .container {
    width: 40%;
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
}

@media screen and (max-width: 775px) {
  .container {
    width: 80%;
  }
}

@media screen and (max-width: 380px) {
  h1 {
    font-size: 4em;
  }
  label,
  input {
    font-size: 2em;
  }
  a {
    display: inline-block;
    width: 100%;
    font-size: 1.25em;
  }
  span {
    margin: 0;
  }
}
</style>