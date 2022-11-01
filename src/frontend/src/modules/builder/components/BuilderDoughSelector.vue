<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
          v-for="dough in doughs"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${getNameById(doughClassById, dough.id)}`"
          name="dought"
          :isChecked="dough.id === pizza.doughID"
          :value="`${getNameById(doughClassById, dough.id)}`"
          @radioButtonAction="radioButtonAction($event.value, dough)"
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

import { mapState, mapMutations, mapGetters } from "vuex";
import { CHANGE_DOUTH } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  data() {
    return {
      doughClassById,
    };
  },

  computed: {
    ...mapState("Builder", {
        doughs: "doughs",
        pizza: "pizza",
    }),
    ...mapGetters("Builder", {
        pizzaPrice: "pizzaPrice",
    }),
  },
  
  methods: {
    ...mapMutations("Builder", [CHANGE_DOUTH]),
    
    radioButtonAction(value, dough) {
      this[CHANGE_DOUTH]({ value, dough });
      this.pizzaPrice;
    },

    getNameById(map, id) {
      return map[id];
    },
    
  },
};

</script>

<style lang="scss" scoped></style>
