<template>
<!-- Render of component in the view -->
  <div class="my-6">
    <Starships />
  </div>
</template>
<script>
// @ is an alias to /src
import Starships from "@/components/Starships.vue";
export default {
  name: "Starship",
  components: {
    Starships,
  },
};
</script>