"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { requestPasswordReset, verifyOtp } from "@/lib/mock/authService";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = useMemo(() => searchParams.get("email") ?? "", [searchParams]);

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleVerify(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!email) {
      setError("Email not found. Please restart forgot password flow.");
      return;
    }

    if (otp.trim().length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      setIsSubmitting(true);
      await verifyOtp({ email, otp: otp.trim() });
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    setError(null);
    setInfo(null);

    try {
      setIsResending(true);
      await requestPasswordReset(email);
      setInfo("New OTP generated. Check browser console.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend OTP.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05060F] text-white flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold mb-1">Verify OTP</h1>
        <p className="text-sm text-white/70 mb-6">
          Enter the 6-digit OTP sent for:{" "}
          <span className="text-white">{email || "unknown email"}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-sm text-white/80">OTP</label>
            <input
              className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:border-[#27AE60] tracking-[0.3em]"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              inputMode="numeric"
            />
          </div>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          {info ? <p className="text-sm text-[#27AE60]">{info}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#27AE60] text-black font-medium py-2.5 disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-[#27AE60] hover:underline disabled:opacity-60"
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>

          <Link href="/forgot-password" className="text-white/70 hover:text-white">
            Change email
          </Link>
        </div>
      </section>
    </main>
  );
}