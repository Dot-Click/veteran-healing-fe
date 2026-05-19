import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Mail, MessageCircle, PhoneCallIcon } from "lucide-react";
import { FacebookIcon } from "../components/common/SocialIcons";
import { CONTACT_INFO, SOCIAL_LINKS } from "../lib/constants";
import { ASSETS } from "../lib/assetPaths";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", order: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PENDING: Connect to backend contact form handler in Phase 2
    setSubmitted(true);
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] lg:min-h-[60vh] flex items-center bg-brand-primary overflow-hidden w-full"
        style={{ backgroundImage: `url(${ASSETS.SLIDER_3})`, backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-brand-primary/70" aria-hidden="true" />
        <div className="relative container-site text-center w-full">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-gray-200 text-lg max-w-md mx-auto">
            We'd love to hear from you! Whether you have questions, need assistance with your order,
            or just want to chat about all things fungi, feel free to reach out.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream-light py-16 lg:py-20">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">We're Here to Help</h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Whether you have questions about our products, need support with your affiliate
                dashboard, or simply want to learn more about how we help veterans — don't hesitate to
                reach out.
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-brand-border/20 hover:border-brand-cta transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-cta text-sm">Email Us:</p>
                    <p className="text-gray-500 text-xs mt-0.5">For inquiries, support, or feedback:</p>
                    <p className="text-brand-cta text-sm">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
                  className="flex items-start gap-4 bg-white rounded-xl p-4 border border-brand-border/20 hover:border-brand-cta transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <PhoneCallIcon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-cta text-sm">Call Us:</p>
                    <p className="text-gray-500 text-xs mt-0.5">If we don't pick up leave a message:</p>
                    <p className="text-brand-cta text-sm">{CONTACT_INFO.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-brand-border/20">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <FacebookIcon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">Follow Us:</p>
                    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-cta text-sm hover:underline">Facebook: Veteran Healing</a>
                    <br />
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-cta text-sm hover:underline">Instagram: @veteranhealing_</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-brand-border/20">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">Live Chat:</p>
                    <p className="text-gray-500 text-xs">Our live chat is always in the bottom right! We will get back to you as soon as possible.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Fill the Form Below</h2>
              {submitted ? (
                <div className="bg-brand-cta/10 border border-brand-cta/30 rounded-xl p-8 text-center">
                  <h3 className="font-bold text-brand-dark text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-600 text-sm">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone No."
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta"
                    />
                    <input
                      type="text"
                      placeholder="Order No."
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta"
                  />
                  <textarea
                    rows={5}
                    placeholder="Message"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-brand-border/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-cta resize-none"
                  />
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
