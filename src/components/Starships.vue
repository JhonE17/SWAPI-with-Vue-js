<template>
  <div class="row">
    <!-- Show Starships -->
    <v-container>
      <v-col>
        <v-row>
          <v-col
            v-for="starship in starships"
            :key="starship.name"
            grid-list-md
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
                      style="height: 100%"
                    >
                      <p>Model: {{ starship.model }}</p>
                      <p>Manufacturer: {{ starship.manufacturer }}</p>
                      <p>Class: {{ starship.starship_class }}</p>
                      <p>Cost: {{ starship.cost_in_credits }}credits</p>
                      <p>Speed: {{ starship.max_atmosphering_speed }}Km/h</p>
                      <p>Hyperdrive: {{ starship.hyperdrive_rating }}</p>
                      <p>MGLT: {{ starship.MGLT }}</p>
                      <p>Length: {{ starship.length }}m</p>
                      <p>
                        Cargo capacity: {{ starship.cargo_capacity }}metric tons
                      </p>
                      <p>Mimimum crew: {{ starship.crew }}</p>
                      <p>Passengers: {{ starship.passengers }}</p>
                    </div>
                  </v-expand-transition>
                  <!--End show more info -->
                </v-img>
                <v-card-title>{{ starship.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="warning" plain>view more</v-btn>
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
      page: 1,//Current position page initial
      pages: 1,//number pages
      starships: [],// Elements stored of the API
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
  },
};
</script>

<style lang="scss">
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
</style>
