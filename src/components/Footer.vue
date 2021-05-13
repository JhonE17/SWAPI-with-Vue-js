<template>
  <v-footer>
    <div class="footer">
      <div class="copyright">
        DESIGNED AND DEVELOPED BY
        <a href="">JHON E. PALACIOS</a> &copy;2021
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss">
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
