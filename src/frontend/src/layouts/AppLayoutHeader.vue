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
            :src ="getUserAttribute('avatar')"
            srcset="img/users/user5@2x.jpg"
            :alt="getUserAttribute('name')"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ getUserAttribute('name') }}</span>
      </router-link>
      <a 
        href="#"
        class="header__logout"
        @click="$logout"
      >
        <span>Выйти</span>
      </a>
    </div>

    <div class="header__user" v-else>
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { logout } from '@/common/mixins';
export default {
  name: "AppLayoutHeader",
  mixins: [logout],
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
      // ...mapState("Auth", {
      //     user: "user",
      // }),
      ...mapState(['Auth']),
      ...mapState("Cart", {
          order: "order",
      }),
      ...mapGetters('Auth', ['getUserAttribute']),

      user() {
        return this.Auth.user || {};
      }
  },

};
</script>

<style lang="scss" scoped>
.header__user {
  display: flex;
  align-items: center;
}
</style>
