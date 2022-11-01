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