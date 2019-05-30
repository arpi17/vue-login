<template>
  <div class="login">
    <div class="container">
      <h1 class="my-4">Sign in</h1>
      <div class="card mx-auto" style="width: 280px">
        <div class="card-body">
          <form @submit.prevent="loginUser({ username, password })">
            <InputField
              v-model="username"
              type="text"
              placeholder="Enter username"
              label="Username"
              :error="getErrors.username"
              ref="autofocus"
            />
            <InputField
              v-model="password"
              type="password"
              placeholder="Enter password"
              label="Password"
              :error="getErrors.password"
            />
            <button class="btn btn-primary">Sign in</button>
          </form>
          <p class="card-text mt-3">
            Not a member yet? Register
            <router-link to="/register">here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import InputField from "@/components/InputField.vue";

export default {
  name: "login",
  components: {
    InputField
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["getErrors"])
  },
  methods: {
    ...mapActions(["loginUser"])
  },
  mounted() {
    this.$refs.autofocus.$el.querySelector("input").focus();
  }
};
</script>
