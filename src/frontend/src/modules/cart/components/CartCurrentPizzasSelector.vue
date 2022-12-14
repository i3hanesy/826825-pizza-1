<template>
  <ul class="cart-list sheet">
    <li 
      v-for="currentPizza in order.currentPizzas"
      :key="currentPizza.id"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt: currentPizza.name
        />
        <div class="product__text">
          <h2>{{ currentPizza.name }}</h2>
          <ul>
            <li>{{currentPizza.sizeName}}, на {{ doughDisplayName(currentPizza.doughID) }} тесте</li>
            <li>Соус: {{currentPizza.souceName}}</li>
            <li>Начинка: {{displayIngredients(currentPizza.checkedIngredients)}}</li>
          </ul>
        </div>
      </div>

      <ItemCounter
        :classCounter="CLASS_CART_COUNTER"
        :count="currentPizza.count"
        :minCount ="MIN_COUNT"
        @changeCount="changeCount($event, currentPizza)"
      />

      <div class="cart-list__price">
        <b>{{currentPizza.resultPrice}} ₽</b>
      </div>

      <div class="cart-list__button">
        <button 
          type="button" 
          class="cart-list__edit"
          @click="editPizza(currentPizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
  import { toLower } from "lodash";
  import ItemCounter from "@/common/components/ItemCounter";
  
  import { mapState, mapMutations, mapGetters } from "vuex";
  import { CHANGE_PIZZA_COUNT, UPDATE_PIZZA, UPDATE_PIZZA_PRICE } from "@/store/mutations-types";
  import { CLASS_CART_COUNTER, MIN_COUNT } from "@/common/constants.js";
  import { doughShowName } from "@/common/helpers.js";
  
  export default {
    name: "CartCurrentPizzasSelector",

    components: {
      ItemCounter,
    },
    data() {
      return {
        CLASS_CART_COUNTER,
        MIN_COUNT,
        doughShowName,
      };
    },
  
    computed: {
      ...mapState("Cart", {
          order: "order",
      }),

      ...mapGetters("Cart", {
        totalPrice: "totalPrice",
      }),
      
    },

    methods: {

    ...mapMutations("Cart", [CHANGE_PIZZA_COUNT, UPDATE_PIZZA_PRICE]),
    ...mapMutations("Builder", [UPDATE_PIZZA]),

    changeCount(count, pizza) {
      this[CHANGE_PIZZA_COUNT]({ count, pizza });
      this[UPDATE_PIZZA_PRICE]();
      this.totalPrice;
    },  

    editPizza(currentPizza){
      this.$router.push({ name: 'Index' });
      this[UPDATE_PIZZA](currentPizza);
    },

    displayIngredients(ingredients) {
      return ingredients
        .map((ingredient) => toLower(ingredient.name))
        .join(", ");
    },

    doughDisplayName(id) {
      return this.doughShowName[id];
    },
    
  },

  };
  
  
  </script>
  
  <style lang="scss" scoped></style>
  