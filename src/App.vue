<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link class="route" to="/">Home</router-link> |
      <router-link class="route" to="/characters">Characters</router-link> |
      <router-link class="route" to="/planets">Planets</router-link> |
      <router-link class="route" to="/starships">Starships</router-link> |
      <router-link class="route" to="/vehicles">Vehicles</router-link> |
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Characters from "@/components/Characters.vue";
export default {
  name: "App",
  components: {
    Footer,
    Characters,
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
.route {
  color: aliceblue;
}
</style>
