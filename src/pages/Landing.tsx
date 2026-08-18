import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useState } from "react";
import { Link } from "react-router";
import { services } from "@/lib/services-data";
import logo from "@/assets/logo.svg";
import {
  ArrowRight,
  BarChart3,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Calendar,
  Globe,
  Megaphone,
  Search,
} from "lucide-react";

const serviceIcons: Record<string, typeof Globe> = {
  "social-media-marketing": Instagram,
  "meta-google-ads": Megaphone,
  "website-development": Globe,
  "seo-analytics": Search,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We begin by understanding your business inside and out — your goals, your audience, and the competitive landscape you operate in.",
    icon: Target,
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "A clear, data-informed roadmap built around your specific milestones, designed to deliver measurable outcomes at every stage.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Execute",
    description:
      "Our creative and technical team brings the strategy to life — content, campaigns, and code, all working in concert.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Scale",
    description:
      "We measure everything, refine continuously, and double down on what moves the needle — turning good results into great ones.",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    business: "Bloom Beauty Studio",
    text: "Our Instagram grew from 500 to 8,000 engaged followers in just three months. Nearly 40% of our new customers now find us through social media — the ROI speaks for itself.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    business: "TechFlow Solutions",
    text: "The Meta Ads campaign they built delivered a 5x return in the very first month. They understand how to target precisely and convert efficiently — exactly what we needed.",
    rating: 5,
  },
  {
    name: "Ananya Desai",
    business: "GreenLeaf Organics",
    text: "Our website redesign doubled our conversion rate. The team was responsive, creative, and genuinely invested in getting the details right. The best decision we made for our business.",
    rating: 5,
  },
];

