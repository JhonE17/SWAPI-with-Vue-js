<template>
  <div>
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
            <v-hover v-slot:="{ hover }">
              <v-card class="mx-auto" max-width="300">
                <v-img
                  v-bind:src="`https://starwars-visualguide.com/assets/img/characters/${personage.url.replace(
                    /[^0-9]/g,
                    ''
                  )}.jpg`"
                  height="400"
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
                        white--text"
                      style="height: 30%"
                    >
                      <p>Heigth: {{ personage.height }}</p>
                      <p>Birth Year: {{ personage.birth_year }}</p>
                      <p>Hair Color: {{ personage.hair_color }}</p>
                      <p>Eye Color: {{ personage.eye_color }}</p>
                      <p>Mass: {{ personage.mass }}</p>
                      <p>Gender: {{ personage.gender }}</p>
                    </div>
                  </v-expand-transition>
                </v-img>
                <!--End show more info -->
                <v-card-title>{{ personage.name }}</v-card-title>
                <v-card-actions>
                  <v-btn
                    color="warning"
                    plain
                    @click=" detailElement(`${personage.url.replace(/[^0-9]/g, '')}`),(showDetail = true)">view more</v-btn>
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
                v-bind:src="`https://starwars-visualguide.com/assets/img/characters/${info.url.replace(/[^0-9]/g,'')}.jpg`"
                :alt="info.url"
              ></v-img>
            </v-avatar>
            <v-card-text>Heigth: {{ info.height }}</v-card-text>
            <v-card-text>Birth Year: {{ info.birth_year }}</v-card-text>
            <v-card-text>Hair Color: {{ info.hair_color }}</v-card-text>
            <v-card-text>Eye Color: {{ info.eye_color }}</v-card-text>
            <v-card-text>Mass: {{ info.mass }}</v-card-text>
            <v-card-text>Gender: {{ info.gender }}</v-card-text>
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
            <v-card-title class="headline yellow darken-1">SPECIES</v-card-title>
            <br>
            <v-avatar color="orange" size="120" v-for="(img, index) in info.species" :key="index.especies" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/species/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
            <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">STARSHIPS</v-card-title>
            <br>
            <v-avatar color="orange" size="120" v-for="(img, index) in info.starships" :key="index.starships" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/starships/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
             <v-divider></v-divider>
            <v-card-title class="headline yellow darken-1">VEHICLES</v-card-title>
            <br>
            <v-avatar color="orange" size="120" v-for="(img, index) in info.vehicles" :key="index.vehicles" >
              <v-img
                v-bind:src="`https://starwars-visualguide.com/assets/img/vehicles/${img.replace(/[^0-9]/g,'')}.jpg`"
                :alt="img"
              ></v-img>
            </v-avatar>
            <br>
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
  </div>
</template>

<script>
import axios from "axios"; //Import library for request GET to API
import api from "@/utils/api"; // Import url set API
import number from "@/utils/numberPages"; // Import function of number pages
export default {
  name: "Characters",
  data: function () {
    return {
      showDetail: false, // Show dialog for more datails
      page: 1, //Current position page initial
      pages: 1, //number pages
      characters: [], // Elements stored of the API
      detail: [], //Elements stored of the API specifique detailed
    };
  },
  created() {
    this.getPeople();
  },
  methods: {
    // Get all characteres of start wars
    getPeople() { 
      const params = {
        page: this.page,
      };
      axios //Request to API with axios
        .get(`${api.url.people}`, { params })
        // Promise for extraction data
        .then((res) => {
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
    detailElement(id) {
      this.detail = [];
      axios //Request to API with axios
        .get(`${api.url.people}${id}`)
        // Promise for extraction data
        .then((res) => {
          this.detail.push(res.data); //Stored data in instances of Vue
          console.log(res.data);
        });
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
.v-card__subtitle,
.v-card__text {
  padding: 1px;
}
</style>
