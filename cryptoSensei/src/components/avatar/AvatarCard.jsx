import { motion } from "framer-motion";
import { tierAccent } from "./avatarList";
import Card from "../ui/Card";

export default function AvatarCard({ avatar, selected, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card
        data-aos="zoom-in"
        onClick={() => onSelect(avatar)}
        className={[
          "cursor-pointer transition p-5",
          "aspect-square flex flex-col items-center justify-between",
          "text-center",
          selected
            ? `${tierAccent(avatar.tier)} shadow-neon`
            : "hover:shadow-gaming",
        ].join(" ")}
      >
        {/* Avatar Image */}
        <div className="w-full flex justify-center">
          <img
            src={avatar.img}
            alt={avatar.name}
            className="w-40 h-40 object-cover rounded-2xl border border-light-border dark:border-dark-border"
          />
        </div>

        {/* Text Section */}
        <div className="mt-4">
          <div className="font-arcade text-sm tracking-widest">
            {avatar.name}
          </div>

          <div className="mt-2 text-xs uppercase tracking-widest text-slate-600 dark:text-slate-300">
            {avatar.tier}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
