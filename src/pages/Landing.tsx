import { motion } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { services } from "@/lib/services-data";
import logo from "@/assets/logo.svg";import {
  ArrowRight,
  BarChart3,
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
  Eye,
  Quote,
  Smartphone,
  Palette,
  ChevronLeft,
  Clock,
  Award,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef } from "react";

const serviceIcons: Record<string, typeof Globe> = {
  "social-media-marketing": Megaphone,
  "meta-google-ads": Megaphone,
  "website-development": Globe,
  "seo-analytics": Search,
  "app-development": Smartphone,
  "brand-identity": Palette,

};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};





const clientLogos = [
  { name: "Bloom Beauty Studio", initials: "BB" },
  { name: "TechFlow Solutions", initials: "TF" },
  { name: "GreenLeaf Organics", initials: "GL" },
  { name: "Urban Bites Cafe", initials: "UB" },
  { name: "FreshCart India", initials: "FC" },
  { name: "StyleCraft Salon", initials: "SC" },
  { name: "Mindful Spaces", initials: "MS" },
  { name: "PureFit Nutrition", initials: "PF" },
];

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
    text: "Our Instagram grew from 500 to 8,000 engaged followers in just three months. Nearly 40% of our new customers now find us through social media — the ROI speaks for itself. Grow with Anvaya truly transformed our digital presence.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Rahul Mehta",
    business: "TechFlow Solutions",
    text: "The Meta Ads campaign they built delivered a 5x return in the very first month. They understand how to target precisely and convert efficiently — exactly what we needed. Grow with Anvaya is our go-to growth partner.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Ananya Desai",
    business: "GreenLeaf Organics",
    text: "Our website redesign doubled our conversion rate. The team was responsive, creative, and genuinely invested in getting the details right. The best decision we made for our business. Thank you, Grow with Anvaya!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Vikram Patel",
    business: "Urban Bites Cafe",
    text: "From zero online presence to 500+ monthly orders — Grow with Anvaya built our entire digital ecosystem. The app they designed is beautiful and our customers love ordering through it.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  },

  {
    name: "Arjun Nair",
    business: "StyleCraft Salon",
    text: "The brand identity they created for us is absolutely stunning. Every touchpoint — from our logo to our social media — feels premium and cohesive. Grow with Anvaya elevated our entire brand.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
  },
  {
    name: "Meera Joshi",
    business: "Mindful Spaces",
    text: "We needed a mobile app for our wellness platform and Grow with Anvaya delivered beyond our expectations. Smooth, intuitive, and our members absolutely love it. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&q=80",
  },

];

