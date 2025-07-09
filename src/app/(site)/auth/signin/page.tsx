"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      setError("Неверный email или пароль.");
    } else {
      setSuccess("Вход выполнен! Перенаправление...");
      setTimeout(() => router.push("/"), 1000);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    
    // Safely parse JSON response
    let data;
    try {
      const text = await res.text();
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.error("Failed to parse registration response:", e);
      setError("Registration failed - invalid response");
      setLoading(false);
      return;
    }
    
    setLoading(false);
    if (!res.ok) {
      setError(data?.error || "Регистрация не удалась.");
    } else {
      setSuccess("Регистрация успешна! Теперь вы можете войти.");
      setMode("signin");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-8 bg-zinc-50">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg border border-zinc-100">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 font-semibold rounded-l transition-all duration-150 border ${mode === "signin" ? "text-white shadow" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}
          style={mode === "signin" ? { backgroundColor: '#2E6F40', borderColor: '#2E6F40' } : {}}
          onClick={() => { setMode("signin"); setError(""); setSuccess(""); }}
        >
          Войти
        </button>
        <button
          className={`flex-1 py-2 font-semibold rounded-r transition-all duration-150 border ${mode === "signup" ? "text-white shadow" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}
          style={mode === "signup" ? { backgroundColor: '#2E6F40', borderColor: '#2E6F40' } : {}}
          onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
        >
          Регистрация
        </button>
      </div>
      {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
      {mode === "signin" ? (
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full py-2 rounded text-white font-semibold hover:bg-[#2E6F40]/90 focus:outline-none focus:ring-2 transition disabled:opacity-60 shadow"
            style={{ backgroundColor: '#2E6F40' }}
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Имя (необязательно)"
            className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full py-2 rounded text-white font-semibold hover:bg-[#2E6F40]/90 focus:outline-none focus:ring-2 transition disabled:opacity-60 shadow"
            style={{ backgroundColor: '#2E6F40' }}
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      )}
      </div>
    </div>
  );
} 