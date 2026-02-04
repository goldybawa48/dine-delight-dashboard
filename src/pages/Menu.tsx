import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Edit2, Trash2, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  isVeg: boolean;
}

const initialMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 350,
    category: "Main Course",
    isAvailable: true,
    isVeg: false,
  },
  {
    id: "2",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with Indian spices",
    price: 280,
    category: "Starters",
    isAvailable: true,
    isVeg: true,
  },
  {
    id: "3",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in creamy gravy",
    price: 220,
    category: "Main Course",
    isAvailable: true,
    isVeg: true,
  },
  {
    id: "4",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with spiced chicken",
    price: 320,
    category: "Rice",
    isAvailable: false,
    isVeg: false,
  },
  {
    id: "5",
    name: "Gulab Jamun",
    description: "Deep-fried milk dumplings in sugar syrup",
    price: 120,
    category: "Desserts",
    isAvailable: true,
    isVeg: true,
  },
  {
    id: "6",
    name: "Masala Dosa",
    description: "Crispy rice crepe with spiced potato filling",
    price: 180,
    category: "South Indian",
    isAvailable: true,
    isVeg: true,
  },
];

const categories = ["All", "Starters", "Main Course", "Rice", "South Indian", "Desserts", "Beverages"];

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Main Course",
    isVeg: true,
  });

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      category: newItem.category,
      isAvailable: true,
      isVeg: newItem.isVeg,
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: "", description: "", price: "", category: "Main Course", isVeg: true });
    setIsAddOpen(false);
    toast.success("Menu item added!");
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Item removed from menu");
  };

  return (
    <DashboardLayout title="Menu">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
            <p className="text-sm text-muted-foreground">
              Add, edit, and manage your restaurant menu items.
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>
                  Fill in the details for your new menu item.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Chicken Tikka Masala"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your dish..."
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(v) => setNewItem({ ...newItem, category: v })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="veg">Vegetarian</Label>
                  <Switch
                    id="veg"
                    checked={newItem.isVeg}
                    onCheckedChange={(v) => setNewItem({ ...newItem, isVeg: v })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No menu items found.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <Card
                key={item.id}
                className={`group transition-smooth hover:card-shadow-lg ${
                  !item.isAvailable ? "opacity-60" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-3 w-3 rounded-full ${
                          item.isVeg ? "bg-success" : "bg-destructive"
                        }`}
                      />
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-muted">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">₹{item.price}</span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.isAvailable}
                      onCheckedChange={() => toggleAvailability(item.id)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Menu;
