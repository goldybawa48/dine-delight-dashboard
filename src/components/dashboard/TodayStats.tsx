import { UserX, Star, Gift } from "lucide-react";

const stats = [
  {
    label: "Unverified Customers",
    sublabel: "Bills without QR scan",
    value: 0,
    icon: UserX,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    label: "Total Customers",
    sublabel: "All time",
    value: 2,
    icon: Star,
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  {
    label: "Rewards Redeemed",
    sublabel: "Value delivered",
    value: 730,
    icon: Gift,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

export function TodayStats() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 card-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Today at Your Restaurant
        </h3>
        <p className="text-sm text-muted-foreground">
          Live snapshot of today's performance
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 px-4 first:pl-0 last:pr-0">
            <div className={`rounded-lg p-2 ${stat.iconBg}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
