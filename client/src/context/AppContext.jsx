import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { jobsData } from '../assets/assets';

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

  const [jobs,setJobs] = useState([])

  const[showRecruiterLogin,setShowRecruiterLogin] = useState(false)

  // Function to Fetch jobs
  const fetchJobs = async () => {
       setJobs(jobsData)
  }

  useEffect(()=> {
       fetchJobs()
  },[])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
    localStorage.setItem("isSearched", isSearched);
  }, [searchFilter, isSearched]);

   const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin
   }

   return (<AppContext.Provider value={value}>
       {props.children}
   </AppContext.Provider>)

}