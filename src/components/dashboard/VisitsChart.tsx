import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Fri", visits: 0 },
  { name: "Sat", visits: 0 },
  { name: "Sun", visits: 0 },
  { name: "Mon", visits: 1 },
  { name: "Tue", visits: 0 },
  { name: "Wed", visits: 5 },
  { name: "Thu", visits: 12 },
];

export function VisitsChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 card-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Visits Over Time</h3>
        <p className="text-sm text-muted-foreground">
          Verified customer footfall (QR scanned)
        </p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
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
              labelStyle={{ color: "hsl(222, 47%, 11%)", fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke="hsl(24, 95%, 53%)"
              strokeWidth={2}
              fill="url(#visitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
