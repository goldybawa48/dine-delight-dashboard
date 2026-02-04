import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye, Gift, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";

interface Customer {
  id: string;
  mobile: string;
  totalSpent: number;
  totalPoints: number;
  lastVisit: string;
  visits: number;
}

const initialCustomers: Customer[] = [
  {
    id: "1",
    mobile: "8146056898",
    totalSpent: 7100,
    totalPoints: 770,
    lastVisit: "2/5/2026",
    visits: 8,
  },
  {
    id: "2",
    mobile: "8146313492",
    totalSpent: 3225,
    totalPoints: 540,
    lastVisit: "2/5/2026",
    visits: 2,
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newMobile, setNewMobile] = useState("");

  const filteredCustomers = customers.filter((c) =>
    c.mobile.includes(search)
  );

  const handleAddCustomer = () => {
    if (newMobile.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    const newCustomer: Customer = {
      id: Date.now().toString(),
      mobile: newMobile,
      totalSpent: 0,
      totalPoints: 0,
      lastVisit: new Date().toLocaleDateString(),
      visits: 0,
    };
    setCustomers([...customers, newCustomer]);
    setNewMobile("");
    setIsAddOpen(false);
    toast.success("Customer added successfully!");
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((c) => c.id !== id));
    toast.success("Customer removed");
  };

  return (
    <DashboardLayout title="Customers">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Customer Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your customer base and points.
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Enter customer's mobile number to create their loyalty account.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="Enter 10-digit mobile number"
                    value={newMobile}
                    onChange={(e) => setNewMobile(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by mobile number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card card-shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mobile</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Visits</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <p className="text-muted-foreground">No customers found.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="group">
                    <TableCell className="font-medium">{customer.mobile}</TableCell>
                    <TableCell>₹{customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {customer.totalPoints} pts
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.lastVisit}</TableCell>
                    <TableCell>{customer.visits}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <Gift className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Customers;
