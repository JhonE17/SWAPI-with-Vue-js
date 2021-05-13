<template>
<!-- Render of component in the view -->
  <div class="my-6">
    <Vehicles />
  </div>
</template>
<script>
// @ is an alias to /src
import Vehicles from "@/components/Vehicles.vue";
export default {
  name: "Vehicle",
  components: {
    Vehicles,
  },
};
</script>