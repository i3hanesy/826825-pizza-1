<template>
  <component :is="layout" :isLogin="isLogin">
    <slot />
  </component>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppLayout",

  computed: {
    ...mapState("Auth", {
          isLogin: "isLogin",
      }),

    layout() {
      const layout = this.$route.meta.layout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
