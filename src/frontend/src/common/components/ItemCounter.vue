<template>
  <div 
    class="counter"
    :class="classCounter"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="$emit('changeCount', count - 1)"
      :disabled=" count === minCount"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="'counter__button--' + buttonClass"
      @click="$emit('changeCount', count + 1)"
      :disabled="maxCount ? count === maxCount : false"
    >
      <span class="visually-hidden">Больше</span>
    </button>
    <slot />
  </div>
</template>

<script>


export default {
  name: "ItemCounter",

  props: {
    count: {
      type: Number,
      required: true,
    },
    classCounter: {
      type: String,
      required: true,
    },
    buttonClass: {
      type: String,
      required: false,
    },
    minCount: {
      type: Number,
      required: false,
    },
    maxCount: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
