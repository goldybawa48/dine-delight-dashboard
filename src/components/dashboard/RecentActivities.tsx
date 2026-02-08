import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, IndianRupee, Gift, Sparkles } from "lucide-react";

interface Activity {
  id: string;
  customerMobile: string;
  customerInitials: string;
  action: "verified" | "redeemed" | "earned";
  amount?: number;
  points?: number;
  itemName?: string;
  timestamp: string;
  timeAgo: string;
}

const activities: Activity[] = [
  {
    id: "1",
    customerMobile: "8146056898",
    customerInitials: "AK",
    action: "verified",
    amount: 1250,
    points: 125,
    timestamp: "2:45 PM",
    timeAgo: "2 min ago",
  },
  {
    id: "2",
    customerMobile: "8146313492",
    customerInitials: "RS",
    action: "redeemed",
    points: 200,
    itemName: "Free Dessert",
    timestamp: "2:30 PM",
    timeAgo: "17 min ago",
  },
  {
    id: "3",
    customerMobile: "9876543210",
    customerInitials: "PK",
    action: "verified",
    amount: 890,
    points: 89,
    timestamp: "1:15 PM",
    timeAgo: "1 hr ago",
  },
  {
    id: "4",
    customerMobile: "8765432109",
    customerInitials: "MJ",
    action: "earned",
    points: 50,
    itemName: "Bonus Points",
    timestamp: "12:45 PM",
    timeAgo: "2 hrs ago",
  },
  {
    id: "5",
    customerMobile: "7654321098",
    customerInitials: "VK",
    action: "verified",
    amount: 2100,
    points: 210,
    timestamp: "11:30 AM",
    timeAgo: "3 hrs ago",
  },
  {
    id: "6",
    customerMobile: "6543210987",
    customerInitials: "SK",
    action: "redeemed",
    points: 500,
    itemName: "20% Off Meal",
    timestamp: "10:00 AM",
    timeAgo: "5 hrs ago",
  },
  {
    id: "7",
    customerMobile: "5432109876",
    customerInitials: "NG",
    action: "verified",
    amount: 750,
    points: 75,
    timestamp: "Yesterday",
    timeAgo: "1 day ago",
  },
  {
    id: "8",
    customerMobile: "4321098765",
    customerInitials: "RB",
    action: "earned",
    points: 100,
    itemName: "First Order Bonus",
    timestamp: "Yesterday",
    timeAgo: "1 day ago",
  },
];

const getActionConfig = (action: Activity["action"]) => {
  switch (action) {
    case "verified":
      return {
        icon: CheckCircle2,
        label: "Order Verified",
        badgeClass: "bg-success/10 text-success border-success/20",
        iconClass: "text-success",
        bgClass: "bg-gradient-to-br from-success/20 to-success/5",
      };
    case "redeemed":
      return {
        icon: Gift,
        label: "Reward Redeemed",
        badgeClass: "bg-primary/10 text-primary border-primary/20",
        iconClass: "text-primary",
        bgClass: "bg-gradient-to-br from-primary/20 to-primary/5",
      };
    case "earned":
      return {
        icon: Sparkles,
        label: "Points Earned",
        badgeClass: "bg-accent/10 text-accent border-accent/20",
        iconClass: "text-accent",
        bgClass: "bg-gradient-to-br from-accent/20 to-accent/5",
      };
  }
};

export function RecentActivities() {
  return (
    <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-card to-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
            <p className="text-sm text-muted-foreground">Live feed of customer interactions</p>
          </div>
        </div>
        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
          {activities.length} activities
        </Badge>
      </div>

      {/* Scrollable List */}
      <ScrollArea className="h-[320px]">
        <div className="divide-y divide-border">
          {activities.map((activity, index) => {
            const config = getActionConfig(activity.action);
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="group relative flex items-center gap-4 px-6 py-4 transition-all hover:bg-muted/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar with gradient background */}
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                    <AvatarFallback className={`${config.bgClass} font-semibold text-foreground`}>
                      {activity.customerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-card ${config.bgClass}`}>
                    <Icon className={`h-3 w-3 ${config.iconClass}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{activity.customerMobile}</span>
                    <Badge variant="outline" className={`text-xs ${config.badgeClass}`}>
                      {config.label}
                    </Badge>
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    {activity.amount && (
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3" />
                        {activity.amount.toLocaleString()}
                      </span>
                    )}
                    {activity.points && (
                      <span className="flex items-center gap-1 text-primary">
                        <Sparkles className="h-3 w-3" />
                        {activity.action === "redeemed" ? "-" : "+"}
                        {activity.points} pts
                      </span>
                    )}
                    {activity.itemName && (
                      <span className="truncate text-muted-foreground">• {activity.itemName}</span>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{activity.timestamp}</p>
                  <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                </div>

                {/* Hover indicator */}
                <div className="absolute left-0 top-0 h-full w-1 scale-y-0 bg-primary transition-transform group-hover:scale-y-100" />
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border bg-muted/20 px-6 py-3">
        <p className="text-center text-xs text-muted-foreground">
          Showing last {activities.length} activities • Auto-refreshes every 30s
        </p>
      </div>
    </div>
  );
}
