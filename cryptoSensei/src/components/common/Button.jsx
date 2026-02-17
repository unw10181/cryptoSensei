import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon = null,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-gaming font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-neon hover:scale-105 border-2 border-transparent",
    secondary:
      "bg-dark-elevated text-white border-2 border-primary-500 hover:bg-primary-500/20 hover:shadow-neon",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-neon-purple hover:scale-105 border-2 border-transparent",
    success:
      "bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-[0_0_20px_rgba(0,255,133,0.5)] hover:scale-105 border-2 border-transparent",
    ghost:
      "bg-transparent text-primary-400 border-2 border-primary-400 hover:bg-primary-500/10",
    neon: "bg-transparent text-neon-cyan border-2 border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-neon",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-md",
    md: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-xl",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
      {...props}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></span>

      {/* Button content */}
      <span className="relative flex items-center gap-2">
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : Icon ? (
          <Icon className="w-4 h-4" />
        ) : null}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
