import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="min-h-screen grid place-items-center px-4">
        <Card className="w-full max-w-md p-6" data-aos="fade-up">
          <div className="font-arcade text-xs tracking-widest text-primary-500">
            SYSTEM LOGIN
          </div>
          <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            Authenticate to enter the dungeon.
          </div>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Email
              </div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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

            <Button className="w-full">LOGIN</Button>
          </form>

          <div className="mt-4 text-sm text-slate-700 dark:text-slate-200">
            No account?{" "}
            <Link className="text-primary-500 hover:underline" to="/register">
              Register
            </Link>
          </div>
        </Card>
      </div>
    </MotionPage>
  );
}
