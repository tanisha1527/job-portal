import React, { useEffect, useState } from 'react';
import { createContext } from "react";
import { jobsData } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext()

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

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

  const [companyToken,setCompanyToken] = useState(null)
  const [companyData,setCompanyData] = useState(null)

  // Function to Fetch jobs
  const fetchJobs = async () => {
       try {

        const {data} = await axios.get(backendUrl + '/api/jobs')

        if (data.success) {
            setJobs(data.jobs)
            console.log(data.jobs);
        } else {
            toast.error(data.message)
        }
        
       } catch (error) {
          toast.error(error.message)
       }
  }

  // Function to fetch company data
  const fetchCompanyData = async () => {
        try {

          const {data} = await axios.get(backendUrl + '/api/company/company',{headers:{token:companyToken}})

          if (data.success) {
             setCompanyData(data.company)
             console.log(data);
             
          } else {
             toast.error(data.message)
          }
          
        } catch (error) {
            toast.error(error.message)
        }
  }

  useEffect(()=> {
       fetchJobs()

       const storedCompanyToken = localStorage.getItem('companyToken')

       if (storedCompanyToken) {
          setCompanyToken(storedCompanyToken)
       }

  },[])

  useEffect(()=>{
        if (companyToken) {
            fetchCompanyData()
        }
  },[companyToken])

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("searchFilter", JSON.stringify(searchFilter));
    localStorage.setItem("isSearched", isSearched);
  }, [searchFilter, isSearched]);

   const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin,
        companyToken,setCompanyToken,
        companyData,setCompanyData,
        backendUrl
   }

   return (<AppContext.Provider value={value}>
       {props.children}
   </AppContext.Provider>)

}