import { createContext, useContext, useState, useEffect } from "react";
import {
  authAPI,
  saveAuthToken,
  removeAuthToken,
  getAuthToken,
} from "../utils/api";
import { STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};