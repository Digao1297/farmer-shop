<template>
  <div class="dashboard">
    <v-app-bar app flat color="white">
      <v-spacer />
      <v-btn text>
        Sair
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer :mini-variant.sync="mini" permanent app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense v-model="item">
        <v-list-item
          v-for="(_item, index) in items"
          :key="_item.title"
          link
          @click.prevent="setItem(index)"
        >
          <v-list-item-icon>
            <v-icon>{{ _item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ _item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <type-product v-if="item == 1" />
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    item: 1,
    items: [
      { title: "Inicio", icon: "mdi-home" },
      { title: "Tipo produto", icon: "mdi-bookmark-multiple" }
    ]
  }),
  components: {
    "type-product": () => import("./typeProduct")
  },
  methods: {
    setItem(value) {
      this.item = value;
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
}
</style>
