<template>
  <div id="app">
    <AppLayout />
    <Index />
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import Index from "@/views/index";
export default {
  name: "App",
  components: {
    AppLayout,
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
