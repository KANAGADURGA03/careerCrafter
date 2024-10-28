import { createContext, useContext } from "react";
 
import React from 'react'
import { AuthContext } from "./AuthProvider";
// import { AuthContext } from "./Authprovider";
 
export const useAuth = () => {
  return useContext(AuthContext)
 
}