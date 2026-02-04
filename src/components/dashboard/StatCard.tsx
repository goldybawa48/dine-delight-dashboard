import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "accent" | "warning";
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const variantStyles = {
  default: {
    bg: "bg-card",
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
  },
  primary: {
    bg: "stat-primary-bg",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  success: {
    bg: "stat-success-bg",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  accent: {
    bg: "stat-accent-bg",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  warning: {
    bg: "stat-warning-bg",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  trend,
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border p-5 card-shadow transition-smooth hover:card-shadow-lg",
        styles.bg
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={cn("rounded-lg p-2", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isPositive ? "text-success" : "text-destructive"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}
