import * as React from "react";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TodayStats } from "@/components/dashboard/TodayStats";
import { VisitsChart } from "@/components/dashboard/VisitsChart";
import { CustomerPieChart } from "@/components/dashboard/CustomerPieChart";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { Users, IndianRupee, ShoppingCart, QrCode, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: startOfDay(subDays(new Date(), 6)),
    to: endOfDay(new Date()),
  });

  const copyPosUrl = () => {
    navigator.clipboard.writeText("...825d91c2");
    toast.success("POS URL copied to clipboard!");
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Here's how your business is performing today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <span className="text-xs text-muted-foreground">POS URL:</span>
              <code className="text-sm font-mono text-foreground">...825d91c2</code>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyPosUrl}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Customers"
            value="2"
            subtitle="All time customer base"
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Total Revenue"
            value="₹7,325"
            subtitle="Earned in selected period"
            icon={IndianRupee}
            variant="success"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Total Orders"
            value="9"
            subtitle="Recorded transactions"
            icon={ShoppingCart}
            variant="primary"
          />
          <StatCard
            title="Scanned Orders"
            value="9"
            subtitle="Verified via QR scan"
            icon={QrCode}
            variant="accent"
          />
        </div>

        {/* Today Stats */}
        <TodayStats />

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VisitsChart />
          </div>
          <div>
            <CustomerPieChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
