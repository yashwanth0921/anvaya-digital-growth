import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { services } from "@/lib/services-data";
import logo from "@/assets/logo.svg";
import {
  Calendar,
  Clock,
  LogOut,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Globe,
  Megaphone,
  Instagram,
  Search,
} from "lucide-react";

const serviceIcons: Record<string, typeof Globe> = {
  "social-media-marketing": Instagram,
  "meta-google-ads": Megaphone,
  "website-development": Globe,
  "seo-analytics": Search,
};

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
        <CheckCircle2 className="w-3 h-3" />
        Confirmed
      </span>
    );
  }
  if (status === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
        <XCircle className="w-3 h-3" />
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#D97706]/10 text-[#D97706] text-xs font-medium">
      <AlertCircle className="w-3 h-3" />
      Pending
    </span>
  );
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const bookings = useQuery(api.bookings.list);
  const leads = useQuery(api.leads.list);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const upcomingBookings =
    bookings?.filter((b: { status: string; preferredDate: string }) => {
      return b.status !== "cancelled" && new Date(b.preferredDate) >= new Date();
    }) ?? [];

  const recentLeads = leads?.slice(-5).reverse() ?? [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Grow with Anvaya" className="h-7" />
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              Dashboard
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.name ?? user?.email ?? "Client"}
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#059669]">Grow with Anvaya</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's an overview of your account activity.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming bookings */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#059669]" />
                  <h2 className="font-bold">Upcoming Consultations</h2>
                </div>
                <Link
                  to="/book"
                  className="text-xs font-medium text-[#059669] hover:underline inline-flex items-center gap-1"
                >
                  Book New
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {!bookings ? (
                <p className="text-sm text-muted-foreground py-4">Loading...</p>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">
                    No upcoming consultations.
                  </p>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule One Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.slice(0, 5).map(
                    (booking: {
                      _id: string;
                      service: string;
                      preferredDate: string;
                      preferredTime: string;
                      status: string;
                    }) => (
                      <div
                        key={booking._id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border/40"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-[#059669]" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold">
                              {booking.service}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(booking.preferredDate).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              at {booking.preferredTime}
                            </div>
                          </div>
                        </div>
                        <StatusBadge status={booking.status} />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <MessageSquare className="w-4 h-4 text-[#D97706]" />
                <h2 className="font-bold">Recent Activity</h2>
              </div>

              {!leads ? (
                <p className="text-sm text-muted-foreground py-4">Loading...</p>
              ) : recentLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No activity yet. Explore our services to get started.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentLeads.map(
                    (lead: {
                      _id: string;
                      name: string;
                      service: string;
                      createdAt: number;
                    }) => (
                      <div
                        key={lead._id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/40 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{lead.name}</span>
                            <span className="text-muted-foreground">
                              {" "}submitted an inquiry for{" "}
                            </span>
                            <span className="font-medium">{lead.service}</span>
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick links */}
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-bold mb-4">Our Services</h2>
              <div className="space-y-2">
                {services.map((s) => {
                  const Icon = serviceIcons[s.slug] ?? Globe;
                  return (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${s.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium group-hover:text-[#059669] transition-colors">
                          {s.title}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#059669] transition-colors shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-anvaya-dark p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh-hero opacity-40" />
              <div className="relative">
                <h3 className="font-bold mb-2">Ready to grow?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Book a free strategy session with our team.
                </p>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#059669] text-white text-sm font-semibold hover:bg-[#047857] transition-all w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
