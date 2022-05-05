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

export const sizesClassById = {
  1: "small",
  2: "normal",
  3: "big",
};

export const doughClassById = {
  1: "light",
  2: "large",
};

export const sauceValueById = {
  1: "tomato",
  2: "creamy",
};

export const normalizeiIngredients = (ingredient) => {
  return {
    ...ingredient,
    count: 0,
  };
};
