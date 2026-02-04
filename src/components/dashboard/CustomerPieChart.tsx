import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Return Customers", value: 65 },
  { name: "New Customers", value: 35 },
];

const COLORS = ["hsl(24, 95%, 53%)", "hsl(45, 93%, 47%)"];

export function CustomerPieChart() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 card-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">New vs Return</h3>
        <p className="text-sm text-muted-foreground">Customer retention breakdown</p>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={5}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
