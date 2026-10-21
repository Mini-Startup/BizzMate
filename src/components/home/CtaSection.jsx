import React from "react";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function CtaSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white overflow-hidden"
    >
      {/* Anchor for backward compatibility with #cta links */}
      <span id="cta" className="absolute -top-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Eyebrow, Heading, Subtitle & Direct Contact Info (Static Server Rendered) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 font-sans uppercase mb-3 sm:mb-4">
              WE&apos;RE HERE TO HELP YOU
            </p>

            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-neutral-900 tracking-tight font-sans leading-[1.08] mb-5 sm:mb-6"
            >
              Discuss Your <br />
              <span className="text-brand-violet">Software Solution</span> <br />
              Needs
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-sans mb-8 sm:mb-10">
              Are you looking for top-quality digital solutions tailored to your needs? Reach out to our technical founders directly.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs text-neutral-400 font-medium font-sans">
                    E-mail
                  </span>
                  <a
                    href="mailto:hello@bizzmate.agency"
                    className="text-base sm:text-lg font-bold text-neutral-900 hover:text-brand-violet transition-colors font-sans"
                  >
                    hello@bizzmate.agency
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs text-neutral-400 font-medium font-sans">
                    Phone number
                  </span>
                  <a
                    href="tel:+15553829401"
                    className="text-base sm:text-lg font-bold text-neutral-900 hover:text-brand-violet transition-colors font-sans"
                  >
                    +1 (555) 382-9401
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form Card (Client Leaf with Server Action) */}
          <div className="lg:col-span-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
