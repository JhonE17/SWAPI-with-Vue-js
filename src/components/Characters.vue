<template>
  <div class="row">
    <!-- Show Characters -->
    <v-container>
      <v-col>
        <v-row>
          <v-col
            v-for="personage in characters"
            :key="personage.name"
            cols="12"
            sm="6"
            md="4"
          >
            <v-hover v-slot="{ hover }">
              <v-card class="mx-auto" max-width="300">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/characters/${personage.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="400"
                  onerror="this.v-bin:src=../assets/Tatooine.jpg"
                >
                  <!-- Show more info -->
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        card-character
                        transition-fast-in-fast-out
                        black
                        darken-2
                        v-card--reveal
                        white--text
                      "
                      style="height: 100%"
                    >
                      <p>Heigth: {{ personage.height }}</p>
                      <p>Birth Year: {{ personage.birth_year }}</p>
                      <p>Hair Color: {{ personage.hair_color }}</p>
                      <p>Eye Color: {{ personage.eye_color }}</p>
                      <p>Mass: {{ personage.mass }}</p>
                      <p>Gender: {{ personage.gender }}</p>
                    </div>
                  </v-expand-transition>
                  <!--End show more info -->
                </v-img>
                <v-card-title>{{ personage.name }}</v-card-title>
                <v-card-actions>
                  <v-btn color="warning" plain to="/details">view more</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
      <!-- End Show Characters -->
      <br />
      <!-- Pagination  -->
      <div class="center">
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
  </div>
</template>

<script>
import axios from "axios"; //Import library for request GET to API
import api from "@/utils/api"; // Import url set API
import number from "@/utils/numberPages"; // Import function of number pages
// import details from '@/view/DetailCharacter.vue'
export default {
  name: "Characters",
  // components:{details},
  data: function () {
    return {
      page: 1, //Current position page initial
      pages: 1, //number pages
      characters: [], // Elements stored of the API
      dialog: false,
    };
  },
  created() {
    this.getPeople();
  },
  methods: {
    getPeople() {
      const params = {
        page: this.page,
      };
      axios //Request to API with axios
        .get(`${api.url.people}`, { params })
        .then((res) => {
          // Promise for extraction data
          this.characters = res.data.results; //Stored data in instances of Vue
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
      this.getPeople(); // Callback for nextPagination
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  padding: 0 0.1rem;
  display: table-cell;
  vertical-align: initial;
  font-size: 13px;
}
.card-character {
  display: inline-grid;
}
</style>
