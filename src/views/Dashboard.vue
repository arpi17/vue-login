<template>
  <div class="dashboard">
    <div class="container">
      <h1 class="my-4">Welcome {{getCurrentUser.user}}!</h1>
      <button class="btn btn-primary" @click="logoutUser">Sign out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["getCurrentUser"])
  },
  methods: {
    ...mapActions(["logoutUser"])
  }
};
</script>
