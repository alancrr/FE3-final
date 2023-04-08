import { createContext, useState, useEffect, useReducer } from "react";

export const initialState = {
  theme: localStorage.getItem('stema'), 
  favsDentists: []
}

export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {

  const getFavsFromStorage = () => {
    const localData = localStorage.getItem("favsDentist");
    return localData ? JSON.parse(localData) : [];
  };

  const saveFavsFromStorage = (favs) => {
    localStorage.setItem("favsDentist", JSON.stringify(favs));
  };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAV_DENTIST': 
      const existsDentist = state.favsDentists.find(
        (dentist) => dentist.id === action.dentist.id
        );
      if (existsDentist) 
        return state;     
      const newFavsDentists = [...state.favsDentists, action.dentist];
      saveFavsFromStorage(newFavsDentists)
      return { ...state, favsDentists: newFavsDentists };

    case 'LOAD_FAVS_DENTIST': 
      return { ...state, favsDentists: getFavsFromStorage() };

    case 'REMOVE_FROM_FAV':
      const favsDentistsFiltered = state.favsDentists.filter(
        (fav) => fav.id !== action.fav.id
      );
      saveFavsFromStorage(favsDentistsFiltered);
      return { ...state, favsDentists: favsDentistsFiltered };

    case 'SWITCH_THEME': 
      localStorage.setItem('stheme', action.theme);
      return { ...state, theme: action.theme };

    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

const [dentists, setDentists] = useState([]);

const getDentists = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  setDentists(data)
};

useEffect(() => {
  getDentists();
  dispatch({ type: "LOAD_FAVS_DENTIST" });
}, [])

  return (
    <ContextGlobal.Provider value={{ dentists, state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};
