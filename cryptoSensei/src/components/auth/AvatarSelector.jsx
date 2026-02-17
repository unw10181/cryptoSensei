import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS } from "../../utils/constants";
import Card from "../common/Card";

const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  const [hoveredAvatar, setHoveredAvatar] = useState(null);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-gaming text-white mb-2 neon-text">
          Choose Your Hunter
        </h3>
        <p className="text-gray-400 font-tech">
          Select your avatar to begin your journey
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AVATARS.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredAvatar(avatar.id)}
            onHoverEnd={() => setHoveredAvatar(null)}
          >
            <div
              onClick={() => onSelect(avatar.id)}
              className={`
                relative cursor-pointer rounded-xl overflow-hidden
                border-4 transition-all duration-300
                ${
                  selectedAvatar === avatar.id
                    ? "border-neon-cyan shadow-neon scale-105"
                    : "border-dark-border hover:border-neon-purple"
                }
              `}
            >
              {/* Avatar Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-primary-900/50 to-dark-elevated flex items-center justify-center">
                <div className="text-6xl">
                  {avatar.id.includes("jinwoo") && "👤"}
                  {avatar.id.includes("igris") && "⚔️"}
                  {avatar.id.includes("beru") && "🐜"}
                  {avatar.id.includes("thomas") && "💪"}
                  {avatar.id.includes("cha") && "🗡️"}
                  {avatar.id.includes("gunhee") && "🧙"}
                  {avatar.id.includes("antares") && "🐉"}
                  {avatar.id.includes("bellion") && "👑"}
                </div>
              </div>

              {/* Avatar Info */}
              <div className="bg-dark-surface/95 backdrop-blur-sm p-3">
                <h4 className="font-gaming text-sm text-white truncate">
                  {avatar.name}
                </h4>
                <p className="text-xs text-gray-400 truncate">{avatar.rank}</p>
              </div>

              {/* Selection Indicator */}
              {selectedAvatar === avatar.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-dark-bg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Hover Glow Effect */}
              {hoveredAvatar === avatar.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-neon-cyan/20 to-transparent pointer-events-none"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Avatar Description */}
      <AnimatePresence mode="wait">
        {selectedAvatar && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="text-center">
              <div className="space-y-2">
                <h4 className="text-lg font-gaming text-neon-cyan">
                  {AVATARS.find((a) => a.id === selectedAvatar)?.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {AVATARS.find((a) => a.id === selectedAvatar)?.description}
                </p>
                <div className="inline-block px-4 py-1 bg-primary-500/20 border border-primary-500 rounded-full">
                  <span className="text-xs font-gaming text-primary-300">
                    {AVATARS.find((a) => a.id === selectedAvatar)?.rank}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarSelector;
