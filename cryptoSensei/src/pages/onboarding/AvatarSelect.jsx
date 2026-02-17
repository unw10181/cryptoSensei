import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { avatarList } from "../../components/avatar/avatarList";
import AvatarCard from "../../components/avatar/AvatarCard";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/client";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function AvatarSelect() {
  const list = useMemo(() => avatarList, []);
  const [selected, setSelected] = useState(null);
  const { user, updateUser } = useAuth();
  const nav = useNavigate();

  const confirm = async () => {
    if (!selected) return toast.error("Select an avatar.");
    const t = toast.loading("SYSTEM: Binding avatar...");
    try {
      const res = await api.put(endpoints.users.updateProfile(user._id), {
        avatar: selected.id,
      });
      const updated = res.data?.data || { ...user, avatar: selected.id };
      updateUser(updated);
      toast.success("SYSTEM: Avatar locked.", { id: t });
      nav("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to save avatar", {
        id: t,
      });
    }
  };

  return (
    <div>
      <div className="font-arcade text-xs tracking-widest text-primary-500">
        SELECT YOUR HUNTER
      </div>
      <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
        Choose your Solo-Leveling-style identity. This becomes your System
        avatar.
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((a) => (
          <AvatarCard
            key={a.id}
            avatar={a}
            selected={selected?.id === a.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={confirm}>CONFIRM</Button>
        <Button variant="ghost" onClick={() => nav("/dashboard")}>
          SKIP
        </Button>
      </div>
    </div>
  );
}
