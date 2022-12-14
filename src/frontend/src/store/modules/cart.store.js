import { uniqueId } from 'lodash';
import {
  SET_ENTITY,
  ADD_CURRENT_PIZZA,
  CHANGE_PIZZA_COUNT,
  UPDATE_PIZZA_PRICE,
  ADD_MISK,
  SET_DELIVERY_DATA,
  CART_RESSET,
} from '@/store/mutations-types';

import { normalizeiJson, findByID, findIndexByID } from "@/common/helpers.js";
// import jsonMisc from "@/static/misc.json";

const MODULE = "Cart";

const getOrder = () => ({
  currentPizzas: [],
  currentMiscs: [],
  tel: "",
  street: "",
  house: "",
  apartment: "",
  totalPrice: "",
})


export default {
  namespaced: true,
  state: {
      order: getOrder(),
      miscs: [],
  },

  getters: {

    miscsPrice(state) {
      return state.order.currentMiscs.reduce((sum, current) => {
        return sum + current.price * current.count;
      }, 0);
    },

    totalPrice(state, getters) {
      return state.order.totalPrice = state.order.currentPizzas.reduce((sum, current) => {
        return sum + current.resultPrice;
      }, 0) + getters.miscsPrice;
    }
  },

  mutations: {
    [ADD_CURRENT_PIZZA](state, pizza) {
      if (!pizza.id) {
        state.order.currentPizzas.push({ 
          ...pizza, 
          id: uniqueId("pizza_"),
          resultPrice: pizza.pizzaPrice,
          count: 1,
        });
      } else {
        let index = findIndexByID(state.order.currentPizzas, pizza.id);
        state.order.currentPizzas.splice(index, 1, pizza);
      }

    },

    [CHANGE_PIZZA_COUNT](state, event) {
      let index = findIndexByID(state.order.currentPizzas, event.pizza.id);

      if (event.count > 0) {
        const currentPizza = findByID(state.order.currentPizzas, event.pizza.id);

        state.order.currentPizzas.splice(index, 1, {
          ...currentPizza,
          count: event.count,
        })
      } else {
        state.order.currentPizzas.splice(index, 1)
      }
    
    },

    [UPDATE_PIZZA_PRICE](state) {

      state.order.currentPizzas.map((pizza, index, currentPizzas) => {
        currentPizzas.splice(index, 1, {
          ...pizza,
          resultPrice: pizza.pizzaPrice * pizza.count,
        })
      },);
      
    },

    [ADD_MISK](state, event) {
      const currentMisc = findByID(state.order.currentMiscs, event.misc.id);
        
      if (!currentMisc) {
        state.order.currentMiscs.push({
          ...event.misc,
          count: event.count,
        });
      } else {
        let index = findIndexByID(state.order.currentMiscs, event.misc.id);

        if (event.count > 0) {  
          state.order.currentMiscs[index].count = event.count;
        } else {
          state.order.currentMiscs.splice(index, 1)
        };
      };
    },

    [SET_DELIVERY_DATA](state, event) {
      state.order[event.name] = event.value;
    },

    [CART_RESSET](state) {
      state.order = getOrder();
    }

  },

  actions: {
    async fetchMiscs({ commit }) {
      const miscs = await this.$api.misc.query()
      // const miscs = jsonMisc.map(misc => normalizeiJson(misc));
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "miscs",
          value: miscs.map(misc => normalizeiJson(misc)),
        }, { root: true }
      );
    },
  },

};
