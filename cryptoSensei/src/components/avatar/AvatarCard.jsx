import { motion } from "framer-motion";
import { tierAccent } from "./avatarList";
import Card from "../ui/Card";

export default function AvatarCard({ avatar, selected, onSelect }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
      <Card
        data-aos="zoom-in"
        className={[
          "p-4 cursor-pointer transition",
          selected
            ? `${tierAccent(avatar.tier)} shadow-neon`
            : "hover:shadow-gaming",
        ].join(" ")}
        onClick={() => onSelect(avatar)}
      >
        <div className="flex items-center gap-4">
          <img
            src={avatar.img}
            alt={avatar.name}
            className="h-24 w-24 rounded-xl object-cover border border-light-border dark:border-dark-border"
          />
          <div>
            <div className="font-arcade text-xs tracking-widest">
              {avatar.name}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
              {avatar.tier}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
