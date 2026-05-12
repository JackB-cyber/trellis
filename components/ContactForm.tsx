"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  fullName: string;
  businessName: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  lookingFor: string;
  budget: string;
  businessDescription: string;
};

const lookingForOptions = [
  { value: "", label: "Select an option..." },
  { value: "new-website", label: "New Website" },
  { value: "redesign", label: "Website Redesign" },
  { value: "retainer", label: "Monthly Retainer" },
  { value: "not-sure", label: "Not Sure" },
];

const budgetOptions = [
  { value: "", label: "Select a range..." },
  { value: "under-2000", label: "Under $2,000" },
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

      const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-forest/8 border border-forest/20 rounded-xl p-10 text-center">
        <div className="w-14 h-14 bg-forest rounded-full flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-forest mb-3">
          Inquiry Received!
        </h3>
        <p className="text-charcoal/70 leading-relaxed max-w-sm mx-auto">
          Thanks! We&apos;ll be in touch within 1 business day.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors placeholder:text-charcoal/35";
  const errorInputClass = "border-red-400";
  const defaultInputClass = "border-cream-dark";
  const labelClass = "block text-sm font-medium text-charcoal mb-1.5";
  const errorMsgClass = "mt-1.5 text-xs text-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Jane Smith"
            className={`${inputClass} ${errors.fullName ? errorInputClass : defaultInputClass}`}
            {...register("fullName", { required: "Please enter your name" })}
          />
          {errors.fullName && (
            <p className={errorMsgClass}>{errors.fullName.message}</p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className={labelClass}>
            Business Name <span className="text-red-400">*</span>
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="Acme Co."
            className={`${inputClass} ${errors.businessName ? errorInputClass : defaultInputClass}`}
            {...register("businessName", {
              required: "Please enter your business name",
            })}
          />
          {errors.businessName && (
            <p className={errorMsgClass}>{errors.businessName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@yourbusiness.ca"
            className={`${inputClass} ${errors.email ? errorInputClass : defaultInputClass}`}
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className={errorMsgClass}>{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone{" "}
            <span className="text-charcoal/40 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(403) 555-0100"
            className={`${inputClass} ${defaultInputClass}`}
            {...register("phone")}
          />
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="websiteUrl" className={labelClass}>
          Current Website{" "}
          <span className="text-charcoal/40 font-normal">(if you have one)</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          placeholder="https://yourwebsite.ca"
          className={`${inputClass} ${defaultInputClass}`}
          {...register("websiteUrl")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* What are you looking for */}
        <div>
          <label htmlFor="lookingFor" className={labelClass}>
            What are you looking for? <span className="text-red-400">*</span>
          </label>
          <select
            id="lookingFor"
            className={`${inputClass} ${errors.lookingFor ? errorInputClass : defaultInputClass}`}
            {...register("lookingFor", { required: "Please select an option" })}
          >
            {lookingForOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.lookingFor && (
            <p className={errorMsgClass}>{errors.lookingFor.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget Range <span className="text-red-400">*</span>
          </label>
          <select
            id="budget"
            className={`${inputClass} ${errors.budget ? errorInputClass : defaultInputClass}`}
            {...register("budget", { required: "Please select a budget range" })}
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p className={errorMsgClass}>{errors.budget.message}</p>
          )}
        </div>
      </div>

      {/* Business description */}
      <div>
        <label htmlFor="businessDescription" className={labelClass}>
          Tell us about your business <span className="text-red-400">*</span>
        </label>
        <textarea
          id="businessDescription"
          rows={5}
          placeholder="A little about your business, what you do, who you serve, and what you're hoping a new website will help you achieve..."
          className={`${inputClass} resize-none ${errors.businessDescription ? errorInputClass : defaultInputClass}`}
          {...register("businessDescription", {
            required: "Please tell us a bit about your business",
            minLength: {
              value: 30,
              message: "Please provide at least a sentence or two",
            },
          })}
        />
        {errors.businessDescription && (
          <p className={errorMsgClass}>{errors.businessDescription.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          Something went wrong. Please try again or email us directly at{" "}
          <a
            href="mailto:hello@trellisdigital.ca"
            className="underline font-medium"
          >
            hello@trellisdigital.ca
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-forest text-white font-semibold py-4 rounded-lg hover:bg-forest-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        {status === "submitting" ? "Sending..." : "Send My Inquiry"}
      </button>

      <p className="text-xs text-charcoal/40 text-center">
        We typically respond within 1 business day. No spam, ever.
      </p>
    </form>
  );
}
