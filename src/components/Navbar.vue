<template>
  <div class="navbar">
    <v-app-bar fixed app light color="yellow darken-1" class="hidden-xs-only">
      <v-toolbar-title class="hidden-sm-and-down">STAR WARS</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="hidden-xs-only">
        <input
          v-bind:value="searchText"
          v-on:input="searchText = $event.target.value"
          type="text"
          placeholder="type..."
        /><v-btn x-small redondeado tile icon @click="(search(), searchText != '' || field.lenght <= 0 ? show = true : show = false)"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
      </div>
      <v-toolbar-items>
        <v-btn
          v-for="item in nav"
          :key="item.icon"
          :to="item.link"
          :title="item.title"
          plain
          >{{ item.text }}</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>
    <v-app-bar elevate-on-scroll app light color="yellow darken-1" class="hidden-sm-and-up">
     <div class="hidden-print-only">
        <input
          v-bind:value="searchText"
          v-on:keyup.enter="searchText = $event.target.value"
          type="text"
          placeholder="type..."
        /><v-btn x-small redondeado tile icon @click="(search(), searchText != '' || field.lenght <= 0 ? show = true : show = false)"
          ><v-icon>mdi-magnify</v-icon></v-btn
        >
      </div>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        light
        @click.native="dialog = true"
      ></v-app-bar-nav-icon>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        group
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar plain light color="yellow darken-2">
            <v-toolbar-title>STAR WARS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click.native="dialog = false">
              <v-icon light color="black darken-1"> close </v-icon>
            </v-app-bar-nav-icon>
          </v-toolbar>

          <v-list>
            <v-list-item
              v-for="(item, index) in nav"
              :key="index"
              :to="item.link"
              @click.native="dialog = false"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title :title="item.title">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-app-bar>
      <v-slide-y-transition mode="out-in"> </v-slide-y-transition>
    <v-container fluid grid-list-md>
      <!-- Show Search -->
      <v-dialog v-model="show" persistent fullscreen
      hide-overlay
      transition="dialog-bottom-transition" >
        <v-card>
          <div v-for="(search, index) in field"
          :key="index">
          <v-card-title>{{search.name}}</v-card-title>
          
            <v-card-text><a>{{search.url}}</a></v-card-text>
          
          <v-divider></v-divider>
          </div>
          <v-card-actions >
            <v-btn @click="show = false">
              Close
              </v-btn> 
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- End Show Search -->
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import api from "@/utils/api";
export default {
  name: "Navbar",
  data() {
    return {
      field: [],
      dialog: false,
      show:false,
      searchText: "",
      message: {name:"No se encontraron elementos"},
      nav: [
        {
          icon: "person",
          text: "Characters",
          title: "Characters",
          link: "/",
          active: true,
        },
        {
          icon: "public",
          text: "Planets",
          title: "Planets",
          link: "/planets",
          active: false,
        },
        {
          icon: "flight",
          text: "Starships",
          title: "Starships",
          link: "/starships",
          active: false,
        },
        {
          icon: "motorcycle",
          text: "Vehicles",
          title: "Vehicles",
          link: "/vehicles",
          active: false,
        },
      ],
    };
  },
  methods: {
    getPeople(name) {
      const params = {
        search: name,
      };
      this.field = [];
      axios.get(`${api.url.people}`, { params }).then((res) => {
        res.data.results.map((characters) => {
          this.field.push(characters);
        });
      });
    },
    getPlanets(name) {
      const params = {
        search: name,
      };
      this.field = [];
      axios.get(`${api.url.planets}`, { params }).then((res) => {
        res.data.results.map((characters) => {
          this.field.push(characters);
        });
      });
    },
    getStarships(name) {
      const params = {
        search: name,
      };
      this.field = [];
      axios.get(`${api.url.starships}`, { params }).then((res) => {
        res.data.results.map((characters) => {
          this.field.push(characters);
        });
      });
    },
    getVehicle(name) {
      const params = {
        search: name,
      };
      this.field = [];
      axios.get(`${api.url.vehicles}`, { params }).then((res) => {
        res.data.results.map((characters) => {
          this.field.push(characters);
        });
      });
    },

    search() {
      let textField = this.searchText;
      if (textField != "") {
        this.getPeople(textField);
        this.getPlanets(textField);
        this.getStarships(textField);
        this.getVehicle(textField);
         if(this.field.length <= 1 ){
           this.field.push(this.message);
      }
      }
    },
  },
};
</script>
<style lang="scss" scop>
input {
  background-color: #ffff !important;
  border-block-color: #ffff !important;
  border-radius: 10px !important;
  padding: 5px;
  outline: none !important;
}
input:focus {
  font-size: 300 #0000 solid !important;
}
</style>
