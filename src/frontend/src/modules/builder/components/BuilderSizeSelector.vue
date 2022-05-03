<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${getNameById(sizesClassById, size.id)}`"
          name="diameter"
          :isChecked="size.id === 1"
          :value="`${getNameById(sizesClassById, size.id)}`"
          @radioButtonAction="radioButtonAction($event.value, size.multiplier)"
        >
          <span>{{ size.name }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { sizesClassById } from "@/common/helpers.js";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {
      sizesClassById,
    };
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getNameById(map, id) {
      return map[id];
    },
    radioButtonAction(value, multiplier) {
      return this.$emit("radioButtonAction", { value, multiplier });
    },
  },
};
</script>

<style lang="scss" scoped></style>
