<template>
  <v-footer>
    	<div class='footer'>
    		<div class='copyright'>
    			DESIGNED AND DEVELOPED BY <a href="Jhon E. Palacios ">TIM SARVEY</a> &copy;2021
    		</div>
    		<!-- <div class='find-me'>
    			<span class='follow'>FOLLOW ME:</span>
    			<a href="https://www.linkedin.com/in/timsarvey"><i class="mdi mdi-linkedin-box"></i> LinkedIn</a>
    			<a href="https://github.com/tbone849"><i class="mdi mdi-github-box"></i> GitHub</a>
    		</div>
    		<div class='disclaimer'>
    			Star Wars and all associated names and/or images are copyright Lucasfilm Ltd. Images were freely collected from <a href='http://starwars.wikia.com/wiki/Main_Page'>Wookiepedia</a>.
    		</div> -->
    	</div>
    </v-footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    // iconsFooter() {
    //   return this.$store.state.iconsFooter;
    // },
  },
};
</script>

<style lang="scss">
.footer {
  // background-color: var(--c-pri-darker) !important;
  text-align: center;
   min-height: 30px;
  background-color: #fffbfb;
  background-image: -moz-linear-gradient(top, #191919, #000000);
  background-image: -o-linear-gradient(top, #191919, #000000);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #191919), color-stop(1, #000000));
  background-image: -webkit-linear-gradient(#191919, #000000);
  background-image: linear-gradient(top, #191919, #000000);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#191919', endColorStr='#000000');
  border-top: 1px solid rgba(50, 50, 50, 0.3);
  width: 100%;
  /*position: relative;
  clear: both;             
  margin-top: 0px;            ELIMINADO
  padding-top: 0px;
  overflow: visible;*/
  // position: fixed;
  bottom: 0;              /* NUEVO */
}

.copyright {
  font-family: var(--f-secondary);
  font-size: var(--fs-small);
  font-weight: var(--regular);
  color: var(--c-acc-ligther);
}

.networks {
  justify-content: flex-end;
  align-content: center;

  @media only screen and (min-width: 1024px) {
    justify-content: flex-start;
  }

  @media only screen and (min-width: 728px) {
    justify-content: flex-start;
  }
}

.icons {
  color: var(--c-fou-lighter) !important;

  &:hover {
    color: var(--c-fou-darker) !important;
  }
}
</style>
