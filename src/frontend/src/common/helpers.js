import resources from '@/common/enums/resources';
import { SET_ENTITY } from '@/store/mutations-types';
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from '@/services/api.service';

export const createResources = notifier => {
  return {
    // [resources.USERS]:
    //   new ReadOnlyApiService(resources.USERS, notifier),
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]:
      new CrudApiService(resources.ADDRESSES, notifier),
    [resources.ORDERS]:
      new CrudApiService(resources.ORDERS, notifier),
    
    
    [resources.INGREDIENTS]: new ReadOnlyApiService(resources.INGREDIENTS, notifier),
    [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
    [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
    [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
    
  };
};

export const setAuth = store => {
  store.$api.auth.setAuthHeader();
  store.dispatch('Auth/getMe');
};

export const fillingClassById = {
  1: "mushrooms",
  2: "cheddar",
  3: "salami",
  4: "ham",
  5: "ananas",
  6: "bacon",
  7: "onion",
  8: "chile",
  9: "jalapeno",
  10: "olives",
  11: "tomatoes",
  12: "salmon",
  13: "mozzarella",
  14: "parmesan",
  15: "blue_cheese",
};

export const capitalize = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const sizesClassById = {
  1: "small",
  2: "normal",
  3: "big",
};

export const doughClassById = {
  1: "light",
  2: "large",
};

export const doughShowName = {
  1: "тонком",
  2: "толстом",
};

export const sauceValueById = {
  1: "tomato",
  2: "creamy",
};

export const normalizeiJson = (object) => {
  return {
    ...object,
    count: 0,
  };
};

export const findByID = (array, id) => {
  return array.find((it) => it.id === id);
};

export const findByName = (array, name) => {
  return array.find((it) => it.name === name);
};

export const findIndexByID = (array, id) => {
  return array.findIndex((it) => it.id === id);
};

