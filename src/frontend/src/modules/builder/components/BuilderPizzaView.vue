<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        :value = pizza.name
        @input="getPizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop 
        @drop="drop($event)">
        <div :class="`pizza pizza--foundation--${pizza.doughClass}-${pizza.souceClass}`">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in pizza.checkedIngredients"
              :key="ingredient.id"
              class="pizza__filling"
              :class="`pizza__filling--${getNameById(
                fillingClassById,
                ingredient.id
              )} pizza__filling--${getIngredientCountClass(ingredient.count)}`"
            ></div>
          </div>
        </div>
      </AppDrop>
    </div>

    <BuilderPriceCounter
    
    />
  </div>
</template>

<script>
import { fillingClassById } from "@/common/helpers.js";
import AppDrop from "@/common/components/AppDrop.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

import { mapState, mapMutations, mapGetters } from "vuex";
import { ADD_INGREDIENT, SET_PIZZA_NAME} from "@/store/mutations-types";
import { findByID } from "@/common/helpers.js";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
  data() {
    return {
      fillingClassById,
    };
  },

  computed: {
    ...mapState("Builder", {
        pizza: "pizza",
    }),

    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
      }),
  },

  methods: {
    getNameById(map, id) {
      return map[id];
    },

    drop(ingredient) {
      const currentIngredient = findByID(this.pizza.checkedIngredients, ingredient.id);
    
      let count = currentIngredient ? currentIngredient.count : ingredient.count;
      this[ADD_INGREDIENT]({ 
        
        ingredient: ingredient,
        count: count + 1,
      });
      this.pizzaPrice;
    },

    getPizzaName(value) {
      this[SET_PIZZA_NAME]({ value });
    },

    ...mapMutations("Builder", [ADD_INGREDIENT, SET_PIZZA_NAME]),

    getIngredientCountClass(count) {
      let countClass = "";
      switch (count) {
        case 2:
          countClass = "second";
          break;
        case 3:
          countClass = "third";
          break;
      }
      return countClass;
    },
    
  },
};
</script>

<style lang="scss" scoped></style>
