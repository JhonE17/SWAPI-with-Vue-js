<template>
  <div class="row">
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
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="355">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="355px"
                >
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="card-starship transition-fast-in-fast-out black darken-2 v-card--reveal white--text"
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
                </v-img>
                <v-card-title>{{ starship.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="warning" plain >view more</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
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
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/api";
export default {
  name: "Starships",
  data: function () {
    return {
      page: 1,
      pages: 4,
      starships: [],
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
      axios
        .get(`${api.url.starships}`, { params })
        .then((res) => {
          this.starships = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(value) {
      this.page = value <= 0 || value > this.pages ? this.page : value; // Rango de paginacion
      this.getStarships();
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