<template>
  <div id="app">
    <AppLayout :isLogin="isLogin">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLogin: true,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
