<template>
  <v-app class="main">
    <v-main>
      <Navbar />
    </v-main>

    <!-- <v-app-bar app color="primary" dark>
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

      <router-link withe to="/">Characters</router-link> |
      <router-link withe to="/planets">Planets</router-link> |
      <router-link withe to="/starships">Starships</router-link> |
      <router-link withe to="/vehicles">Vehicles</router-link> | -->
    <!-- </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
    <!-- <v-sapacer></v-sapacer> -->
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import Characters from "@/components/Characters.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app {
  background-image: url("https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg");
}
.v-application .justify-center {
  justify-content: center !important;
}
.boton {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 2px 2px 0px rgba(0, 0, 0, 0),
    0px 1px 5px 0px rgba(0, 0, 0, 0);
  background-color: #3f51b5;
}
/* .card-general{
  display: inline-grid;
} */
</style>
