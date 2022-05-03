<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in dough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${getNameById(doughtClassById, dough.id)}`"
          name="dought"
          :isChecked="dough.id === 1"
          :value="`${getNameById(doughtClassById, dough.id)}`"
          @radioButtonAction="radioButtonAction($event.value, dough.price)"
        >
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import { doughtClassById } from "@/common/helpers.js";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {
      doughtClassById,
    };
  },
  props: {
    dough: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getNameById(map, id) {
      return map[id];
    },
    radioButtonAction(value, price) {
      return this.$emit("radioButtonAction", { value, price });
    },
  },
};
</script>

<style lang="scss" scoped></style>
