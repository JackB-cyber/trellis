"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  budget: string;
  businessDescription: string;
  company?: string; // honeypot — must stay empty
};

const budgetOptions = [
  { value: "", label: "Select an option..." },
  { value: "standard-3597", label: "Standard package — $3,597" },
  { value: "standard-plus", label: "Package + extra features" },
  { value: "not-sure", label: "Not sure yet" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Time trap: real users can't fill the whole form this fast; bots can.
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    if (status === "submitting") {
      setProgress(0);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const increment = Math.random() * 6 + 2;
          const next = prev + increment;
          if (next >= 82) {
            clearInterval(intervalRef.current!);
            return 82;
          }
          return next;
        });
      }, 180);
    }
    if (status === "success") {
      clearInterval(intervalRef.current!);
      setProgress(100);
    }
    if (status === "idle" || status === "error") {
      clearInterval(intervalRef.current!);
      setProgress(0);
    }
    return () => clearInterval(intervalRef.current!);
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Spam protection: drop bot submissions silently (show "success" so bots
    // don't retry) before anything reaches the backend.
    //  1. Honeypot — a hidden field only bots fill in.
    //  2. Time trap — submissions faster than 3s are not a real person.
    const tooFast = Date.now() - mountedAt.current < 3000;
    if (data.company || tooFast) {
      setStatus("success");
      reset();
      return;
    }

    setStatus("submitting");
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) throw new Error("Script URL not configured");

      // Don't send the honeypot field to the sheet.
      const payload = { ...data };
      delete payload.company;

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gold/30 rounded-2xl p-12 text-center bg-white/[0.02]">
        <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-abyss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl text-bone mb-3">Inquiry received.</h3>
        <p className="text-bone/45 leading-relaxed max-w-sm mx-auto">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const base =
    "w-full px-0 py-3 bg-transparent border-0 border-b rounded-none text-bone text-base focus:outline-none focus:border-gold transition-colors placeholder:text-bone/25";
  const err = "border-red-400/70";
  const ok = "border-moss/40";
  const lbl = "block font-display text-base text-bone/80 mb-1";
  const msg = "mt-1.5 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, catches bots. Not type=hidden so
          autofill bots still target it. */}
      <div
        aria-hidden
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="company">Company (leave this blank)</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={lbl}>
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Jane Smith"
            className={`${base} ${errors.fullName ? err : ok}`}
            {...register("fullName", { required: "Please enter your name" })}
          />
          {errors.fullName && <p className={msg}>{errors.fullName.message}</p>}
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className={lbl}>
            Business Name <span className="text-gold">*</span>
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Acme Co."
            className={`${base} ${errors.businessName ? err : ok}`}
            {...register("businessName", { required: "Please enter your business name" })}
          />
          {errors.businessName && <p className={msg}>{errors.businessName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className={lbl}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@yourbusiness.ca"
            className={`${base} ${errors.email ? err : ok}`}
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && <p className={msg}>{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={lbl}>
            Phone <span className="text-bone/30 font-normal text-sm">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(403) 555-0100"
            className={`${base} ${ok}`}
            {...register("phone")}
          />
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="websiteUrl" className={lbl}>
          Current Website{" "}
          <span className="text-bone/30 font-normal text-sm">(if you have one)</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          placeholder="https://yourwebsite.ca"
          className={`${base} ${ok}`}
          {...register("websiteUrl")}
        />
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className={lbl}>
          Budget Range <span className="text-gold">*</span>
        </label>
        <select
          id="budget"
          className={`${base} [&>option]:bg-ink [&>option]:text-bone ${errors.budget ? err : ok}`}
          {...register("budget", { required: "Please select a budget range" })}
        >
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.budget && <p className={msg}>{errors.budget.message}</p>}
      </div>

      {/* Business description */}
      <div>
        <label htmlFor="businessDescription" className={lbl}>
          Tell us about your business <span className="text-gold">*</span>
        </label>
        <textarea
          id="businessDescription"
          rows={5}
          placeholder="A little about your business, who you serve, and what you're hoping a new website will help you achieve..."
          className={`${base} resize-none ${errors.businessDescription ? err : ok}`}
          {...register("businessDescription", {
            required: "Please tell us a bit about your business",
          })}
        />
        {errors.businessDescription && <p className={msg}>{errors.businessDescription.message}</p>}
      </div>

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-400/30 text-red-300 text-sm rounded-lg px-4 py-3">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:hello@trellisdigital.ca" className="underline font-medium">
            hello@trellisdigital.ca
          </a>
          .
        </div>
      )}

      {status === "submitting" ? (
        <div className="w-full border border-gold/25 rounded-full py-4 px-6 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-bone/70 text-sm font-medium">Sending your inquiry...</span>
            <span className="text-gold text-sm font-bold tabular-nums">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.18, ease: "linear" }}
            />
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full bg-gold text-abyss font-semibold py-4 rounded-full hover:bg-gold-bright transition-colors text-sm sm:text-base"
        >
          Send My Inquiry
        </button>
      )}

      <p className="text-xs text-bone/25 text-center">
        We typically respond within 1 business day. No spam, ever.
      </p>
      <p className="text-xs text-bone/20 text-center leading-relaxed">
        By submitting this form, you agree to our{" "}
        <Link href="/privacy" className="underline hover:text-bone/45 transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
