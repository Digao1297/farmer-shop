<template>
  <div class="dashboard">
    <v-app-bar app flat color="white">
      <v-spacer />
      <v-btn text>
        {{ getLanguages.signout }}
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-earth</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.prevent="setLang('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="setLang('pt-br')">
            <v-list-item-title>Portuguese</v-list-item-title>
          </v-list-item>
          <v-list-item @click.prevent="setLang('es')">
            <v-list-item-title>Spanish</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer :mini-variant.sync="mini" permanent app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>{{
              getLanguages.logged_in
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link @click.prevent="setItem(1)">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ getLanguages.home }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click.prevent="setItem(2)">
          <v-list-item-icon>
            <v-icon>mdi-bookmark-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              getLanguages.type_product
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click.prevent="setItem(3)">
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ getLanguages.address }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <type-product v-if="item == 2" />
        <address-comp v-else-if="item == 3" />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "dashboard",
  data: () => ({
    item: 2
  }),
  components: {
    "type-product": () => import("./typeProduct"),
    "address-comp": () => import("./address")
  },
  methods: {
    ...mapActions({
      actionSetLanguage: "language/actionSetLanguage"
    }),
    setItem(value) {
      this.item = value;
    },
    setLang(lang) {
      this.actionSetLanguage(lang);
      this.$vuetify.lang.current = lang;
    }
  },
  computed: {
    ...mapGetters({
      getLanguages: "language/getLanguages"
    }),
    mini() {
      return this.$vuetify.breakpoint.mdAndDown;
    }
  },
  created() {
    console.log();
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100%;
}
</style>
