<template>
  <div class="row">
    <!-- Show Vehicles -->
    <v-container>
      <v-col>
        <v-row>
          <v-col v-for="vehicle in vehicles" :key="vehicle.name" grid-list-md>
            >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="400">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="300px"
                >
                  <!-- Show more info -->
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        card-vehicles
                        transition-fast-in-fast-out
                        black
                        darken-2
                        v-card--reveal
                        white--text
                      "
                      style="height: 100%"
                    >
                      <p>Model: {{ vehicle.model }}</p>
                      <p>Manufacturer: {{ vehicle.manufacturer }}</p>
                      <p>Class {{ vehicle.vehicle_class }}</p>
                      <p>Cost: {{ vehicle.cost_in_credits }}</p>
                      <p>Speed: {{ vehicle.max_atmosphering_speed }}Km/h</p>
                      <p>Length: {{ vehicle.length }}m</p>
                      <p>Cargo capacity {{ vehicle.cargo_capacity }}</p>
                      <p>Minium crew: {{ vehicle.crew }}</p>
                      <p>Passengers: {{ vehicle.passengers }}</p>
                    </div>
                  </v-expand-transition>
                  <!--End show more info -->
                </v-img>
                <v-card-title>{{ vehicle.name }}</v-card-title>
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
    <!-- End Show Vehicles -->
  </div>
</template>
<script>
import axios from "axios"; //Import library for request GET to API
import api from "@/utils/api"; // Import url set API
import number from "@/utils/numberPages"; // Import function of number pages
export default {
  name: "Vehicles",
  data: function () {
    return {
      page: 1, //Current position page initial
      pages: 1, //number pages
      vehicles: [], // Elements stored of the API
    };
  },
  async created() {
    this.getVehicles();
  },
  methods: {
    getVehicles() {
      const params = {
        page: this.page,
      };
      axios //Request to API with axios
        .get(`${api.url.vehicles}`, { params })
        .then((res) => {
          // Promise for extraction data
          this.vehicles = res.data.results; //Stored data in instances of Vue
          this.pages = number.numberPages(res.data.count); //Set number of pages for numbers elements in the request
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
      this.getVehicles(); // Callback for nextPagination
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
.card-vehicles {
  display: inline-grid;
}
</style>
