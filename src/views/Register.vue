<template>
  <div class="register">
    <div class="container">
      <h1 class="my-4">Create an account</h1>
      <div class="card mx-auto" style="width: 280px">
        <div class="card-body">
          <form
            @submit.prevent="registerUser({ username, password, password2 })"
          >
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
            <InputField
              v-model="password2"
              type="password"
              placeholder="Confirm password"
              label="Password again"
              :error="getErrors.password2"
            />
            <button class="btn btn-primary">Sign up</button>
          </form>
          <p class="card-text mt-3">
            Already have an account? Log in
            <router-link to="/">here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapMutations, mapActions } from "vuex";
import InputField from "@/components/InputField.vue";

export default {
  name: "register",
  components: {
    InputField
  },
  data() {
    return {
      username: "",
      password: "",
      password2: ""
    };
  },
  computed: {
    ...mapGetters(["getErrors"])
  },
  methods: {
    ...mapMutations(["clearErrors"]),
    ...mapActions(["registerUser"])
  },
  beforeMount() {
    this.clearErrors();
  },
  mounted() {
    this.$refs.autofocus.$el.querySelector("input").focus();
  }
};
</script>
