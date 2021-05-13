<template>
<!-- Render of component in the view -->
  <div class="my-6">
    <Planets />
  </div>
</template>
<script>
// @ is an alias to /src
import Planets from "@/components/Planets.vue";
export default {
  name: "Planet",
  components: {
    Planets,
  },
};
</script>
