<template>
  <div>
    <h1>Signin here!</h1>
    <form action="">
      <div class="form-control">
        <label for="username">username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div class="form-control">
        <label for="password">password</label>
        <input type="password" id="password" name="password" />
      </div>
      <base-button>submit</base-button>
    </form>
  </div>
</template>

<script>
import BaseButton from './UI/BaseButton.vue';

export default {
    components: {
        BaseButton
    }
};
</script>

<style>
h1 {
    font-size: 60px;
}

label, input {
    font-size:30px;
}

button, input {
    margin: 5px 10px;
}
</style>