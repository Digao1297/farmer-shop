<template>
  <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
  methods: {
    ...mapActions({
      actionSetLanguage: "language/actionSetLanguage"
    })
  },
  created() {
    if (localStorage.getItem("lang") != "null") {
      this.actionSetLanguage(localStorage.getItem("lang"));
    } else {
      this.actionSetLanguage("pt-br");
    }
  }
};
</script>
