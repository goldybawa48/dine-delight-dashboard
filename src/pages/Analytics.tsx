import * as React from "react";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const revenueData = [
  { name: "Mon", revenue: 4500, orders: 12 },
  { name: "Tue", revenue: 5200, orders: 18 },
  { name: "Wed", revenue: 4800, orders: 15 },
  { name: "Thu", revenue: 6800, orders: 24 },
  { name: "Fri", revenue: 8200, orders: 32 },
  { name: "Sat", revenue: 9500, orders: 38 },
  { name: "Sun", revenue: 7200, orders: 28 },
];

const categoryData = [
  { name: "Main Course", value: 45, color: "hsl(24, 95%, 53%)" },
  { name: "Starters", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "Desserts", value: 15, color: "hsl(262, 83%, 58%)" },
  { name: "Beverages", value: 15, color: "hsl(45, 93%, 47%)" },
];

const hourlyData = [
  { hour: "9AM", orders: 3 },
  { hour: "10AM", orders: 5 },
  { hour: "11AM", orders: 8 },
  { hour: "12PM", orders: 15 },
  { hour: "1PM", orders: 22 },
  { hour: "2PM", orders: 18 },
  { hour: "3PM", orders: 8 },
  { hour: "4PM", orders: 6 },
  { hour: "5PM", orders: 10 },
  { hour: "6PM", orders: 14 },
  { hour: "7PM", orders: 25 },
  { hour: "8PM", orders: 32 },
  { hour: "9PM", orders: 28 },
  { hour: "10PM", orders: 15 },
];

const Analytics = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: startOfDay(subDays(new Date(), 6)),
    to: endOfDay(new Date()),
  });

  return (
    <DashboardLayout title="Analytics">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics & Insights</h1>
            <p className="text-sm text-muted-foreground">
              Deep dive into your restaurant performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Revenue",
              value: "₹46,200",
              change: 12.5,
              positive: true,
            },
            {
              label: "Avg Order Value",
              value: "₹276",
              change: 8.2,
              positive: true,
            },
            {
              label: "Total Orders",
              value: "167",
              change: 15.3,
              positive: true,
            },
            {
              label: "Customer Satisfaction",
              value: "4.8/5",
              change: 2.1,
              positive: false,
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-card p-5 card-shadow"
            >
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{metric.value}</p>
              <div className="mt-2 flex items-center gap-1">
                {metric.positive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={`text-sm font-medium ${
                    metric.positive ? "text-success" : "text-destructive"
                  }`}
                >
                  {metric.change}%
                </span>
                <span className="text-sm text-muted-foreground">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground">Revenue & Orders</h3>
            <p className="text-sm text-muted-foreground">
              Daily revenue and order count for the selected period
            </p>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 91%)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                  }}
                  formatter={(value: number, name: string) => [
                    name === "revenue" ? `₹${value}` : value,
                    name === "revenue" ? "Revenue" : "Orders",
                  ]}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(24, 95%, 53%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(142, 76%, 36%)"
                  strokeWidth={2}
                  dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
                  name="Orders"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Category Distribution */}
          <div className="rounded-xl border border-border bg-card p-6 card-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Sales by Category</h3>
              <p className="text-sm text-muted-foreground">Order distribution by menu category</p>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 91%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours */}
          <div className="rounded-xl border border-border bg-card p-6 card-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Peak Hours</h3>
              <p className="text-sm text-muted-foreground">Orders by hour of day</p>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 91%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="hsl(24, 95%, 53%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
