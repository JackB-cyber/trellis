"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  budget: string;
  businessDescription: string;
};

const budgetOptions = [
  { value: "", label: "Select a range..." },
  { value: "2000-3500", label: "$2,000 – $3,500" },
  { value: "3500-5000", label: "$3,500 – $5,000" },
  { value: "5000-plus", label: "$5,000+" },
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setStatus("submitting");
    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (!scriptUrl) throw new Error("Script URL not configured");

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-forest/8 border border-forest/15 rounded-xl p-12 text-center">
        <div className="w-14 h-14 bg-forest rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-forest mb-3">Inquiry Received!</h3>
        <p className="text-muted leading-relaxed max-w-sm mx-auto">
          We&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  const base =
    "w-full px-4 py-3 rounded-lg border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/50 transition-colors placeholder:text-muted/40";
  const err = "border-red-300";
  const ok = "border-sand";
  const lbl = "block text-sm font-medium text-charcoal mb-1.5";
  const msg = "mt-1.5 text-xs text-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={lbl}>
            Full Name <span className="text-red-400">*</span>
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
            Business Name <span className="text-red-400">*</span>
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
            Email <span className="text-red-400">*</span>
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
            Phone <span className="text-muted/50 font-normal">(optional)</span>
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
          <span className="text-muted/50 font-normal">(if you have one)</span>
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
          Budget Range <span className="text-red-400">*</span>
        </label>
        <select
          id="budget"
          className={`${base} ${errors.budget ? err : ok}`}
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
          Tell us about your business <span className="text-red-400">*</span>
        </label>
        <textarea
          id="businessDescription"
          rows={5}
          placeholder="A little about your business, who you serve, and what you're hoping a new website will help you achieve..."
          className={`${base} resize-none ${errors.businessDescription ? err : ok}`}
          {...register("businessDescription", {
            required: "Please tell us a bit about your business",
            minLength: { value: 30, message: "Please provide at least a sentence or two" },
          })}
        />
        {errors.businessDescription && <p className={msg}>{errors.businessDescription.message}</p>}
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:hello@trellisdigital.ca" className="underline font-medium">
            hello@trellisdigital.ca
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-forest text-white font-semibold py-4 rounded-lg hover:bg-forest-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        {status === "submitting" ? "Sending..." : "Send My Inquiry"}
      </button>

      <p className="text-xs text-muted/50 text-center">
        We typically respond within 1 business day. No spam, ever.
      </p>
    </form>
  );
}
