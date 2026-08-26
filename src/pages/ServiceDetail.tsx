import { useParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";
import { getServiceBySlug, services } from "@/lib/services-data";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Menu,
  X,
  Send,
  Clock,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
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

function CommentsSection({ serviceSlug }: { serviceSlug: string }) {
  const { isAuthenticated } = useAuth();
  const comments = useQuery(api.comments.listByService, { serviceSlug });
  const addComment = useMutation(api.comments.add);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await addComment({ serviceSlug, text: text.trim() });
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-t border-border/60 pt-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageSquare className="w-5 h-5 text-[#691E2A]" />
        <h3 className="text-xl font-bold">Discussion</h3>
        {comments && (
          <span className="text-sm text-muted-foreground">({comments.length})</span>
        )}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Share your thoughts or ask a question about this service..."
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-[#691E2A]/50 focus:ring-1 focus:ring-[#691E2A]/30 transition-all resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#691E2A] text-white text-sm font-semibold hover:bg-[#531822] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-6 rounded-xl bg-muted/50 border border-border/60 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Sign in to join the conversation.
          </p>
          <Link
            to="/auth?returnTo=/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#691E2A] text-white text-sm font-semibold hover:bg-[#531822] transition-all"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {comments === undefined ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/30 border border-border/40"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#691E2A]/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#691E2A]">
                    {comment.userName.split(" ").map((n: string) => n[0]).join("")}
                  </span>
                </div>
                <span className="text-sm font-semibold">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                {comment.text}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}

function ServiceHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-anvaya-dark/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white/80 text-sm font-medium">{alt}</p>
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, value, label, color }: { icon: typeof TrendingUp; value: string; label: string; color: string }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4, scale: 1.03 }}
      className="relative bg-white rounded-2xl border border-border/60 p-6 text-center overflow-hidden group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} mb-3`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-2xl font-extrabold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const related = services.filter(s => s.slug !== currentSlug).slice(0, 3);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={stagger}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold mb-8">Explore Other Services</h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {related.map((s) => {
          const SIcon = s.icon;
          return (
            <motion.div key={s.slug} variants={fadeUp}>
              <Link
                to={`/services/${s.slug}`}
                className="group block bg-card rounded-2xl border border-border/60 p-5 hover:shadow-xl hover:border-[#691E2A]/30 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} mb-3`}>
                  <SIcon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <h3 className="font-bold text-sm mb-1 group-hover:text-[#691E2A] transition-colors">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{s.description}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-[#691E2A] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-muted-foreground mb-4">Service not found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#691E2A] font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  const stats = [
    { icon: TrendingUp, value: "3×", label: "Average ROI", color: "from-green-500 to-emerald-500" },
    { icon: Target, value: "50+", label: "Brands Served", color: "from-[#691E2A] to-[#8B2E3D]" },
    { icon: Zap, value: "24h", label: "Response Time", color: "from-amber-500 to-orange-500" },
    { icon: Sparkles, value: "98%", label: "Client Retention", color: "from-blue-500 to-indigo-500" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 pb-12 bg-anvaya-dark text-white relative overflow-hidden">
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

            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
              >
                <Icon className={`w-8 h-8 ${service.iconColor}`} />
              </motion.div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  {service.title}
                </h1>
                <p className="text-lg text-gray-400 mt-1">{service.tagline}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#691E2A] text-white font-semibold text-base hover:bg-[#531822] transition-all hover:shadow-xl hover:shadow-[#691E2A]/30"
              >
                <Calendar className="w-4 h-4" />
                Book a Consultation
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                Send Us a Message
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative -mt-6 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceHeroImage src={service.heroImage} alt={`${service.title} - Grow with Anvaya`} />
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {/* Description */}
            <motion.div variants={fadeUp} className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-[#691E2A]/50 to-transparent" />
                <h2 className="text-2xl font-bold">About This Service</h2>
                <div className="h-px flex-1 bg-gradient-to-l from-[#B28452]/50 to-transparent" />
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feat, i) => (
                  <motion.div
                    key={feat}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center gap-3 p-5 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 border border-border/40 hover:border-[#691E2A]/30 hover:shadow-md transition-all cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#691E2A]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#691E2A]" />
                    </div>
                    <span className="text-sm font-semibold">{feat}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Why It Matters</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {service.benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                    className="relative bg-white rounded-2xl border border-border/60 p-6 overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#691E2A] to-[#B28452] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="text-3xl font-extrabold text-[#691E2A]/10 mb-2">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-bold mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {b.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">What You Receive</h2>
              <div className="bg-gradient-to-br from-[#691E2A]/5 to-[#B28452]/5 rounded-2xl border border-[#691E2A]/10 p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.deliverables.map((d, i) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#B28452]/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#B28452]">{i + 1}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{d}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mb-16">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-8 sm:p-10 rounded-2xl bg-anvaya-dark text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-mesh-hero opacity-30" />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#691E2A]/15 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-[#B28452]/15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-[#D9B280]" />
                    <span className="text-sm text-gray-400">Limited availability this month</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                    Ready to get started with <span className="text-gradient-gold">{service.title}</span>?
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-xl">
                    Custom packages available based on your specific goals and scale. Book a free consultation to discuss your needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/book"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#691E2A] text-white font-semibold text-sm hover:bg-[#531822] transition-all hover:shadow-lg hover:shadow-[#691E2A]/30"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule a Free Consultation
                    </Link>
                    <Link
                      to="/#contact"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                    >
                      <Shield className="w-4 h-4" />
                      No Commitment Required
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Related Services */}
            <RelatedServices currentSlug={service.slug} />

            {/* Comments */}
            <CommentsSection serviceSlug={service.slug} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