const serviceOptions = [
  "Social Media Marketing",
  "Meta & Google Ads",
  "Website Development",
  "SEO & Analytics",
  "Full Digital Package",
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
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#process" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              How We Work
            </a>
            <a href="#results" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Results
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] transition-all hover:shadow-lg hover:shadow-[#059669]/25"
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
            <a href="#services" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Services
            </a>
            <a href="#process" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              How We Work
            </a>
            <a href="#results" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Results
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Contact
            </a>
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] text-white text-sm font-semibold mt-1"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-anvaya-dark text-white">
      <div className="absolute inset-0 bg-mesh-hero opacity-60" />
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#059669]/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-[#D97706]/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-40 left-[20%] w-32 h-32 border border-[#059669]/20 rounded-2xl rotate-12 animate-float-delayed" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669]/15 border border-[#059669]/30 text-[#34d399] text-sm font-medium mb-6">
            <Rocket className="w-4 h-4" />
            Your Growth Partner
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            Growing Brands{" "}
            <span className="text-gradient-green">Digitally</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
            Strategy. Growth. Impact. We partner with businesses that are ready
            to stand out, scale faster, and build lasting digital presence through
            creative marketing that delivers measurable results.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#059669] text-white font-semibold text-base hover:bg-[#047857] transition-all hover:shadow-xl hover:shadow-[#059669]/30 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Consultation
            </Link>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { value: "50+", label: "Brands Scaled" },
            { value: "5×", label: "Average ROAS" },
            { value: "10M+", label: "Impressions Generated" },
            { value: "98%", label: "Client Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 50 480 0 720 30C960 60 1200 10 1440 30V60H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669]/10 text-[#059669] text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Every channel that{" "}
            <span className="text-gradient-green">drives growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-lg">
            From social media to search engines, we deliver end-to-end digital marketing built around your business goals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 gap-6"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? Globe;
            return (
              <motion.div key={service.slug} variants={fadeUp}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block relative bg-card rounded-2xl border border-border/60 p-7 sm:p-8 hover:shadow-xl hover:border-[#059669]/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color}`}>
                      <Icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-[#059669] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#059669] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feat) => (
                      <span key={feat} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-[#059669]" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 bg-anvaya-dark-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-green opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/10 text-[#D97706] text-sm font-semibold mb-4">
            <BarChart3 className="w-4 h-4" />
            How We Work
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            A proven path to{" "}
            <span className="text-gradient-gold">digital growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-lg">
            Our process is transparent and structured, so you always know where your investment is going and what it's delivering.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map((step, i) => (
            <motion.div key={step.step} variants={fadeUp} className="relative">
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-[#059669]/30 to-[#D97706]/30" />
              )}
              <div className="relative bg-card rounded-2xl border border-border/60 p-7 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#059669]/10 mb-5">
                  <step.icon className="w-7 h-7 text-[#059669]" />
                </div>
                <div className="text-xs font-bold text-[#D97706] uppercase tracking-widest mb-2">
                  Step {step.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="results" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669]/10 text-[#059669] text-sm font-semibold mb-4">
            <Users className="w-4 h-4" />
            Client Results
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trusted by businesses{" "}
            <span className="text-gradient-green">ready to grow</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-lg">
            The results we deliver speak louder than any pitch. Here's what our clients have to say.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="bg-card rounded-2xl border border-border/60 p-7 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#D97706]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#059669]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#059669]">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.business}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LeadFormSection() {
  const submitLead = useMutation(api.leads.submit);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await submitLead({
        name: formState.name,
        email: formState.email,
        phone: formState.phone || undefined,
        businessName: formState.businessName || undefined,
        service: formState.service,
        message: formState.message || undefined,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again or DM us on Instagram.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-anvaya-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero opacity-40" />
      <div className="absolute top-10 right-[5%] w-72 h-72 rounded-full bg-[#059669]/8 blur-3xl" />
      <div className="absolute bottom-10 left-[5%] w-56 h-56 rounded-full bg-[#D97706]/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#059669]/15 border border-[#059669]/30 text-[#34d399] text-sm font-semibold mb-6">
              <MessageCircle className="w-4 h-4" />
              Let's Talk Growth
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ready to{" "}
              <span className="text-gradient-green">scale your brand?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8">
              Tell us about your business and where you want to take it. We'll get back within 24 hours with a tailored growth plan — completely free, no strings attached.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#059669]/15 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#059669]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">No Commitment</div>
                  <div className="text-gray-500 text-xs">A free strategy session with zero obligation</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">24-Hour Response</div>
                  <div className="text-gray-500 text-xs">You'll hear from us within one business day</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Custom Strategy</div>
                  <div className="text-gray-500 text-xs">A plan built around your specific goals and market</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <span>Or reach us directly on</span>
              <a
                href="https://www.instagram.com/growwithanvaya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
              >
                <Instagram className="w-4 h-4" />
                @growwithanvaya
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-white/5 backdrop-blur-sm border border-[#059669]/30 rounded-2xl p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#059669]/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#059669]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Thank you!</h3>
                <p className="text-gray-400 leading-relaxed">
                  We've received your inquiry. Our team will reach out within 24 hours with a customized growth plan for your business.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="you@business.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formState.businessName}
                      onChange={handleChange}
                      placeholder="Your business name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Service Interested In *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all"
                    >
                      <option value="" disabled className="bg-[#0F1D33] text-gray-400">
                        Select a service
                      </option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s} className="bg-[#0F1D33] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Tell us about your goals
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What are you looking to achieve? Any specific goals or challenges?"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#059669]/50 focus:ring-1 focus:ring-[#059669]/30 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] transition-all hover:shadow-lg hover:shadow-[#059669]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get Your Free Growth Plan
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  By submitting, you agree to our communication terms. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1528] text-gray-400 py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="Grow with Anvaya" className="h-8 mb-4 brightness-200" />
            <p className="text-sm leading-relaxed max-w-xs">
              We help businesses grow through strategic digital marketing — creative content, performance advertising, and measurable results.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/growwithanvaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#059669]/20 hover:text-[#059669] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/growwithanvaya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#059669]/20 hover:text-[#059669] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#process" className="text-sm hover:text-white transition-colors">How We Work</a></li>
              <li><a href="#results" className="text-sm hover:text-white transition-colors">Results</a></li>
              <li><a href="#contact" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">Client Dashboard</Link></li>
              <li><a href="https://www.instagram.com/growwithanvaya" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-[#059669]" />
                <a href="mailto:hello@growwithanvaya.com" className="hover:text-white transition-colors">
                  hello@growwithanvaya.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#059669]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Instagram className="w-4 h-4 text-[#059669]" />
                <a
                  href="https://www.instagram.com/growwithanvaya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @growwithanvaya
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Grow with Anvaya. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Strategy. Growth. Impact.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <LeadFormSection />
      <Footer />
    </div>
  );
}
