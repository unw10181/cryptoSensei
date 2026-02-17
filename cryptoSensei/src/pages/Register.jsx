import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";
import AvatarSelector from "../components/auth/AvatarSelector";

const Register = () => { 
     const navigate = useNavigate();
     const { register, loading } = useAuth();

     const [step, setStep] = useState(1); // 1: form, 2: avatar selection
     const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({
       username: "",
       email: "",
       password: "",
       confirmPassword: "",
       avatar: "",
     });
     const [errors, setErrors] = useState({});
     const [apiError, setApiError] = useState("");   

     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData((prev) => ({
         ...prev,
         [name]: value,
       }));
       // Clear error when user starts typing
       if (errors[name]) {
         setErrors((prev) => ({ ...prev, [name]: "" }));
       }
     };
}