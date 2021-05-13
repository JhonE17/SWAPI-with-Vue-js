<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text  text-center networks">
        <v-btn v-for="i in info" :key="i.icon" :href="i.url" class="mx-4" dark icon >
          <v-icon size="24px">
            {{ i.icon }}
          </v-icon>
        </v-btn>
        {{ new Date().getFullYear() }} &copy;<strong>Jhon E Palacios</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',

  data: () => ({
    info: [
      { icon: "mdi-github", url: "https://github.com/JhonE17" },
      { icon: "mdi-twitter", url: "https://twitter.com/_JhonE17" },
      {
        icon: "mdi-linkedin",
        url: "https://www.linkedin.com/in/jhon-e-palacios/",
      },
    ],
  }),
};
</script>
<style scoped>
.networks {
  justify-content: flex-end;
  align-content: center;
}
</style>