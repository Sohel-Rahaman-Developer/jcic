import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Mail, Phone, Building2, CheckCircle2, Send } from "lucide-react";

const subjects = [
  "Submit My Startup",
  "Become a Mentor",
  "Investment Inquiry",
  "Partnership Opportunity",
  "Media & Press",
  "Technical Support",
  "General Inquiry",
];

const contactInfo = [
  { icon: MapPin, label: "Address", value: "JCIC Innovation Hub, 14 Park Street, Kolkata — 700016, West Bengal" },
  { icon: Mail, label: "Email", value: "hello@jcic.in" },
  { icon: Phone, label: "Phone", value: "+91 33 4000 1234" },
  { icon: Building2, label: "Office Hours", value: "Monday – Friday, 9:00 AM to 6:00 PM IST" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", organization: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message || form.message.length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const Field = ({ name, label, required = true }: { name: string; label: string; required?: boolean }) => (
    <div>
      <Label htmlFor={name} className="text-sm font-medium">{label}{required && " *"}</Label>
      <div className="mt-1.5">
        <Input
          id={name}
          value={(form as any)[name]}
          onChange={(e) => { setForm((f) => ({ ...f, [name]: e.target.value })); setErrors((errs) => ({ ...errs, [name]: "" })); }}
          className={errors[name] ? "border-destructive" : ""}
          data-testid={`input-${name}`}
        />
        {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name]}</p>}
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-to-br from-slate-950 via-[#0A1628] to-slate-900 pt-24 pb-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Get in Touch</Badge>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-white">Contact JCIC</h1>
              <p className="text-white/60 mt-3 text-lg max-w-xl">
                Whether you're a founder, investor, or researcher — we'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Reach Out to Us</h2>
                <p className="text-muted-foreground">Our team responds within one business day.</p>
              </div>
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{info.label}</p>
                        <p className="text-sm font-medium text-foreground">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {["Submit your startup to get listed", "Request a demo of the platform", "Join as a mentor or advisor", "Partner for events and hackathons"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-card-border rounded-2xl p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">We'll get back to you within 24–48 hours.</p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", subject: "", message: "" }); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field name="name" label="Full Name" />
                      <Field name="email" label="Email Address" />
                    </div>

                    <div>
                      <Label htmlFor="organization" className="text-sm font-medium">Organization (Optional)</Label>
                      <div className="mt-1.5">
                        <Input
                          id="organization"
                          placeholder="Your startup, institution, or company"
                          value={form.organization}
                          onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                          data-testid="input-organization"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Subject *</Label>
                      <div className="mt-1.5">
                        <Select value={form.subject} onValueChange={(v) => { setForm((f) => ({ ...f, subject: v })); setErrors((e) => ({ ...e, subject: "" })); }}>
                          <SelectTrigger className={errors.subject ? "border-destructive" : ""} data-testid="select-subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                      <div className="mt-1.5">
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help you..."
                          className={`min-h-32 resize-none ${errors.message ? "border-destructive" : ""}`}
                          value={form.message}
                          onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((errs) => ({ ...errs, message: "" })); }}
                          data-testid="textarea-message"
                        />
                        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-11 gap-2" data-testid="button-submit-contact">
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
