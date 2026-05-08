"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export default function LoginPage() {
  const router = useRouter();

  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) router.replace("/dashboard");
  }, [token, router]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login({ email, password });
      router.replace("/dashboard");
    } catch {
      // Store already handles error state
    }
  }

  return (
    <main className="min-h-screen bg-[#05060F] text-white flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
        <p className="text-sm text-white/70 mb-6">Login to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/80">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-[#27AE60]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) clearError();
              }}
              placeholder="ankit@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-white/80">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-[#27AE60]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) clearError();
              }}
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#27AE60] text-black font-medium py-2.5 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link href="/signup" className="text-white/70 hover:text-white">
            Create account
          </Link>
          <Link
            href="/forgot-password"
            className="text-[#27AE60] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </section>
    </main>
  );
}