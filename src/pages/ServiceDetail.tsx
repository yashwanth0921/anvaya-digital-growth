import { useParams, useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useState, useEffect } from "react";
import { getServiceBySlug } from "@/lib/services-data";
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
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
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
            <div
              key={comment._id}
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
            </div>
          ))
        )}
      </div>
    </section>
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

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 bg-anvaya-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-hero opacity-40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color}`}>
                <Icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>
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

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {/* Description */}
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/40"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#691E2A] shrink-0" />
                    <span className="text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Why It Matters</h2>
              <div className="space-y-6">
                {service.benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="w-1.5 rounded-full bg-[#691E2A] shrink-0 mt-1.5" />
                    <div>
                      <h3 className="font-bold mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div variants={fadeUp} className="mb-16">
              <h2 className="text-2xl font-bold mb-6">What You Receive</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {service.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B28452] shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mb-16 p-8 rounded-2xl bg-anvaya-dark text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh-hero opacity-30" />
              <div className="relative">
                <p className="text-sm text-gray-400 mb-6">
                  Custom packages available based on your specific goals and scale.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/book"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#691E2A] text-white font-semibold text-sm hover:bg-[#531822] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule a Free Consultation
                  </Link>
                  <Link
                    to="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    No Commitment Required
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Comments */}
            <CommentsSection serviceSlug={service.slug} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
