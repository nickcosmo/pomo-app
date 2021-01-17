<template>
  <div class="container">
    <modal
      v-if="modalStatus"
      :data="errorArray"
      :type="modalType"
      nextRoute="timer"
      @close="closeModal()"
    >
      <h2>{{ modalMessage }}</h2>
    </modal>
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
          >Not a member? Signup instead!</router-link
        ></span
      >
    </form>
    <div class="errorMessage" v-if="Object.values(errors).length > 0">
      <ul>
        <li v-if="errors.email">{{ errors.email }}</li>
        <li v-if="errors.password">{{ errors.password }}</li>
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
    const signInFormSchema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });
    return {
      modalStatus: false,
      modalMessage: "",
      modalType: null,
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
        const result = await this.$store.dispatch("pushSignIn", {
          email: this.values.email,
          password: this.values.password,
        });
        if (result.status !== 200) {
          const err = new Error(result.message);
          if (result.data) {
            const messageArray = result.data.map((data) => data.msg);
            err.data = messageArray;
          }
          throw err;
        } else {
          this.modalMessage = `Hello, ${result.name}! Welcome Back!`;
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
    BaseButton, Modal
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