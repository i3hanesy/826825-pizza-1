<template>
  <component :is="layout" :isLogin="isLogin">
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppLayout",
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
