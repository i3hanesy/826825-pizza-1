<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <li 
        v-for="misc in miscs"
        :key="misc.id"
        class="additional-list__item sheet"
      >
        <p class="additional-list__description">
          <img
            :src ="misc.image"
            width="39"
            height="60"
            :alt ="misc.name"
          />
          <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <ItemCounter
            :classCounter ="CLASS_MISC_COUNTER"
            :buttonClass ="CLASS_MISC_BUTTON"
            :count="getMiscCount(misc.id)"
            :minCount ="MIN_COUNT"
            @changeCount="changeCount($event, misc)"
          />
          <div class="additional-list__price">
            <b>× {{misc.price}} ₽</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from "vuex";
  import { ADD_MISK } from "@/store/mutations-types";
  import ItemCounter from "@/common/components/ItemCounter";
  import { MIN_COUNT, CLASS_MISC_COUNTER, CLASS_MISC_BUTTON } from "@/common/constants.js";
  import { findByID } from "@/common/helpers.js";

  export default {
    name: "CartAdditionalSelector",
    components: { ItemCounter },

    data() {
      return {
        MIN_COUNT,
        CLASS_MISC_COUNTER,
        CLASS_MISC_BUTTON,
      };
    },

    computed: {
      ...mapState("Cart", {
          miscs: "miscs",
          order: "order",
      }),

      ...mapGetters("Cart", {
        totalPrice: "totalPrice",
      }),
    },

    methods: {
      ...mapMutations("Cart", [ADD_MISK]),

      changeCount(count, misc) {
        this[ADD_MISK]({ count, misc });
        this.totalPrice;
      },

      getMiscCount(id) {
        const misc = findByID(this.order.currentMiscs, id);
        return misc?.count || this.MIN_COUNT;
      },

    },

  };

  

</script>

<style lang="scss" scoped></style>
