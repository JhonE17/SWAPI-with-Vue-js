<template>
  <div class="row">
    <v-container>
      <v-col cols="12" xs="12" sm="12" xl="12" md="12" lg="12">
        <v-row>
          <v-col
            v-for="vehicle in vehicles"
            :key="vehicle.name"
            cols="12"
            xs="12"
            sm="12"
            xl="3"
            md="12"
            lg="3"
          >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="355">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="250px"
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
                </v-img>
                <v-card-title>{{ vehicle.name }}</v-card-title>
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
  name: "Vehicles",
  data: function () {
    return {
      page: 1,
      pages: 4,
      vehicles: [],
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
      axios
        .get(`${api.url.vehicles}`, { params })
        .then((res) => {
          this.vehicles = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(value) {
      this.page = value <= 0 || value > this.pages ? this.page : value; // Rango de paginacion
      this.getVehicles();
    },
  },
};
</script>
