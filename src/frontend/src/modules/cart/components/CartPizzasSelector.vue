<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CartPizzasSelector",

  computed: {
    ...mapState("Cart", {
          order: "order",
      }),

    layout() {
      if (this.order.currentPizzas.length === 0) {
        return () => import('@/modules/cart/components/CartNoCurrentPizzasSelector.vue');
      } else {
        return () => import('@/modules/cart/components/CartCurrentPizzasSelector.vue');
      };
    },
  },
};
</script>
