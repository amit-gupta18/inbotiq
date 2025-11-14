"use client";

import { useState } from "react";
import { api } from "../lib/axios";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post("/auth/signup", form);
    router.push("/login");
  };

  return (
    <form className="space-y-4 w-80" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">Signup</h1>

      <input
        className="border px-3 py-2 w-full"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      <select
        className="border px-3 py-2 w-full"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option>User</option>
        <option>Admin</option>
      </select>

      <button className="bg-black text-white w-full py-2">
        Signup
      </button>
    </form>
  );
}
