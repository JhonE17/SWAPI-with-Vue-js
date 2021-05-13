<template>
  <div class="navbar">
    <!-- <v-layout row wrap> -->
    <v-toolbar app light color="yellow darken-1" class="hidden-xs-only">
      <v-toolbar-title>STAR WARS</v-toolbar-title>

      <v-spacer></v-spacer>
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
    </v-toolbar>
    <v-toolbar app light color="yellow darken-1" class="hidden-sm-and-up">
      <v-toolbar-title>STAR WARS</v-toolbar-title>
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
    </v-toolbar>
    <v-container fluid>
      <v-slide-y-transition mode="out-in"> </v-slide-y-transition>
    </v-container>
    <!-- </v-layout> -->
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      dialog: false,
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
};
</script>
