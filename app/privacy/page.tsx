import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Trellis Digital collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-abyss min-h-screen pt-40 pb-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow mb-6">Legal</p>
          <h1 className="display-md text-bone mb-4">Privacy Policy</h1>
          <p className="text-bone/35 text-sm mb-16">Last updated: June 17, 2025</p>
        </Reveal>

        <div className="space-y-14">
          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Who we are</h2>
              <p className="text-bone/55 leading-relaxed">
                Trellis Digital is a web design business based in Alberta, Canada. We build
                websites for Canadian small businesses. If you have any questions about this
                policy, you can reach us at{" "}
                <a
                  href="mailto:hello@trellisdigital.ca"
                  className="text-bone/80 underline hover:text-bone transition-colors"
                >
                  hello@trellisdigital.ca
                </a>
                .
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">What we collect</h2>
              <p className="text-bone/55 leading-relaxed mb-4">
                When you submit the inquiry form on our website, we collect the following
                information:
              </p>
              <ul className="text-bone/55 leading-relaxed space-y-2 list-none pl-0">
                {[
                  "Full name",
                  "Business name",
                  "Email address",
                  "Phone number (optional)",
                  "Current website URL (optional)",
                  "Budget range",
                  "A description of your business and project goals",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-bone/20 mt-1.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-bone/55 leading-relaxed mt-4">
                We do not collect payment information, government IDs, or any sensitive
                personal data through this website.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Why we collect it</h2>
              <p className="text-bone/55 leading-relaxed">
                We collect this information solely to review your project inquiry, respond to
                your questions, and prepare a proposal if your project is a good fit. We will
                not use your information for marketing emails or share it with third parties
                for their marketing purposes.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">How it&apos;s stored</h2>
              <p className="text-bone/55 leading-relaxed">
                When you submit the form, your information is transmitted via Google Apps
                Script and stored in a private Google Sheet accessible only to Trellis
                Digital. This data resides on Google&apos;s servers. Google&apos;s own privacy
                practices apply to how they handle this data — you can review them at{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/80 underline hover:text-bone transition-colors"
                >
                  policies.google.com/privacy
                </a>
                . No copies of your submission are stored on Trellis Digital&apos;s own servers.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Analytics</h2>
              <p className="text-bone/55 leading-relaxed">
                This website uses Vercel Analytics and Vercel Speed Insights to understand
                how visitors interact with our pages. These tools collect anonymized visit
                data — page views, referrer, and performance metrics — and do not collect or
                store any personally identifiable information. No cookies are used for
                tracking purposes.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Who we share it with</h2>
              <p className="text-bone/55 leading-relaxed">
                We do not sell, rent, or share your personal information with any third
                parties for their own purposes. Your submission is accessible only to Trellis
                Digital internally via the private Google Sheet described above.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">How long we keep it</h2>
              <p className="text-bone/55 leading-relaxed">
                We retain inquiry submissions for up to two years, or until you ask us to
                delete them — whichever comes first. If a project moves forward, records may
                be retained for the duration of our working relationship and a reasonable
                period afterward for business continuity.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Your rights</h2>
              <p className="text-bone/55 leading-relaxed">
                Under Alberta&apos;s <em>Personal Information Protection Act</em> (PIPA), you have
                the right to:
              </p>
              <ul className="text-bone/55 leading-relaxed space-y-2 list-none pl-0 mt-4">
                {[
                  "Request access to the personal information we hold about you",
                  "Request a correction if any information is inaccurate or incomplete",
                  "Request deletion of your information",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-bone/20 mt-1.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-bone/55 leading-relaxed mt-4">
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:hello@trellisdigital.ca"
                  className="text-bone/80 underline hover:text-bone transition-colors"
                >
                  hello@trellisdigital.ca
                </a>
                . We will respond within 30 days.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Changes to this policy</h2>
              <p className="text-bone/55 leading-relaxed">
                If we make material changes to this policy, we will update the &ldquo;last
                updated&rdquo; date at the top of this page. We encourage you to review it
                periodically.
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl text-bone mb-4">Governing law</h2>
              <p className="text-bone/55 leading-relaxed">
                This policy is governed by the laws of the Province of Alberta and the
                federal laws of Canada applicable therein.
              </p>
            </section>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
