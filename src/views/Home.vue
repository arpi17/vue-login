<template>
  <div class="home">
    <div class="card" style="width: 240px">
      <div class="card-body">
        <form @submit.prevent="$emit">
          <InputField
            v-model="username"
            type="text"
            placeholder="Enter username"
            label="Username"
            ref="autofocus"
          />
          <InputField
            v-model="password"
            type="password"
            placeholder="Enter password"
            label="Password"
            error="Incorrect password"
          />
          <button class="btn btn-primary">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InputField from "@/components/InputField.vue";

export default {
  name: "home",
  components: {
    InputField
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    this.$refs.autofocus.$el.querySelector("input").focus();
  }
};
</script>
