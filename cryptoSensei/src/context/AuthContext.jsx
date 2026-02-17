import { createContext, useContext, useState, useEffect } from "react";
import {
  authAPI,
  saveAuthToken,
  removeAuthToken,
  getAuthToken,
} from "../utils/api";
import { STORAGE_KEYS } from "../utils/constants";

const AuthContext = createContext();
