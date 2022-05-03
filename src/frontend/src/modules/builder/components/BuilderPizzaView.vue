<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        :value="pizzaName"
        @input="setName"
      />
    </label>

    <div class="content__constructor">
      <AppDrop @drop="drop($event)">
        <div :class="`pizza pizza--foundation--${dough}-${souce}`">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in ingredients"
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
      :pizzaPrice="pizzaPrice"
      :ingredients="ingredients"
      :pizzaName="pizzaName"
    />
  </div>
</template>

<script>
import { fillingClassById } from "@/common/helpers.js";
import AppDrop from "@/common/components/AppDrop.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
  data() {
    return {
      fillingClassById,
      pizzaName: "",
    };
  },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    souce: {
      type: String,
      required: true,
    },
    dough: {
      type: String,
      required: true,
    },
    pizzaPrice: {
      type: Number,
      required: true,
    },
  },

  methods: {
    setName(event) {
      this.$emit("setName", (this.pizzaName = event.target.value));
    },
    getNameById(map, id) {
      return map[id];
    },
    drop(ingridient) {
      return this.$emit("drop", {
        ingridient: ingridient,
        count: ingridient.count + 1,
      });
    },
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
