import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MotionPage from "../../components/ui/MotionPage";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
    nav("/avatar");
  };

  return (
    <MotionPage>
      <div className="min-h-screen grid place-items-center px-4">
        <Card className="w-full max-w-md p-6" data-aos="fade-up">
          <div className="font-arcade text-xs tracking-widest text-primary-500">
            NEW HUNTER
          </div>
          <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            The System will register your existence.
          </div>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Username
              </div>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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

            <Button className="w-full">REGISTER</Button>
          </form>

          <div className="mt-4 text-sm text-slate-700 dark:text-slate-200">
            Already have an account?{" "}
            <Link className="text-primary-500 hover:underline" to="/login">
              Login
            </Link>
          </div>
        </Card>
      </div>
    </MotionPage>
  );
}
