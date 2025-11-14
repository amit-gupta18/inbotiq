"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

/**
 * Simple client-side cookie setter to avoid adding external dependency.
 */
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await api.post("/auth/login", form);

    setCookie("token", res.data.token);

    router.push("/dashboard");
  };

  return (
    <form className="space-y-4 w-80" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">Login</h1>

      <input
        className="border px-3 py-2 w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        className="border px-3 py-2 w-full"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-black text-white w-full py-2">
        Login
      </button>
    </form>
  );
}
