import {
  DollarSign,
  LayoutDashboard,
  LineChart,
  Settings,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { Metadata } from "next";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import StatCard from "@/components/dashboard/stat-card";
import { getPortfolioData, type Period } from "@/lib/data";
import OverviewChart from "@/components/dashboard/overview-chart";
import AllocationChart from "@/components/dashboard/allocation-chart";
import DateRangeFilter from "@/components/dashboard/date-range-filter";
import AiSummary from "@/components/dashboard/ai-summary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: 'Tech Bank Insights',
  description: 'AI-powered financial portfolio analysis',
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    period?: Period;
    from?: string;
    to?: string;
  };
}) {
  const period = searchParams?.period || "all-time";
  const data = await getPortfolioData(period);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2 text-primary-foreground">
                <LineChart className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-semibold">Tech Bank Insights</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <LayoutDashboard />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="https://placehold.co/100x100.png"
                        alt="User"
                        data-ai-hint="user avatar"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">Jane Doe</span>
                      <span className="text-xs text-muted-foreground">
                        jane.doe@example.com
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>
              <DateRangeFilter />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Value"
                value={`$${data.keyMetrics.totalValue.toLocaleString()}`}
                change={data.keyMetrics.change}
                changeType={data.keyMetrics.changeType}
                icon={<Wallet className="text-primary" />}
              />
              <StatCard
                title="YTD Gain"
                value={`$${data.keyMetrics.ytdGain.toLocaleString()}`}
                change={12.5}
                changeType="increase"
                icon={<TrendingUp className="text-green-500" />}
              />
              <StatCard
                title="Last Month"
                value={`-$${Math.abs(
                  data.keyMetrics.lastMonthGain
                ).toLocaleString()}`}
                change={-2.1}
                changeType="decrease"
                icon={<TrendingDown className="text-red-500" />}
              />
              <StatCard
                title="Total Gain"
                value={`$${data.keyMetrics.totalGain.toLocaleString()}`}
                change={25.7}
                changeType="increase"
                icon={<DollarSign className="text-primary" />}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OverviewChart data={data.portfolioHistory} />
              </div>
              <div className="lg:col-span-1">
                <AllocationChart data={data.assetAllocation} />
              </div>
            </div>

            <AiSummary
              portfolioData={data.portfolioHistory}
              period={period}
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
