<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="ingredients.length === 0 || pizzaName.length === 0"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    pizzaPrice: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
