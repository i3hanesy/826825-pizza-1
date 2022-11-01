<template>
  <div class="content__result">
    <p>Итого: {{ pizza.pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="pizza.checkedIngredients.length === 0 || pizza.name.length === 0"
       @click="addPizza(pizza)"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>

import {mapGetters, mapState, mapMutations } from "vuex";
import { ADD_CURRENT_PIZZA, UPDATE_PIZZA_PRICE, RESSET_PIZZA } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState("Builder", {
        pizza: "pizza",
    }),

    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
      }),

    ...mapGetters("Cart", {
        totalPrice: "totalPrice",
      }),  
  },

  methods: {
  
    addPizza(pizza) {
      this[ADD_CURRENT_PIZZA](pizza);
      this[UPDATE_PIZZA_PRICE]();
      this.totalPrice;
      this[RESSET_PIZZA]();
    },

    ...mapMutations("Cart", [ADD_CURRENT_PIZZA, UPDATE_PIZZA_PRICE]),  
    ...mapMutations("Builder", [RESSET_PIZZA]),  
    
  },

  
};
</script>

<style lang="scss" scoped></style>
