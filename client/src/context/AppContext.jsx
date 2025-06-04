import React, { useEffect, useState } from 'react';
import { createContext } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

   // Load from localStorage
  const [searchFilter, setSearchFilter] = useState(() => {
    const stored = localStorage.getItem("searchFilter");
    return stored ? JSON.parse(stored) : { title: "", location: "" };
  });

  const [isSearched, setIsSearched] = useState(() => {
    return localStorage.getItem("isSearched") === "true";
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
    localStorage.setItem("isSearched", isSearched);
  }, [searchFilter, isSearched]);

   const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
   }

   return (<AppContext.Provider value={value}>
       {props.children}
   </AppContext.Provider>)

}