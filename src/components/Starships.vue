<template>
  <div >
    <!-- Show Starships -->
    <v-container>
      <v-col>
        <v-row>
          <v-col
            v-for="starship in starships"
            :key="starship.name"
            cols="12"
            sm="6"
            md="4"
          >
            >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="355">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="355px"
                >
                  <!-- Show more info -->
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        card-starship
                        transition-fast-in-fast-out
                        black
                        darken-2
                        v-card--reveal
                        white--text
                      "
                      style="height: 65%"
                    >
                      <p>Model: {{ starship.model }}</p>
                      <p>Manufacturer: {{ starship.manufacturer }}</p>
                      <p>Class: {{ starship.starship_class }}</p>
                      <p>Cost: {{ starship.cost_in_credits }}credits</p>
                      <p>Speed: {{ starship.max_atmosphering_speed }}Km/h</p>
                      <p>Hyperdrive: {{ starship.hyperdrive_rating }}</p>
                      <p>MGLT: {{ starship.MGLT }}</p>
                      <p>Length: {{ starship.length }}m</p>
                      <p>Cargo capacity: {{ starship.cargo_capacity }}metric tons</p>
                      <p>Mimimum crew: {{ starship.crew }}</p>
                      <p>Passengers: {{ starship.passengers }}</p>
                    </div>
                  </v-expand-transition>
                  <!--End show more info -->
                </v-img>
                <v-card-title>{{ starship.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="warning" plain @click=" detailElement(`${starship.url.replace(/[^0-9]/g, '')}`),(showDetail = true)">view more</v-btn>
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
                v-bind:src="`https://starwars-visualguide.com/assets/img/starships/${info.url.replace(/[^0-9]/g,'')}.jpg`"
                :alt="info.url"
              ></v-img>
            </v-avatar>
            <v-card-text>Model: {{ info.model }}</v-card-text>
            <v-card-text>Manufacturer: {{ info.manufacturer }}</v-card-text>
            <v-card-text>Class: {{ info.info_class }}</v-card-text>
            <v-card-text>Cost: {{ info.cost_in_credits }}credits</v-card-text>
            <v-card-text>Speed: {{ info.max_atmosphering_speed }}Km/h</v-card-text>
            <v-card-text>Hyperdrive: {{ info.hyperdrive_rating }}</v-card-text>
            <v-card-text>MGLT: {{ info.MGLT }}</v-card-text>
            <v-card-text>Length: {{ info.length }}m</v-card-text>
            <v-card-text>Cargo capacity: {{ info.cargo_capacity }}metric tons</v-card-text>
            <v-card-text>Mimimum crew: {{ info.crew }}</v-card-text>
            <v-card-text>Passengers: {{ info.passengers }}</v-card-text>
            <v-card-text>Consumables: {{ info.consumables }}</v-card-text>
            <v-card-text>Length: {{ info.length }}</v-card-text>
            <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">PILOTS</v-card-title>
            <br>
            <v-avatar color="orange" size="120" v-for="(img, index) in info.pilots" :key="index.epilots" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/pilots/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
            <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">FILMS</v-card-title>
            <br />
            <v-avatar color="orange" size="120" v-for="(img, index) in info.films" :key="index" >
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
    <!-- End Show Starships -->
  </div>
</template>
<script>
import axios from "axios"; //Import library for request GET to API
import api from "@/utils/api"; // Import url set API  
import number from "@/utils/numberPages"; // Import function of number pages
export default {
  name: "Starships",
  data: function () {
    return {
      showDetail: false, // Show dialog for more datails
      page: 1,//Current position page initial
      pages: 1,//number pages
      starships: [],// Elements stored of the API
      detail: [], //Elements stored of the API specifique detailed
    };
  },
  created() {
    this.getStarships();
  },
  methods: {
    getStarships() {
      const params = {
        page: this.page,
      };
      axios //Request to API with axios
        .get(`${api.url.starships}`, { params })
        .then((res) => {// Promise for extraction data
          this.starships = res.data.results;//Stored data in instances of Vue
          this.pages = number.numberPages(res.data.count);//Set number of pages for numbers elements in the request
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* The value (number) of the page in which its status is captured
     is received and it is passed as a parameter by calling the callback
    and it is passed as a parameter to the URL? {Page = n} */
    changePage(value) {
      this.page = value <= 0 || value > this.pages ? this.page : value;// Rank of pagination
      this.getStarships();// Callback for nextPagination
    },
    detailElement(id) {
      this.detail = [];
      axios //Request to API with axios
        .get(`${api.url.starships}${id}`)
        // Promise for extraction data
        .then((res) => {
          this.detail.push(res.data); //Stored data in instances of Vue
          console.log(res.data);
        });
    },
  },
};
</script>

<style lang="scss" scope>
*.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  display: table;
  position: absolute;
  width: 100%;
}
*.v-card--reveal p {
  margin: 0;
  padding: 0 0.1rem;
  display: table-cell;
  vertical-align: initial;
  font-size: 13px;
}
.card-starship {
  display: inline-grid;
}
.v-card__subtitle,
.v-card__text {
  padding: 1px;
}
</style>
