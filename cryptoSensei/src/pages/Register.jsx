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

     const validateForm = () => {
       const newErrors = {};

       if (!formData.username.trim()) {
         newErrors.username = "Username is required";
       } else if (formData.username.length < 4) {
         newErrors.username = "Username must be at least 4 characters";
       } else if (formData.username.length > 15) {
         newErrors.username = "Username must not exceed 15 characters";
       }

       if (!formData.email.trim()) {
         newErrors.email = "Email is required";
       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
       }

       if (!formData.password) {
         newErrors.password = "Password is required";
       } else if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters";
       }

       if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
       }

       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };
}