import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/dashboard");
    } else {
      setApiError(result.message || "Invalid email or password");
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

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-neon-cyan opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-neon-purple opacity-20"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="gaming-card p-8">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full flex items-center justify-center"
            >
              <span className="text-4xl">⚡</span>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-gaming text-white mb-3 neon-text"
            >
              CryptoSensei
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 font-tech"
            >
              Welcome back, Hunter
            </motion.p>
          </div>

          {/* Error Message */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg"
            >
              <p className="text-red-400 text-sm text-center font-tech">
                {apiError}
              </p>
            </motion.div>
          )}

          {/* Login Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Email Input */}
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
                    ${errors.email ? "border-red-500" : "border-dark-border"}
                  `}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-gaming text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full pl-12 pr-12 py-3 bg-dark-elevated border-2 rounded-lg
                    text-white font-tech placeholder-gray-500
                    focus:outline-none focus:border-neon-cyan transition-colors
                    ${errors.password ? "border-red-500" : "border-dark-border"}
                  `}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-dark-border bg-dark-elevated text-neon-cyan focus:ring-neon-cyan focus:ring-2"
                />
                <span className="ml-2 text-gray-400 font-tech">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-neon-cyan hover:text-neon-purple transition-colors font-gaming"
              >
                Forgot?
              </a>
            </div>

            {/* Login Button */}
            <Button type="submit" loading={loading} fullWidth icon={LogIn}>
              {loading ? "Logging in..." : "Enter the Gate"}
            </Button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-dark-surface text-gray-400 font-tech">
                OR
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-gray-400 font-tech">New to CryptoSensei?</p>
            <Link to="/register">
              <Button variant="ghost" fullWidth>
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500 font-tech">
            By logging in, you accept our{" "}
            <a
              href="#"
              className="text-neon-cyan hover:text-neon-purple transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-neon-cyan hover:text-neon-purple transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
