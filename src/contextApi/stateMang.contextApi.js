import React, { createContext, useContext, useReducer } from "react";
import reducer, { INITIAL_STATE } from "../components/reducer/reducer";
const StateMang = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <StateMang.Provider value={{ state, dispatch }}>
      {children}
    </StateMang.Provider>
  );
};
export default Context;
export const ItemContext = () => {
  return useContext(StateMang);
};
