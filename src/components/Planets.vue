<template>
  <div class="row">
    <v-container>
      <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
        <v-row>
          <v-col
            v-for="planet in planets"
            :key="planet.name"
            cols="12"
            xs="12"
            sm="12"
            xl="3"
            md="12"
            lg="3"
          >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="300px"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        d-flex
                        transition-fast-in-fast-out
                        black
                        darken-2
                        v-card--reveal
                        white--text
                      "
                      style="height: 100%"
                    >
                      <p>Population: {{ planet.population }}</p>
                      <p>Rotation period: {{ planet.rotation_period }}</p>
                      <p>Orbital period: {{ planet.orbital_period }}</p>
                      <p>Diameter: {{ planet.diameter }}</p>
                      <p>Gravity: {{ planet.gravity }}</p>
                      <p>Terrain: {{ planet.terrain }}</p>
                      <p>Surface water: {{ planet.surface_water }}</p>
                      <p>Climate: {{ planet.climate }}</p>
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-title>{{ planet.name }}</v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
        <div>
          <div class="text-center">
            <v-pagination
              v-model="page"
              @input="changePage"
              :length="pages"
            ></v-pagination>
          </div>
        </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/api";
export default {
  name: "Planets",
  data: function () {
    return {
      page: 1,
      pages: 6,
      planets: [],
    };
  },
  created() {
    this.getPlanets();
  },
  methods: {
    getPlanets() {
      const params = {
        page: this.page,
      };
      axios
        .get(`${api.url.planets}`, { params })
        .then((res) => {
          this.planets = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(value) {
      this.page = value <= 0 || value > this.pages ? this.page : value; // Rango de paginacion
      this.getPlanets();
    },
  },
};
</script>
<style lang="css">
/* *p {
 font-size: 200px; 
} */
.center {
  align-items: center;
  padding-block-end: initial;
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  display: table;
  position: absolute;
  width: 100%;
}
.v-card--reveal p {
  margin: 0;
  padding: 0 0.8rem;
  display: table-column;
  vertical-align: initial;
}
</style>
