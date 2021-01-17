<template>
  <div class="container">
    <modal
      v-if="modalStatus"
      :data="errorArray"
      :type="modalType"
      nextRoute="signin"
      @close="closeModal()"
    >
      <h2>{{ modalMessage }}</h2>
    </modal>
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
import Modal from "./UI/Modal.vue";
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
      modalStatus: false,
      modalMessage: "",
      modalType: null,
      errorArray: [],
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
        const resultJSON = await result.json();
        if (result.status !== 200) {
          const err = new Error(resultJSON.message);
          if (resultJSON.data) {
            const messageArray = resultJSON.data.map((data) => data.msg);
            err.data = messageArray;
          }
          throw err;
        } else {
          this.modalMessage = `Thanks for signing up, ${resultJSON.name}! Your account was created successfully!`;
          this.modalType = "auth";
          this.modalStatus = true;
        }
      } catch (err) {
        this.modalMessage = err.message;
        this.errorArray = err.data;
        this.modalType = "error";
        this.modalStatus = true;
      }
    },
    closeModal(value) {
      this.modalStatus = value;
    },
  },
  components: {
    BaseButton,
    Modal,
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
  color: #ff6961;
}
</style>