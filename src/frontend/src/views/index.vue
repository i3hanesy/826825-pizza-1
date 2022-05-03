<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <BuilderDoughSelector
          :dough="pizza.dough"
          @radioButtonAction="changeDough"
        />
        <BuilderSizeSelector
          :sizes="pizza.sizes"
          @radioButtonAction="changeSize"
        />
        <BuilderIngridientsSelector
          :sauces="pizza.sauces"
          :ingredients="ingredients"
          @changeCount="addIngredient"
          @radioButtonAction="changeSouce"
        />
        <BuilderPizzaView
          :ingredients="checkedIngredients"
          @drop="addIngredient"
          :souce="souceClass"
          :dough="doughClass"
          :pizzaPrice="pizzaPrice"
        />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderIngridientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import { normalizeiIngredients } from "@/common/helpers.js";

export default {
  name: "Index",
  data() {
    return {
      misc,
      pizza,
      user,
      doughPrice: pizza.dough[0].price,
      soucePrice: pizza.sauces[0].price,
      sizePrice: pizza.sizes[0].multiplier,
      souceClass: "tomato",
      doughClass: "small",
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeiIngredients(ingredient)
      ),
    };
  },
  components: {
    BuilderIngridientsSelector,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderPizzaView,
  },

  methods: {
    getNameById(map, id) {
      return map[id];
    },
    addIngredient(event) {
      let index = this.ingredients.findIndex(
        (item) => item.id === event.ingridient.id
      );
      this.ingredients[index].count = event.count;
    },
    changeSouce(event) {
      this.soucePrice = event.price;
      this.souceClass = event.value;
    },
    changeDough(event) {
      this.doughPrice = event.price;
      switch (event.value) {
        case "large":
          this.doughClass = "big";
          break;
        case "light":
          this.doughClass = "small";
          break;
      }
    },
    changeSize(event) {
      this.sizePrice = event.multiplier;
    },
  },
  computed: {
    checkedIngredients() {
      return this.ingredients.filter((ingredient) => ingredient.count > 0);
    },

    pizzaPrice() {
      let ingredientsPrice = this.checkedIngredients.reduce((sum, current) => {
        return sum + current.price * current.count;
      }, 0);
      return (
        (ingredientsPrice + this.doughPrice + this.soucePrice) * this.sizePrice
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
