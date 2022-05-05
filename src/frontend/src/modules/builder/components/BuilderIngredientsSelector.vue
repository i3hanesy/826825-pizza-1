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
            :isChecked="sauce.id === 1"
            :value="`${getNameById(sauceValueById, sauce.id)}`"
            @radioButtonAction="radioButtonAction($event.value, sauce.name)"
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
                :draggable="ingredient.count !== MAX_INGRIDIENT_COUNT"
              >
                <span
                  class="filling"
                  :class="`filling--${getNameById(
                    fillingClassById,
                    ingredient.id
                  )}`"
                >
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <ItemCounter
                :count="ingredient.count"
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
import { sauceValueById, fillingClassById } from "@/common/helpers.js";
import AppDrag from "@/common/components/AppDrag";

import { MAX_INGRIDIENT_COUNT } from "@/common/constants.js";

export default {
  name: "BuilderIngridientsSelector",
  components: { RadioButton, ItemCounter, AppDrag },
  data() {
    return {
      sauceValueById,
      fillingClassById,
      MAX_INGRIDIENT_COUNT,
    };
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getNameById(map, id) {
      return map[id];
    },
    changeCount(count, ingridient) {
      return this.$emit("changeCount", { count, ingridient });
    },
    radioButtonAction(value, name) {
      return this.$emit("radioButtonAction", { value, name });
    },
  },
};
</script>

<style lang="scss" scoped></style>
