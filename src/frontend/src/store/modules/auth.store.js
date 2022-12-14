import {
  SET_ENTITY,
} from '@/store/mutations-types';

// import jsonUsers from '@/static/user.json';

const MODULE = "Auth";

export default {
  namespaced: true,
  state: {
    isLogin: false,
    user: null,
  },

  getters: {
    getUserAttribute: state => attr => state.user ? state.user[attr] : ''
  },

  actions: {

    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch('getMe');
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(
        SET_ENTITY,
        { module: 'Auth', entity: 'isLogin', value: false },
        { root: true }
      );
      commit(
        SET_ENTITY,
        { module: 'Auth', entity: 'user', value: null },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      // console.log(this.$jwt)
      try {
        const data = await this.$api.auth.getMe();
        commit(
          SET_ENTITY,
          { module: 'Auth', entity: 'isLogin', value: true },
          { root: true }
        );
        commit(
          SET_ENTITY,
          { module: 'Auth', entity: 'user', value: data },
          { root: true }
        );
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch('logout', false);
      }
    }

    // fetchUsers({ commit }) {
    //   const user = jsonUsers;
    //   commit(
    //     SET_ENTITY,
    //     {
    //       module: MODULE,
    //       entity: "user",
    //       value: user,
    //     }, { root: true }
    //   );
    // },
  },
};
