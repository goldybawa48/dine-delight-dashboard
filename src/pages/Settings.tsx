import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  User,
  Bell,
  CreditCard,
  Shield,
  Palette,
  QrCode,
  Save,
} from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [restaurantName, setRestaurantName] = useState("My Restaurant");
  const [email, setEmail] = useState("owner@restaurant.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("123 Main Street, Mumbai 400001");
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderAlerts: true,
    marketing: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="animate-fade-in space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your restaurant settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="restaurant" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="restaurant" className="gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurant</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">Loyalty</span>
            </TabsTrigger>
          </TabsList>

          {/* Restaurant Settings */}
          <TabsContent value="restaurant">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
                <CardDescription>
                  Update your restaurant's basic information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input
                      id="restaurantName"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Operating Hours</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Opening Time</Label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Closing Time</Label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                  </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Manage your personal account settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success text-3xl font-bold text-success-foreground">
                    G
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Gaurav" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Sharma" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input
                    id="profileEmail"
                    type="email"
                    defaultValue="gaurav@restaurant.com"
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Shield className="h-4 w-4" />
                    Security
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Password</p>
                      <p className="text-xs text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, email: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, push: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive SMS for critical alerts
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, sms: v })
                      }
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Alert Types</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Order Alerts</p>
                      <p className="text-xs text-muted-foreground">
                        New orders and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.orderAlerts}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, orderAlerts: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Marketing Updates</p>
                      <p className="text-xs text-muted-foreground">
                        Tips and product updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, marketing: v })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and billing details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-foreground">Free Plan</p>
                      <p className="text-sm text-muted-foreground">
                        Basic features for small restaurants
                      </p>
                    </div>
                    <Button>Upgrade to Pro</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Plan Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Up to 100 customers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Basic analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      QR code generation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      Advanced reports (Pro)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      Custom branding (Pro)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loyalty Program */}
          <TabsContent value="loyalty">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Loyalty Program Settings
                </CardTitle>
                <CardDescription>
                  Configure your customer rewards program.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Points per ₹100 spent</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum redemption points</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Point value (₹ per point)</Label>
                  <Input type="number" defaultValue="1" step="0.1" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">QR Code Settings</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted">
                      <QrCode className="h-12 w-12 text-foreground" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Download QR Code
                      </Button>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Display this at your counter for customers to scan
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Loyalty Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
