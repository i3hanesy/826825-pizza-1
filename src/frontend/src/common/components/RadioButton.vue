<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="isChecked"
      class="visually-hidden"
      @change="$emit('radioButtonAction', $event.target)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },

    isChecked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
