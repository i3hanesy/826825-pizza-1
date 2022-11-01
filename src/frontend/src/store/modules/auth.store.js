import {
  SET_ENTITY,
} from '@/store/mutations-types';

import jsonUsers from '@/static/user.json';

const MODULE = "Auth";

export default {
  namespaced: true,
  state: {
    isLogin: true,
    user: [],
  },

  actions: {
    fetchUsers({ commit }) {
      const user = jsonUsers;
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "user",
          value: user,
        }, { root: true }
      );
    },
  },
};
