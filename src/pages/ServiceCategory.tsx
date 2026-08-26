import { useParams, useLocation, Link } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  Calendar,
  Sparkles,
  Megaphone,
  Globe,
  Palette,
} from "lucide-react";
import logo from "@/assets/logo.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const categories: Record<
  string,
  {
    title: string;
    tagline: string;
    description: string;
    icon: typeof Megaphone;
    gradient: string;
    services: {
      slug: string;
      title: string;
      brief: string;
      image: string;
      features: string[];
    }[];
  }
> = {
  "digital-marketing": {
    title: "Digital Marketing",
    tagline: "Reach. Engage. Convert.",
    description:
      "We help brands reach the right audience, generate demand, and turn attention into measurable results. From paid campaigns to organic growth — we cover every channel that matters.",
    icon: Megaphone,
    gradient: "from-[#691E2A] to-[#8B2E3D]",
    services: [
      {
        slug: "performance-marketing",
        title: "Performance Marketing",
        brief: "Data-driven campaigns that deliver measurable ROI. We optimize every rupee for maximum conversions and scalable growth.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        features: ["Google Ads", "Meta Ads", "ROAS Optimization", "A/B Testing"],
      },
      {
        slug: "meta-google-ads",
        title: "Meta & Google Ads",
        brief: "Precision-targeted ad campaigns across Facebook, Instagram, and Google. We handle creative, bidding, and optimization for maximum returns.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop",
        features: ["Facebook & Instagram", "Google Search & Display", "Retargeting", "Landing Pages"],
      },
      {
        slug: "seo-analytics",
        title: "SEO & Analytics",
        brief: "Dominate search results with data-driven SEO. We optimize your website to rank higher and attract organic traffic that converts.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        features: ["Keyword Research", "On-Page SEO", "Local SEO", "Analytics Reports"],
      },
      {
        slug: "social-media-marketing",
        title: "Social Media Marketing",
        brief: "Build a powerful brand presence across Instagram, Facebook, and LinkedIn. We create scroll-stopping content that drives engagement.",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=500&fit=crop",
        features: ["Content Strategy", "Community Management", "Reels & Stories", "Analytics"],
      },
      {
        slug: "email-marketing",
        title: "Email Marketing",
        brief: "High-converting email campaigns that nurture leads and drive revenue. From welcome sequences to product launches.",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=500&fit=crop",
        features: ["Email Automation", "Newsletter Campaigns", "Drip Sequences", "A/B Testing"],
      },
    ],
  },
  "technology": {
    title: "Technology",
    tagline: "Build. Automate. Scale.",
    description:
      "We build smarter digital experiences with technology designed around your business. From websites to AI-powered solutions, we turn ideas into powerful digital products.",
    icon: Globe,
    gradient: "from-[#B28452] to-[#D4A843]",
    services: [
      {
        slug: "website-development",
        title: "Website Development",
        brief: "Fast, beautiful, conversion-optimized websites that turn visitors into customers. Mobile-first designs built for speed and SEO.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
        features: ["Custom Design", "E-Commerce", "Landing Pages", "Speed Optimized"],
      },
      {
        slug: "app-development",
        title: "App Development",
        brief: "Native and cross-platform mobile apps for iOS and Android. We build fast, beautiful apps that keep customers engaged.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
        features: ["iOS & Android", "Cross-Platform", "UI/UX Design", "App Store Launch"],
      },
      {
        slug: "web-applications",
        title: "Web Applications",
        brief: "Custom web apps built with modern frameworks. From dashboards to SaaS platforms — scalable, secure, and lightning fast.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
        features: ["React/Next.js", "Node.js Backend", "Cloud Hosting", "API Integration"],
      },
      {
        slug: "ai-solutions",
        title: "AI Solutions",
        brief: "Integrate artificial intelligence into your business. From chatbots to predictive analytics — automation that works.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
        features: ["AI Chatbots", "Predictive Analytics", "Process Automation", "Custom AI Models"],
      },
      {
        slug: "automation",
        title: "Automation",
        brief: "Automate repetitive tasks and workflows. Save time, reduce errors, and let your team focus on what matters.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
        features: ["Workflow Automation", "CRM Integration", "Email Sequences", "Data Sync"],
      },
    ],
  },
  "creative": {
    title: "Creative",
    tagline: "Design. Create. Inspire.",
    description:
      "Make your brand impossible to ignore with content and design that connects. We craft visual identities and creative campaigns that leave lasting impressions.",
    icon: Palette,
    gradient: "from-[#8B2E3D] to-[#691E2A]",
    services: [
      {
        slug: "brand-identity",
        title: "Brand Identity & Design",
        brief: "Complete brand identity systems — logo, colors, typography, and guidelines that make your business instantly recognizable.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
      },
      {
        slug: "graphic-design",
        title: "Graphic Design",
        brief: "Eye-catching visuals for social media, ads, presentations, and print. We design graphics that communicate and convert.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop",
        features: ["Social Media Graphics", "Ad Creatives", "Presentations", "Print Design"],
      },
    ],
  },
};

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
              Book a Strategy Call
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
            <Link
              to="/book"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#691E2A] text-white text-sm font-semibold mt-1"
            >
              <Calendar className="w-4 h-4" />
              Book a Strategy Call
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

export default function ServiceCategory() {
  const location = useLocation();
  const slug = location.pathname.split("/").pop() || "";
  const category = categories[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground mb-4">Category not found.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-[#691E2A] font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 pb-16 bg-anvaya-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#691E2A]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#B28452]/10 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                All Services
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#D9B280] mb-1">
                  {category.tagline}
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  {category.title}
                </h1>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              {category.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="space-y-8"
          >
            {category.services.map((service, i) => (
              <motion.div
                key={service.slug}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className={`group block bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-2xl hover:shadow-[#691E2A]/10 hover:border-[#691E2A]/30 transition-all duration-300 ${
                    i % 2 === 0 ? "lg:flex" : "lg:flex lg:flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="relative lg:w-1/2 h-64 sm:h-72 lg:h-auto overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${category.gradient} text-white text-xs font-bold`}>
                        <Sparkles className="w-3 h-3" />
                        {service.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-xl sm:text-2xl font-extrabold mb-3 group-hover:text-[#691E2A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      {service.brief}
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-[#691E2A] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#691E2A] group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-anvaya-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Ready to get started with <span className="text-gradient-gold">{category.title}</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Let's discuss how we can help your business grow. Custom packages available based on your specific goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#691E2A] text-white font-semibold hover:bg-[#531822] transition-all hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Book a Strategy Call
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
              >
                Send Us a Message
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
