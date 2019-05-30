<template>
  <div class="dashboard">
    <div class="container">
      <h1 class="my-4">Welcome {{getCurrentUser.user}}!</h1>
      <button class="btn btn-primary">Sign out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["getCurrentUser"])
  }
};
</script>
