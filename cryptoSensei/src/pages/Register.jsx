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

     const handleNextStep = (e) => {
       e.preventDefault();
       if (validateForm()) {
         setStep(2);
       }
     };
     const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!formData.avatar) {
      setApiError('Please select an avatar');
      return;
    }

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      avatar: formData.avatar
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setApiError(result.message || 'Registration failed. Please try again.');
      setStep(1); // Go back to form if error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="gaming-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-gaming text-white mb-3 neon-text"
            >
              {step === 1 ? 'Join CryptoSensei' : 'Choose Your Path'}
            </motion.h1>
            <p className="text-gray-400 font-tech">
              {step === 1 
                ? 'Begin your journey to become a trading master' 
                : 'Select your hunter avatar'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-gaming text-sm
                ${step === 1 ? 'bg-neon-cyan text-dark-bg' : 'bg-green-500 text-white'}
                transition-all duration-300
              `}>
                {step === 1 ? '1' : '✓'}
              </div>
              <div className={`w-16 h-1 ${step === 2 ? 'bg-neon-cyan' : 'bg-dark-border'} transition-all duration-300`}></div>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-gaming text-sm
                ${step === 2 ? 'bg-neon-cyan text-dark-bg' : 'bg-dark-border text-gray-500'}
                transition-all duration-300
              `}>
                2
              </div>
            </div>
          </div>

          {/* Error Message */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center font-tech">{apiError}</p>
            </motion.div>
          )}

          {/* Step 1: Registration Form */}
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleNextStep}
              className="space-y-6"
            >
              {/* Username */}
              <div>
                <label className="block text-sm font-gaming text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-dark-elevated border-2 rounded-lg
                      text-white font-tech placeholder-gray-500
                      focus:outline-none focus:border-neon-cyan transition-colors
                      ${errors.username ? 'border-red-500' : 'border-dark-border'}
                    `}
                    placeholder="Enter your username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-gaming text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-dark-elevated border-2 rounded-lg
                      text-white font-tech placeholder-gray-500
                      focus:outline-none focus:border-neon-cyan transition-colors
                      ${errors.email ? 'border-red-500' : 'border-dark-border'}
                    `}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-gaming text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`
                      w-full pl-12 pr-12 py-3 bg-dark-elevated border-2 rounded-lg
                      text-white font-tech placeholder-gray-500
                      focus:outline-none focus:border-neon-cyan transition-colors
                      ${errors.password ? 'border-red-500' : 'border-dark-border'}
                    `}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-gaming text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`
                      w-full pl-12 pr-4 py-3 bg-dark-elevated border-2 rounded-lg
                      text-white font-tech placeholder-gray-500
                      focus:outline-none focus:border-neon-cyan transition-colors
                      ${errors.confirmPassword ? 'border-red-500' : 'border-dark-border'}
                    `}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" fullWidth icon={UserPlus}>
                Continue to Avatar Selection
              </Button>
            </motion.form>
          )}

          {/* Step 2: Avatar Selection */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AvatarSelector
                selectedAvatar={formData.avatar}
                onSelect={(avatarId) => setFormData(prev => ({ ...prev, avatar: avatarId }))}
              />

              <div className="mt-8 flex gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  fullWidth
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!formData.avatar}
                  fullWidth
                  icon={UserPlus}
                >
                  Create Account
                </Button>
              </div>
            </motion.div>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 font-tech">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-neon-cyan hover:text-neon-purple transition-colors font-gaming"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
