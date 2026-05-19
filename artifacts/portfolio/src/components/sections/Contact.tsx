import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle, Phone } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6" data-testid="section-contact" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col gap-2 mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 1.4, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            className="absolute -top-10 -left-2 sm:-left-4 text-[7rem] sm:text-[9rem] font-extrabold font-mono leading-none select-none pointer-events-none text-foreground/[0.04]"
            aria-hidden="true"
          >
            07
          </motion.span>
          <span className="relative z-10 text-primary font-mono text-sm tracking-widest uppercase">07. Contact</span>
          <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-foreground">Let's Work Together</h2>
          <p className="relative z-10 text-muted-foreground max-w-xl mt-2">
            Have a project in mind? I'd love to hear about it. Let's build something great.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Get in touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have a full project ready or just an idea, I'm open to conversations.
                Reply time is typically within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { href: "mailto:zakariamachmach03@gmail.com", icon: Mail, label: "Email", value: "zakariamachmach03@gmail.com", testId: "contact-email-link" },
                { href: "tel:+212682685984", icon: Phone, label: "Phone", value: "+212 682 685 984", testId: "contact-phone-link" },
                { href: "https://www.linkedin.com/in/zakaria-machmach-094428225/", icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/zakariamachmach", testId: "contact-linkedin-link" },
                { href: "https://github.com/mchzakaria", icon: Github, label: "GitHub", value: "github.com/mchzakaria", testId: "contact-github-link" },
              ].map(({ href, icon: Icon, label, value, testId }) => (
                <MagneticButton
                  key={testId}
                  as="a"
                  href={href}
                  target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-4 group"
                  data-testid={testId}
                  strength={0.2}
                  radius={120}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {value}
                    </p>
                  </div>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[320px]"
                data-testid="contact-success"
              >
                <CheckCircle className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border/60 rounded-2xl p-5 sm:p-6 space-y-4"
                data-testid="contact-form"
              >
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
                    placeholder="Your name"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
                    placeholder="you@example.com"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    disabled={isSubmitting}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                    data-testid="input-message"
                  />
                </div>
                {error && (
                  <div className="text-rose-500 text-xs font-medium bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-lg">
                    {error}
                  </div>
                )}
                <MagneticButton
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:pointer-events-none"
                  data-testid="button-submit"
                  strength={isSubmitting ? 0 : 0.15}
                  radius={150}
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