const serviceOptions = [
  "Social Media Marketing",
  "Meta & Google Ads",
  "Website Development",
  "SEO & Analytics",
  "App Development",
  "Brand Identity & Design",
  "Full Digital Package",
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Grow with Anvaya" className="h-9 sm:h-10" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Work
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
            <a href="#services" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Services
            </a>
            <a href="#work" onClick={() => setIsOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-muted transition-colors">
              Work
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
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#691E2A] text-white text-sm font-semibold mt-1"
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
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#691E2A]/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-[#B28452]/10 blur-3xl animate-float-delayed" />
      <div className="absolute top-40 left-[20%] w-32 h-32 border border-[#691E2A]/20 rounded-2xl rotate-12 animate-float-delayed" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:items-start">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#691E2A]/15 border border-[#691E2A]/30 text-[#D9B280] text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Your Growth Partner
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]">
              <span className="block text-[#F9EEE4]">Grow with</span>
              <span className="block text-[#F9EEE4]">Anvaya</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-sm sm:text-base font-semibold uppercase tracking-[0.25em] text-[#B28452]">
              Growing Brands Digitally
            </motion.p>

            <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl">
              Strategy. Growth. Impact. We partner with businesses that are ready
              to stand out, scale faster, and build lasting digital presence through
              creative marketing that delivers measurable results.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#691E2A] text-white font-semibold text-base hover:bg-[#531822] transition-all hover:shadow-xl hover:shadow-[#691E2A]/30 hover:-translate-y-0.5 animate-pulse-slow"
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

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Shield, text: "100% Free Consultation" },
                { icon: Clock, text: "24-Hour Response" },
                { icon: Award, text: "50+ Brands Served" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <badge.icon className="w-3.5 h-3.5 text-[#D9B280]" />
                  <span className="text-xs font-medium text-gray-400">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>


        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
        >
          {[
            { target: 50, suffix: "+", label: "Brands Scaled" },
            { target: 5, suffix: "×", label: "Average ROAS" },
            { target: 10, suffix: "M+", label: "Impressions Generated" },
            { target: 98, suffix: "%", label: "Client Retention" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
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
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#691E2A]/10 text-[#691E2A] text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Every channel that{" "}
            <span className="text-gradient-green">drives growth</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-muted-foreground text-lg">
            From social media to search engines, we deliver end-to-end digital marketing and tech solutions built around your business goals.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? Globe;
            return (
              <motion.div key={service.slug} variants={fadeUp}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block relative bg-card rounded-2xl border border-border/60 p-6 hover:shadow-xl hover:border-[#691E2A]/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${service.color}`}>
                      <Icon className={`w-5 h-5 ${service.iconColor}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-[#691E2A] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#691E2A] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.slice(0, 3).map((feat) => (
                      <span key={feat} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-muted text-[11px] font-medium text-muted-foreground">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#691E2A]" />
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

function ClientLogosBar() {
  return (
    <section className="py-12 border-y border-border/40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="text-center mb-8"
        >
          <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by forward-thinking brands
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {clientLogos.map((client) => (
            <motion.div
              key={client.name}
              variants={fadeUp}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border/40 hover:border-[#691E2A]/20 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#691E2A]/10 to-[#B28452]/10 flex items-center justify-center">
                <span className="text-sm font-bold text-[#691E2A]">{client.initials}</span>
              </div>
              <span className="text-sm font-semibold text-muted-foreground hidden sm:inline">
                {client.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const workShowcase = [
  {
    title: "Bloom Beauty Studio",
    category: "Social Media Growth",
    description: "Transformed a local beauty studio's Instagram presence from 500 to 8,000+ engaged followers in 3 months.",
    posterImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=500&fit=crop&q=80",
    results: ["16× follower growth", "40% new customers from social", "3× engagement rate"],
    metrics: { label: "Followers Gained", value: "7,500+" },
  },
  {
    title: "TechFlow Solutions",
    category: "Meta & Google Ads",
    description: "Built and optimized a full-funnel ad campaign delivering 5× ROAS in the first month for a B2B SaaS company.",
    posterImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop&q=80",
    results: ["5× ROAS", "60% lower CPA", "2.3M impressions"],
    metrics: { label: "Return on Ad Spend", value: "5×" },
  },
  {
    title: "GreenLeaf Organics",
    category: "Website & SEO",
    description: "Complete website redesign with SEO optimization that doubled conversion rate and tripled organic traffic.",
    posterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop&q=80",
    results: ["2× conversion rate", "3× organic traffic", "Page 1 for 12 keywords"],
    metrics: { label: "Conversion Lift", value: "2×" },
  },
  {
    title: "Urban Bites Cafe",
    category: "Full Digital Package",
    description: "End-to-end digital transformation — social media, local SEO, Google Ads, and a new ordering website.",
    posterImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&h=500&fit=crop&q=80",
    results: ["500+ monthly orders online", "Top 3 Google Maps", "4.8★ reviews"],
    metrics: { label: "Monthly Orders", value: "500+" },
  },
  {
    title: "StyleCraft Salon",
    category: "Brand Identity",
    description: "Complete brand identity redesign — logo, color system, brand guidelines, and social media kit for a premium salon chain.",
    posterImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&h=500&fit=crop&q=80",
    results: ["3× brand recognition", "2× average ticket value", "Consistent cross-platform identity"],
    metrics: { label: "Brand Recognition", value: "3×" },
  },
  {
    title: "Mindful Spaces",
    category: "App Development",
    description: "Custom wellness app with booking, membership management, and push notifications — built for iOS and Android.",
    posterImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=500&fit=crop&q=80",
    results: ["10K+ downloads in 2 months", "4.8★ App Store rating", "60% retention rate"],
    metrics: { label: "App Downloads", value: "10K+" },
  },
];

function WorkShowcaseSection() {
  return (
    <section id="work" className="py-20 sm:py-28 bg-anvaya-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-hero opacity-30" />
      <div className="absolute top-20 right-[5%] w-80 h-80 rounded-full bg-[#691E2A]/5 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-64 h-64 rounded-full bg-[#B28452]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B28452]/10 text-[#D9B280] text-sm font-semibold mb-4">
            <Eye className="w-4 h-4" />
            Our Work
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Projects that <span className="text-gradient-gold">delivered results</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-gray-400 text-lg">
            Real brands, real strategies, real growth. Here's the impact we've created for our clients.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-5"
        >
          {workShowcase.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="group relative rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden bg-black rounded-2xl">
                <img
                  src={project.posterImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#691E2A]/80 text-white text-[11px] font-semibold mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="shrink-0 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-right">
                      <div className="text-xl font-extrabold text-[#D9B280] leading-tight">{project.metrics.value}</div>
                      <div className="text-[10px] text-gray-400">{project.metrics.label}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {project.results.map((r) => (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-[11px] font-medium"
                      >
                        <TrendingUp className="w-3 h-3 text-[#D9B280]" />
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#691E2A] text-white font-semibold text-sm hover:bg-[#531822] transition-all hover:shadow-lg hover:shadow-[#691E2A]/30"
          >
            Let's Build Your Success Story
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}





function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-green opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B28452]/10 text-[#B28452] text-sm font-semibold mb-4">
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
            <motion.div key={step.step} variants={fadeUp} className="relative h-full">
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-[#691E2A]/30 to-[#B28452]/30" />
              )}
              <div className="relative bg-card rounded-2xl border border-border/60 p-7 text-center hover:shadow-lg transition-shadow flex flex-col items-center h-full">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#691E2A]/10 mb-5">
                  <step.icon className="w-7 h-7 text-[#691E2A]" />
                </div>
                <div className="text-xs font-bold text-[#B28452] uppercase tracking-widest mb-2">
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  });

  return (
    <section id="results" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#691E2A]/10 text-[#691E2A] text-sm font-semibold mb-4">
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

        {/* Carousel controls */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Swipeable carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex-none w-[85vw] sm:w-[420px] lg:w-[380px]"
              >
                <div className="h-full bg-card rounded-2xl border border-border/60 p-6 sm:p-7 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-1 mb-2">
                    <Quote className="w-5 h-5 text-[#B28452]/40" />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-[#B28452]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#691E2A]/20"
                    />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.business}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-[#691E2A] w-6"
                  : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
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
      toast.success("Inquiry submitted successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Submission failed: ${msg}`);
      console.error("Lead form error:", err);
      toast.error(`Error: ${msg}`);
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
      <div className="absolute top-10 right-[5%] w-72 h-72 rounded-full bg-[#691E2A]/8 blur-3xl" />
      <div className="absolute bottom-10 left-[5%] w-56 h-56 rounded-full bg-[#B28452]/8 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#691E2A]/15 border border-[#691E2A]/30 text-[#D9B280] text-sm font-semibold mb-6">
              <Send className="w-4 h-4" />
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
                <div className="w-10 h-10 rounded-xl bg-[#691E2A]/15 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#691E2A]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">No Commitment</div>
                  <div className="text-gray-500 text-xs">A free strategy session with zero obligation</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#B28452]/15 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-[#B28452]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">24-Hour Response</div>
                  <div className="text-gray-500 text-xs">You'll hear from us within one business day</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#B28452]/15 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 text-[#B28452]" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Custom Strategy</div>
                  <div className="text-gray-500 text-xs">A plan built around your specific goals and market</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-white/5 backdrop-blur-sm border border-[#691E2A]/30 rounded-2xl p-8 sm:p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#691E2A]/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-[#691E2A]" />
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
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
                      className="w-full appearance-none px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#691E2A] text-white font-semibold text-sm hover:bg-[#531822] transition-all hover:shadow-lg hover:shadow-[#691E2A]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Your Message
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

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl font-extrabold text-gradient-gold">
      {count}{suffix}
    </div>
  );
}



function Footer() {
  return (
    <footer className="bg-[#430D12] text-gray-400 py-14 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="Grow with Anvaya" className="h-20 mb-4" />
            <p className="text-sm leading-relaxed max-w-xs">
              We help businesses grow through strategic digital marketing — creative content, performance advertising, and measurable results.
            </p>
          </div>

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

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#work" className="text-sm hover:text-white transition-colors">Our Work</a></li>
              <li><a href="#services" className="text-sm hover:text-white transition-colors">All Services</a></li>
              <li><a href="#process" className="text-sm hover:text-white transition-colors">How We Work</a></li>
              <li><a href="#results" className="text-sm hover:text-white transition-colors">Results</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#contact" className="text-sm hover:text-white transition-colors">Contact Us</a></li>
              <li><Link to="/book" className="text-sm hover:text-white transition-colors">Book a Call</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-white transition-colors">Client Dashboard</Link></li>
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

function CTABanner() {
  return (
    <section className="py-16 bg-anvaya-dark text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ready to <span className="text-gradient-gold">grow your brand?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-6 max-w-2xl mx-auto">
            Join 50+ brands that chose Grow with Anvaya to transform their digital presence. Let's talk about your growth.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href="mailto:growwithanvaya@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#691E2A] text-white font-bold text-base hover:bg-[#531822] transition-all hover:shadow-xl hover:shadow-[#691E2A]/30 hover:-translate-y-0.5"
            >
              <Send className="w-5 h-5" />
              growwithanvaya@gmail.com
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ClientLogosBar />
      <WorkShowcaseSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTABanner />
      <LeadFormSection />
      <Footer />
    </div>
  );
}
