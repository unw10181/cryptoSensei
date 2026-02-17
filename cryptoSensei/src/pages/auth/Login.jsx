import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MotionPage from "../../components/ui/MotionPage";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const u = await login(email, password);
    nav(u?.avatar ? "/dashboard" : "/avatar");
  };

  return (
    <MotionPage>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE – LOGIN FORM */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                font-dirty
                text-4xl sm:text-5xl
                mb-8
                bg-gradient-neon
                bg-clip-text
                text-transparent
                tracking-widest
                drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]
                hover:scale-105
                transition-all
              "
            >
              CryptoSensei
            </motion.h1>

            <Card className="p-6" data-aos="fade-up">
              <div className="font-arcade text-xs tracking-widest text-primary-500">
                SYSTEM LOGIN
              </div>

              <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                Enter the dungeon.
              </div>

              <form className="mt-6 space-y-4" onSubmit={submit}>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    Email
                  </div>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    Password
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button className="w-full hover:shadow-neon transition">
                  LOGIN
                </Button>
              </form>

              <div className="mt-4 text-sm text-slate-700 dark:text-slate-200">
                No account?{" "}
                <Link
                  className="text-primary-500 hover:text-neon-purple transition"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE – IMAGE PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden md:flex justify-center"
          >
            <img
              src="/theme/system-character.webp"
              alt="System Character"
              className="
                max-h-[500px]
                w-auto
                object-contain
                drop-shadow-[0_0_35px_rgba(0,240,255,0.4)]
                hover:scale-105
                transition-all
                duration-300
                rounded-sm
              "
            />
          </motion.div>
        </div>
      </div>
    </MotionPage>
  );
}
