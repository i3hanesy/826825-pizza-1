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
          :isChecked="size.id === pizza.sizeID"
          :value="`${getNameById(sizesClassById, size.id)}`"
          @radioButtonAction="radioButtonAction($event.value, size)"
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

import { mapGetters, mapState, mapMutations } from "vuex";
import { CHANGE_SIZE } from "@/store/mutations-types";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  data() {
    return {
      sizesClassById,
    };
  },

  computed: {
    ...mapState("Builder", {
        sizes: "sizes",
        pizza: "pizza",
    }),
    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
    }),
  },

  methods: {
    ...mapMutations("Builder", [CHANGE_SIZE]),

    radioButtonAction(value, size) {
      this[CHANGE_SIZE]({ value, size });
      this.pizzaPrice
    },

    getNameById(map, id) {
      return map[id];
    },
    
  },
};
</script>

<style lang="scss" scoped></style>
