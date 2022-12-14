import {
  SET_ENTITY,
  ADD_INGREDIENT,
  CHANGE_SOUCE,
  CHANGE_DOUTH,
  CHANGE_SIZE,
  SET_PIZZA_NAME,
  UPDATE_PIZZA,
  RESSET_PIZZA,
} from '@/store/mutations-types';

import { cloneDeep } from 'lodash';
// import { lodash\cloneDeep} ;
import { normalizeiJson, findByID, findByName, findIndexByID } from "@/common/helpers.js";
// import jsonPizza from "@/static/pizza.json";

const MODULE = "Builder";

const getPizza = () => ({
  name:"",
  doughID: 1,
  souceID: 1,
  sizeID: 1,
  doughName: "Тонкое",
  souceName: "Томатный",
  sizeName: "23 см",
  souceClass: "tomato",
  doughClass: "small",
  pizzaPrice: "350",
  resultPrice: "",
  checkedIngredients: [],
});


export default {
  namespaced: true,

  state: {
      doughs: [],
      sauces: [],
      ingredients: [],
      sizes: [],
      pizza: getPizza(),
  },

  getters: {

    pizzaPrice(state) {
 
      let ingredientsPrice = state.pizza.checkedIngredients.reduce((sum, current) => {
        return sum + current.price * current.count;
      }, 0);
      let doughPrice = findByName(state.doughs, state.pizza.doughName).price;
      let soucePrice = findByName(state.sauces, state.pizza.souceName).price;
      let sizePrice = findByName(state.sizes, state.pizza.sizeName).multiplier
      return state.pizza.pizzaPrice = (ingredientsPrice + doughPrice + soucePrice) * sizePrice;
    },

  },

  mutations: {
    [RESSET_PIZZA](state) {
      state.pizza = getPizza();
    },

    [UPDATE_PIZZA](state, currentPizza) {
      state.pizza = cloneDeep(currentPizza);
    },

    [ADD_INGREDIENT](state, event) {
      const ingredientID = event.ingredient.id;
      const currentIngredient = findByID(state.pizza.checkedIngredients, ingredientID);
        
      if (!currentIngredient) {
        state.pizza.checkedIngredients.push({
          ...event.ingredient,
          count: event.count,
        });
      } else {
        let index = findIndexByID(state.pizza.checkedIngredients, ingredientID)

        if (event.count > 0) {  
          state.pizza.checkedIngredients[index].count = event.count;
        } else {
          state.pizza.checkedIngredients.splice(index, 1)
        };
      };
    },

    [CHANGE_SOUCE](state, event) {
      state.pizza.souceID = event.sauce.id;
      state.pizza.souceName = event.sauce.name;
      state.pizza.souceClass = event.value;
    },
    
    [CHANGE_DOUTH](state, event) {
      state.pizza.doughName = event.dough.name;
      state.pizza.doughID = event.dough.id;
      switch (event.value) {
        case "large":
          state.pizza.doughClass = "big";
          break;
        case "light":
          state.pizza.doughClass = "small";
          break;
      }
    },
    [CHANGE_SIZE](state, event) {
      state.pizza.sizeName = event.size.name;
      state.pizza.sizeID = event.size.id;
    },

    [SET_PIZZA_NAME](state, event) {
      state.pizza.name = event.value;
    },

  },

  actions: {
    async fetchDoughs({ commit }) {
      // const doughs = jsonPizza.dough;
      const doughs = await this.$api.dough.query();
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "doughs",
          value: doughs,
        }, { root: true }
      );
    },
    async fetchSizes({ commit }) {
      const sizes = await this.$api.sizes.query();
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "sizes",
          value: sizes,
        }, { root: true }
      );
    },
    async fetchSauces({ commit }) {
      const sauces = await this.$api.sauces.query();
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "sauces",
          value: sauces,
        }, { root: true }
      );
    },
    async fetchIngredients({ commit }) {
      // const ingredients = jsonPizza.ingredients.map(ingredient => normalizeiJson(ingredient));
      const ingredients = await this.$api.ingredients.query();
      commit(
        SET_ENTITY,
        {
          module: MODULE,
          entity: "ingredients",
          value: ingredients.map(ingredient => normalizeiJson(ingredient)),
        }, { root: true }
      );
    },
  },

};
