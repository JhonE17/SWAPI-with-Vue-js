<template>
  <!-- Pege all render -->
  <v-app class="main">
    <!-- Navigator -->
    <Navbar />
    <!-- End Navigator -->
    <v-main>
      <!-- Body of Page (All views) -->
      <router-view />
      <!-- End of Page -->
    </v-main>
    <!-- Footer information contact -->
    <Footer />
    <!-- End Footer -->
  </v-app>
</template>
<script>
import Navbar from "@/components/Navbar.vue"; // Import navigator for render all views
import Footer from "@/components/Footer.vue"; // import Footer for render all views
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

</style>
