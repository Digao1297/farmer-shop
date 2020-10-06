<template>
  <div class="dashboard">
    <v-main>
      <v-container>
        <transition name="fade" mode="out-in">
          home
        </transition>
      </v-container>
    </v-main>
    <v-footer app class="center-x footer-main" color="white">
      <p>
        Feito com
        <v-icon color="red" size="30">mdi-heart</v-icon>
      </p>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    radioButton: "/"
  }),
  methods: {},
  computed: {},
  created() {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
}
</style>
