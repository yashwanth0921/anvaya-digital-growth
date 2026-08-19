import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useAction, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { services } from "@/lib/services-data";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  Menu,
  X,
  Shield,
  Zap,
  Target,
  Send,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Grow with Anvaya" className="h-8 sm:h-9" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </Link>
            <Link to="/#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How We Work
            </Link>
            <Link to="/#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#691E2A] text-white text-sm font-semibold hover:bg-[#531822] transition-all hover:shadow-lg hover:shadow-[#691E2A]/25"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-border/50 px-4 pb-4"
        >
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/#services" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Services
            </Link>
            <Link to="/#process" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              How We Work
            </Link>
            <Link to="/#contact" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default function BookPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const createBooking = useMutation(api.bookings.create);
  const sendBookingNotifications = useAction(api.actions.sendBookingNotifications.sendBookingNotifications);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createBooking({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        service: formState.service,
        preferredDate: formState.preferredDate,
        preferredTime: formState.preferredTime,
        notes: formState.notes || undefined,
      });
      // Send emails + append to sheet
      const result = await sendBookingNotifications({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        service: formState.service,
        preferredDate: formState.preferredDate,
        preferredTime: formState.preferredTime,
        notes: formState.notes || undefined,
      });
      setIsSubmitted(true);
      if (result?.sheetAppended) {
        toast.success("Booking confirmed! Notifications sent.");
      } else {
        toast.success("Booking confirmed!");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Booking failed: ${msg}`);
      console.error("Booking form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const day = date.getDay();
    // Skip weekends
    if (day === 0 || day === 6) return null;
    return date.toISOString().split("T")[0];
  }).filter(Boolean) as string[];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-anvaya-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-40" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#691E2A]/15 border border-[#691E2A]/30 text-[#D9B280] text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Schedule a Consultation
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Let's plan your{" "}
              <span className="text-gradient-green">growth strategy</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto">
              Pick a time that works for you. Our team will review your business and come prepared with actionable recommendations — completely free.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-[#691E2A]/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#691E2A]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Booking Confirmed</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                We've received your scheduling request for <strong>{formState.preferredDate}</strong> at <strong>{formState.preferredTime}</strong>. Our team will send a confirmation within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#691E2A] text-white font-semibold text-sm hover:bg-[#531822] transition-all"
                >
                  View Your Dashboard
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact info */}
                <motion.div variants={fadeUp}>
                  <h2 className="text-lg font-bold mb-4">Your Information</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="you@business.com"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="mt-5 max-w-sm">
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                    />
                  </div>
                </motion.div>

                {/* Service */}
                <motion.div variants={fadeUp}>
                  <h2 className="text-lg font-bold mb-4">Service</h2>
                  <div className="relative">
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                    >
                      <option value="" disabled>
                        Choose a service to discuss
                      </option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="Full Digital Package">Full Digital Package (All Services)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </motion.div>

                {/* Date & Time */}
                <motion.div variants={fadeUp}>
                  <h2 className="text-lg font-bold mb-4">Preferred Date & Time</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Date *
                      </label>
                      <div className="relative">
                        <select
                          name="preferredDate"
                          value={formState.preferredDate}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                        >
                          <option value="" disabled>Select a date</option>
                          {availableDates.map((d) => {
                            const date = new Date(d);
                            const formatted = date.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            });
                            return (
                              <option key={d} value={d}>
                                {formatted}
                              </option>
                            );
                          })}
                        </select>
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Time *
                      </label>
                      <div className="relative">
                        <select
                          name="preferredTime"
                          value={formState.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
                        >
                          <option value="" disabled>Select a time</option>
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Notes */}
                <motion.div variants={fadeUp}>
                  <h2 className="text-lg font-bold mb-4">Additional Notes</h2>
                  <textarea
                    name="notes"
                    value={formState.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Anything you'd like us to know before the call — current challenges, goals, or specific questions..."
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all resize-none"
                  />
                </motion.div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#691E2A] text-white font-semibold text-base hover:bg-[#531822] transition-all hover:shadow-lg hover:shadow-[#691E2A]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </motion.div>

                {/* Trust signals */}
                <motion.div variants={fadeUp} className="grid sm:grid-cols-3 gap-4 pt-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                    <Shield className="w-5 h-5 text-[#691E2A] shrink-0" />
                    <span className="text-xs text-muted-foreground">Free consultation — no commitment</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                    <Zap className="w-5 h-5 text-[#B28452] shrink-0" />
                    <span className="text-xs text-muted-foreground">Response within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                    <Target className="w-5 h-5 text-[#B28452] shrink-0" />
                    <span className="text-xs text-muted-foreground">Custom strategy prepared</span>
                  </div>
                </motion.div>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
