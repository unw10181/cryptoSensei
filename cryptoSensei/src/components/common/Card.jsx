import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  glow = false,
  glowColor = "cyan",
  noPadding = false,
  onClick = null,
  ...props
}) => {
  const glowColors = {
    cyan: "hover:shadow-neon",
    purple: "hover:shadow-neon-purple",
    none: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : {}}
      onClick={onClick}
      className={`
        gaming-card
        ${!noPadding && "p-6"}
        ${hover && "cursor-pointer"}
        ${glow && glowColors[glowColor]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card Header Component
Card.Header = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

// Card Title Component
Card.Title = ({ children, className = "" }) => (
  <h3 className={`text-xl font-gaming text-white mb-2 ${className}`}>
    {children}
  </h3>
);

// Card Description Component
Card.Description = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-400 ${className}`}>{children}</p>
);

// Card Content Component
Card.Content = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

// Card Footer Component
Card.Footer = ({ children, className = "" }) => (
  <div className={`mt-4 pt-4 border-t border-dark-border ${className}`}>
    {children}
  </div>
);

export default Card;
