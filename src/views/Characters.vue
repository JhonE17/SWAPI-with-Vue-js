<template>
  <div class="my-8">
    <Characters />
  </div>
</template>

<script>
// @ is an alias to /src
import Characters from "@/components/Characters.vue";

export default {
  name: "Character",
  components: {
    Characters,
  },
};
</script>
