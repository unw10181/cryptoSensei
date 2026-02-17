export const avatarList = [
  {
    id: "jinwoo",
    name: "Sung Jin-Woo",
    tier: "bronze",
    img: "/avatars/jinwoo.png",
  },
  { id: "igris", name: "Igris", tier: "silver", img: "/avatars/igris.png" },
  { id: "beru", name: "Beru", tier: "gold", img: "/avatars/beru.png" },
  { id: "cha", name: "Cha Hae-In", tier: "gold", img: "/avatars/cha.png" },
  {
    id: "monarch",
    name: "Shadow Monarch",
    tier: "legendary",
    img: "/avatars/monarch.png",
  },
];

export const tierAccent = (tier) => {
  if (tier === "legendary") return "border-neon-pink";
  if (tier === "gold") return "border-neon-yellow";
  if (tier === "silver") return "border-neon-purple";
  return "border-neon-cyan";
};
