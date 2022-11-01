<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart"> {{ order.totalPrice }} ₽ </router-link>
    </div>
    <div class="header__user" v-if="isLogin">
      <router-link to="/profile">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            :src ="user.avatar"
            srcset="img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <router-link to="/" class="header__logout">
        <span>Выйти</span>
      </router-link>
    </div>
    <div class="header__user" v-else>
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppLayoutHeader",
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
      ...mapState("Auth", {
          user: "user",
      }),
      ...mapState("Cart", {
          order: "order",
      }),
  },

};
</script>

<style lang="scss" scoped>
.header__user {
  display: flex;
  align-items: center;
}
</style>
