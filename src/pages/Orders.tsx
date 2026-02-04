import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye, CheckCircle, Clock, XCircle, Filter } from "lucide-react";

interface Order {
  id: string;
  orderNo: string;
  customer: string;
  items: number;
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  time: string;
  type: "dine-in" | "takeaway" | "delivery";
}

const orders: Order[] = [
  {
    id: "1",
    orderNo: "ORD-001",
    customer: "8146056898",
    items: 3,
    total: 850,
    status: "completed",
    time: "10:30 AM",
    type: "dine-in",
  },
  {
    id: "2",
    orderNo: "ORD-002",
    customer: "8146313492",
    items: 2,
    total: 450,
    status: "preparing",
    time: "11:15 AM",
    type: "takeaway",
  },
  {
    id: "3",
    orderNo: "ORD-003",
    customer: "9876543210",
    items: 5,
    total: 1200,
    status: "pending",
    time: "11:45 AM",
    type: "delivery",
  },
  {
    id: "4",
    orderNo: "ORD-004",
    customer: "8765432109",
    items: 1,
    total: 280,
    status: "ready",
    time: "12:00 PM",
    type: "dine-in",
  },
  {
    id: "5",
    orderNo: "ORD-005",
    customer: "7654321098",
    items: 4,
    total: 920,
    status: "cancelled",
    time: "12:30 PM",
    type: "takeaway",
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "outline" as const, icon: Clock },
  preparing: { label: "Preparing", variant: "secondary" as const, icon: Clock },
  ready: { label: "Ready", variant: "default" as const, icon: CheckCircle },
  completed: { label: "Completed", variant: "default" as const, icon: CheckCircle },
  cancelled: { label: "Cancelled", variant: "destructive" as const, icon: XCircle },
};

const typeColors = {
  "dine-in": "bg-success/10 text-success",
  takeaway: "bg-warning/10 text-warning",
  delivery: "bg-accent/10 text-accent",
};

const Orders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNo.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.includes(search);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Orders">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
            <p className="text-sm text-muted-foreground">
              Track and manage all restaurant orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-success/10 text-success border-success/20">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-success animate-pulse" />
              Live Updates
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: "Pending", value: 1, color: "text-warning" },
            { label: "Preparing", value: 1, color: "text-muted-foreground" },
            { label: "Ready", value: 1, color: "text-primary" },
            { label: "Completed Today", value: 1, color: "text-success" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-4 card-shadow"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by order number or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card card-shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <p className="text-muted-foreground">No orders found.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const status = statusConfig[order.status];
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNo}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            typeColors[order.type]
                          }`}
                        >
                          {order.type}
                        </span>
                      </TableCell>
                      <TableCell>{order.items} items</TableCell>
                      <TableCell>₹{order.total}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant} className="gap-1">
                          <status.icon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.time}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
