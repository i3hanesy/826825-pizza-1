<template>
  <form 
    action="test.html" 
    method="post" 
    class="layout-form"
    @submit.prevent="onSubmit"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <CartPizzasSelector/>
        <CartAdditionalSelector/>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select 
                name="test" 
                class="select"
                @change="changeSelect($event.target)"
              >
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <template v-if="isLogin" >
                  <option 
                    v-for="address in user.addresses"
                    :key="address.id"
                    :value="address.id + 2"
                  >{{ address.name }}</option>
                </template>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input 
                type="text" 
                name="tel" 
                placeholder="+7 999-999-99-99" 
                @input="getDelivery($event.target)"
              />
            </label>

            <div 
              v-if="!noDelivery"
              class="cart-form__address"
            >
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input 
                    :disabled="isDisabled"
                    :value="order.street"
                    type="text" 
                    name="street" 
                    required
                    @input="getDelivery($event.target)"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input 
                    :disabled="isDisabled"
                    :value="order.house"
                    type="text" 
                    name="house" 
                    required
                    @input="getDelivery($event.target)"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input 
                    :disabled="isDisabled"
                    :value="order.apartment"
                    type="text" 
                    name="apartment" 
                    @input="getDelivery($event.target)"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{order.totalPrice}} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
    <CartPopup v-if="isCartPopupShow"/>
  </form>
</template>

<script>

import CartPizzasSelector from "@/modules/cart/components/CartPizzasSelector.vue";
import CartAdditionalSelector from "@/modules/cart/components/CartAdditionalSelector.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";

import { mapState, mapMutations } from "vuex";
import { SET_DELIVERY_DATA, CART_RESSET } from "@/store/mutations-types";
import { findByName } from "@/common/helpers.js";

export default {
  name: "Cart",

  components: {
    CartPizzasSelector,
    CartAdditionalSelector,
    CartPopup,
  },

  data() {
    return {
      noDelivery: true,
      isDisabled: false,
      isCartPopupShow: false,
      selectedAddress: {},
    };
  },

  computed: {
    ...mapState("Cart", {
        order: "order",
    }),

    ...mapState("Auth", {
        user: "user",
        isLogin: "isLogin",
    }),
  },

  methods: {
    ...mapMutations("Cart", [SET_DELIVERY_DATA, CART_RESSET]),


    changeSelect(event) {
      const selectValue = Number(event.value)
      const selectedName = event.options[event.selectedIndex].text;
      this.noDelivery = selectValue === 1 ? true : false;

      if (selectValue > 2 ) {
        this.isDisabled = true;
        this.selectedAddress = findByName(this.user.addresses, selectedName);

        this[SET_DELIVERY_DATA]({
          name: "street",
          value: this.selectedAddress.street,
        });

        this[SET_DELIVERY_DATA]({
          name: "house",
          value: this.selectedAddress.house,
        });

        this[SET_DELIVERY_DATA]({
          name: "apartment",
          value: this.selectedAddress.apartment,
        });

      } else {
        this.isDisabled = false;
      };

    },

    getDelivery(event) {
      this[SET_DELIVERY_DATA]({
        name: event.name,
        value: event.value,
      });
    },

    onSubmit() {
      this[CART_RESSET]();
      this.isCartPopupShow = true;
    }
  }
};


</script>

<style lang="scss" scoped></style>
