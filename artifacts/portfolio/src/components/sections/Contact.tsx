import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                { href: "mailto:zakaria.machmach@gmail.com", icon: Mail, label: "Email", value: "zakaria.machmach@gmail.com", testId: "contact-email-link" },
                { href: "https://linkedin.com/in/zakariamachmach", icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/zakariamachmach", testId: "contact-linkedin-link" },
                { href: "https://github.com/zakariamachmach", icon: Github, label: "GitHub", value: "github.com/zakariamachmach", testId: "contact-github-link" },
              ].map(({ href, icon: Icon, label, value, testId }) => (
                <MagneticButton
                  key={testId}
                  as="a"
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
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
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
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
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background border border-border/60 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    data-testid="input-message"
                  />
                </div>
                <MagneticButton
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all"
                  data-testid="button-submit"
                  strength={0.15}
                  radius={150}
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
