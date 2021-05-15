<template>
  <div>
     <!-- Show Planets -->
    <v-container >
      <v-col>
        <v-row>
          <v-col
            v-for="planet in planets"
            :key="planet.name"
            cols="12"
            sm="6"
            md="4"
          >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" width="350">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(
                    /[^0-9]/g,'')}.jpg`"
                  height="350px"
                >
                <!-- Show more info -->
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="card-planets transition-fast-in-fast-out black darken-2 v-card--reveal white--text"
                      style="height: 55%"
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
                  <!--End show more info -->
                </v-img>
                <v-card-title >{{ planet.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="warning" plain @click="
                      detailElement(`${planet.url.replace(/^http:\/\//i, 'https://')}`),(showDetail = true)">view more</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
        <!-- Pagination  -->
      <div>
        <div class="text-center">
          <v-pagination
            circle
            v-model="page"
            @input="changePage"
            :length="pages"
          ></v-pagination>
        </div>
      </div>
      <!-- Show details -->
            <v-dialog
        v-model="showDetail"
        persistent
        transition="dialog-bottom-transition"
      >
        <v-card>
          <div align="center" v-for="(info, index) in detail" :key="index">
            <v-card-title class="headline yellow darken-1">{{
              info.name
            }}</v-card-title>
            <v-avatar color="orange" size="120">
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/planets/${info.url.replace(/[^0-9]/g,'')}.jpg`"
                :alt="info.url"
              ></v-img>
            </v-avatar>
            <v-card-text>Population: {{ info.population  }}</v-card-text>
            <v-card-text>Rotation period: {{ info.rotation_period  }}</v-card-text>
            <v-card-text>Orbital period: {{ info.orbital_period  }}</v-card-text>
            <v-card-text>Diameter: {{ info.diameter  }}</v-card-text>
            <v-card-text>Gravity: {{ info.gravity  }}</v-card-text>
            <v-card-text>Terrain: {{ info.terrain  }}</v-card-text>
            <v-card-text>Surface water: {{ info.surface_water  }}</v-card-text>
            <v-card-text>Climate: {{ info.climate  }}</v-card-text>
            <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">RESIDENTS</v-card-title>
            <br />
            <v-avatar color="orange" size="120" v-for="(img, index) in info.residents" :key="index" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/residents/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
            <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">FILMS</v-card-title>
            <br>
            <v-avatar color="orange" size="120" v-for="(img, index) in info.films" :key="index.efilms" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/films/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
            <v-divider></v-divider>
          </div>
          <v-card-actions>
            <v-btn color="warning" text @click="showDetail = !showDetail">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End show details -->
      <!-- End Pagination -->
    </v-container>
    <!-- End Show Planets -->
  </div>
</template>
<script>
import axios from "axios"; //Import library for request GET to API
import api from "@/utils/api"; // Import url set API  
import number from "@/utils/numberPages"; // Import function of number pages
export default {
  name: "Planets",
  data: function () {
    return {
      showDetail: false, // Show dialog for more datails
      page: 1,//Current position page initial
      pages: 1,//number pages
      planets: [],// Elements stored of the API
      detail:[] //Elements stored of the API specifique detailed
    };
  },
  created() {
    this.getPlanets();
  },
  methods: {
    // Get all planets of start wars
    getPlanets() {
      const params = {
        page: this.page,
      };
      axios //Request to API with axios
        .get(`${api.url.planets}`, { params })
        .then((res) => {// Promise for extraction data
          this.planets = res.data.results;//Stored data in instances of Vue
          this.pages = number.numberPages(res.data.count)//Set number of pages for numbers elements in the request
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* The value (number) of the page in which its status is captured
     is received and it is passed as a parameter by calling the callback
    and it is passed as a parameter to the URL? {Page = n} */
    changePage(value) {
      this.page = value <= 0 || value > this.pages ? this.page : value; // Rank of pagination
      this.getPlanets();// Callback for nextPagination
    },
    detailElement(id) {
      this.detail = [];
      axios //Request to API with axios
        .get(`${id}`)
        // Promise for extraction data
        .then((res) => {
          this.detail.push(res.data); //Stored data in instances of Vue
        });
    },
  },
};
</script>
<style lang="css" scope>
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
.card-planets {
  display: inline-grid;
}
.v-card__subtitle,
.v-card__text {
  padding: 1px;
}
</style>
