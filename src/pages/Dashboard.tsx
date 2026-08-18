import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  LogOut,
  Users,
  Mail,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const leads = useQuery(api.leads.list);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#059669]">
              Grow with Anvaya
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Dashboard{user?.name ? ` — ${user.name}` : ""}
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer gap-2 self-start"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="border-border/70">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#059669]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#059669]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{leads?.length ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">Total Leads</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D97706]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#D97706]" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {leads?.filter((l: { service: string }) => l.service === "Full Digital Package").length ?? "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">Package Inquiries</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {leads?.filter((l: { service: string }) => l.service === "Meta & Google Ads").length ?? "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">Ads Leads</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/70">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {leads?.filter((l: { createdAt: number }) => l.createdAt > Date.now() - 7 * 24 * 60 * 60 * 1000).length ?? "—"}
                  </div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[#059669]/10 text-[#059669]">
              <LayoutDashboard className="size-5" />
            </div>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            {!leads ? (
              <p className="text-sm text-muted-foreground">Loading leads...</p>
            ) : leads.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No leads yet. Share your landing page to start generating leads!
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Business</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice().reverse().map((lead: { _id: string; name: string; email: string; businessName?: string; service: string; createdAt: number }) => (
                      <tr key={lead._id} className="border-b border-border/30 hover:bg-muted/30">
                        <td className="py-3 px-2 font-medium">{lead.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{lead.email}</td>
                        <td className="py-3 px-2 text-muted-foreground">{lead.businessName || "—"}</td>
                        <td className="py-3 px-2">
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] text-xs font-medium">
                            {lead.service}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-muted-foreground">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
