<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>
      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
            name="sauce"
            :isChecked="sauce.id === pizza.souceID"
            :value="`${getNameById(sauceValueById, sauce.id)}`"
            @radioButtonAction="radioButtonAction($event.value, sauce)"
          >
            <span>{{ sauce.name }}</span>
          </RadioButton>
        </div>
        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :draggable="getIngredientCount(ingredient.id) !== MAX_INGREDIENT_COUNT"
              >
                <span
                  class="filling"
                  :style="`--my-src: url(${ingredient.image})`"
                >
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :classCounter="CLASS_INGREDIENT_COUNTER"
                :count="getIngredientCount(ingredient.id)"
                :minCount ="MIN_COUNT"
                :maxCount ="MAX_INGREDIENT_COUNT"
                @changeCount="changeCount($event, ingredient)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import { sauceValueById, findByID } from "@/common/helpers.js";
import AppDrag from "@/common/components/AppDrag";

import { mapGetters, mapState, mapMutations } from "vuex";
import { ADD_INGREDIENT, CHANGE_SOUCE } from "@/store/mutations-types";

import { MAX_INGREDIENT_COUNT,
         CLASS_INGREDIENT_COUNTER,
         MIN_COUNT } from "@/common/constants.js";

export default {
  name: "BuilderIngredientsSelector",
  components: { RadioButton, ItemCounter, AppDrag },
  data() {
    return {
      sauceValueById,
      MAX_INGREDIENT_COUNT,
      MIN_COUNT,
      CLASS_INGREDIENT_COUNTER,
    };
  },
 
  computed: {
    ...mapState("Builder", {
        ingredients: "ingredients",
        pizza: "pizza",
        sauces: "sauces",
    }),
    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
    }),
  },

  methods: {
    ...mapMutations("Builder", [ADD_INGREDIENT, CHANGE_SOUCE]),

    changeCount(count, ingredient) {
      this[ADD_INGREDIENT]({ count, ingredient });
      this.pizzaPrice;
    },

    radioButtonAction(value, sauce) {
      this[CHANGE_SOUCE]({ value, sauce });
      this.pizzaPrice;
    },

    getIngredientCount(id) { 
      const ingredient = findByID(this.pizza.checkedIngredients, id);
      return ingredient?.count || 0;
    },

    getNameById(map, id) {
      return map[id];
    },
    
  },
};

</script>

<style lang="scss" scoped>
  .filling {
     &::before {
          background-image: var(--my-src);
     }
  }
</style>
