import { createContext } from "react";

const categoriesContext = createContext({
  categories: null,
  setCategories: () => {},
});

export default categoriesContext;
