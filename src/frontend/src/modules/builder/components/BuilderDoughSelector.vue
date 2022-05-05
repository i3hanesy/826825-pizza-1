<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in dough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${getNameById(doughClassById, dough.id)}`"
          name="dought"
          :isChecked="dough.id === 1"
          :value="`${getNameById(doughClassById, dough.id)}`"
          @radioButtonAction="radioButtonAction($event.value, dough.name)"
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
import { doughClassById } from "@/common/helpers.js";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {
      doughClassById,
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
    radioButtonAction(value, name) {
      return this.$emit("radioButtonAction", { value, name });
    },
  },
};
</script>

<style lang="scss" scoped></style>
