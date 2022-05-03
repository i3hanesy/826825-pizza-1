<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('changeCount', count - 1)"
      :disabled="count === MIN_INGRIDIENT_COUNT"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('changeCount', count + 1)"
      :disabled="count === MAX_INGRIDIENT_COUNT"
    >
      <span class="visually-hidden">Больше</span>
    </button>
    <slot />
  </div>
</template>

<script>
import {
  MIN_INGRIDIENT_COUNT,
  MAX_INGRIDIENT_COUNT,
} from "@/common/constants.js";

export default {
  name: "ItemCounter",

  data() {
    return {
      MIN_INGRIDIENT_COUNT,
      MAX_INGRIDIENT_COUNT,
    };
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
