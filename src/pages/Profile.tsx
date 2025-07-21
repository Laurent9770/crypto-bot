import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  CreditCard, 
  Settings, 
  Download, 
  Upload,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Crown,
  Copy,
  Check,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [tradingAlerts, setTradingAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const { toast } = useToast();

  const userInfo = {
    name: "Alex Thompson",
    email: "alex@example.com",
    plan: "Premium",
    joinDate: "March 2024",
    avatar: "",
    balance: "$11,200.50",
    totalTrades: 1247,
    winRate: "82%",
    apiKey: "sk_live_51H7xKLRuPvqC2hM8xNzLhgQ5vVxT2qF8mKhsA9s2QwErP3bM4nYzXcV7zK8Q"
  };

  const copyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(userInfo.apiKey);
      setCopiedApi(true);
      toast({
        title: "API Key Copied",
        description: "Your API key has been copied to clipboard.",
      });
      setTimeout(() => setCopiedApi(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy API key to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSubscriptionChange = () => {
    toast({
      title: "Subscription Management",
      description: "You'll be redirected to the billing portal.",
    });
  };

  const handleExportData = () => {
    // Create a dummy data blob for export
    const data = {
      tradingSettings: {
        riskLevel: "High", // Placeholder, replace with actual state
        preferredPairs: ["BTC/USDT", "ETH/USDT"], // Placeholder, replace with actual state
        notifications: {
          email: emailNotifications,
          tradingAlerts: tradingAlerts,
          priceAlerts: priceAlerts
        }
      },
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({ title: 'Data Exported', description: 'Trading data has been exported successfully.' });
  };

  const handleImportSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // Update state with imported data
            setTwoFactorEnabled(data.tradingSettings.twoFactorEnabled || true); // Assuming twoFactorEnabled is part of tradingSettings
            setEmailNotifications(data.tradingSettings.notifications.email || true);
            setTradingAlerts(data.tradingSettings.notifications.tradingAlerts || true);
            setPriceAlerts(data.tradingSettings.notifications.priceAlerts || false);
            toast({ title: 'Settings Imported', description: 'Trading settings have been imported successfully.' });
          } catch (error) {
            toast({ title: 'Import Failed', description: 'Invalid file format. Please select a valid JSON file.', variant: 'destructive' });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    const settings = {
      riskLevel: "High", // Placeholder, replace with actual state
      preferredPairs: ["BTC/USDT", "ETH/USDT"], // Placeholder, replace with actual state
      notifications: {
        email: emailNotifications,
        tradingAlerts: tradingAlerts,
        priceAlerts: priceAlerts
      },
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('tradingSettings', JSON.stringify(settings));
    toast({ title: 'Settings Saved', description: 'Trading settings have been saved successfully.' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <div style={{ position: 'relative', zIndex: 1, fontFamily: 'Inter, Poppins, Satoshi, Arial, sans-serif', color: '#f5f6fa' }}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account and trading preferences</p>
            </div>
            <Badge variant="default" className="bg-gradient-accent">
              <Crown className="w-4 h-4 mr-1" />
              {userInfo.plan} Plan
            </Badge>
          </div>

          {/* Profile Overview */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-primary/20">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="text-xl bg-gradient-primary text-primary-foreground">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground">{userInfo.name}</h2>
                  <p className="text-muted-foreground">{userInfo.email}</p>
                  <p className="text-sm text-muted-foreground">Member since {userInfo.joinDate}</p>
                </div>
                
                <div className="text-right space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <p className="text-2xl font-bold text-foreground">{userInfo.balance}</p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Trades</p>
                      <p className="font-semibold text-foreground">{userInfo.totalTrades}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Win Rate</p>
                      <p className="font-semibold text-success">{userInfo.winRate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="api">API & Trading</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="icon w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Thompson" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={userInfo.email} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself..." />
                  </div>
                  
                  <Button onClick={handleSaveProfile} className="bg-gradient-primary">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="icon w-5 h-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Protect your account with advanced security features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Smartphone className="icon w-4 h-4 text-primary" />
                        <Label>Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={setTwoFactorEnabled}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  {twoFactorEnabled && (
                    <Alert>
                      <Key className="icon h-4 w-4" />
                      <AlertDescription>
                        Two-factor authentication is enabled. You'll receive codes via your authenticator app.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Button className="bg-gradient-primary">
                    Update Security Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="icon w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive account updates and important information via email
                      </p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Trading Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about trade executions and bot activities
                      </p>
                    </div>
                    <Switch 
                      checked={tradingAlerts} 
                      onCheckedChange={setTradingAlerts}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when price targets are reached
                      </p>
                    </div>
                    <Switch 
                      checked={priceAlerts} 
                      onCheckedChange={setPriceAlerts}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  
                  <Button className="bg-gradient-primary">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="icon w-5 h-5 text-primary" />
                    Subscription & Billing
                  </CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground">$250/month • Next billing: April 15, 2024</p>
                      </div>
                      <Badge variant="default" className="bg-gradient-accent">
                        <Crown className="w-4 h-4 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" onClick={handleSubscriptionChange}>
                      Upgrade to Diamond
                    </Button>
                    <Button variant="outline">
                      Update Payment Method
                    </Button>
                    <Button variant="outline">
                      Download Invoices
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Payment History</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                        <div>
                          <p className="font-medium text-foreground">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">March 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">$250.00</p>
                          <Badge variant="default" className="bg-gradient-success">Paid</Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                        <div>
                          <p className="font-medium text-foreground">Premium Plan</p>
                          <p className="text-sm text-muted-foreground">February 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">$250.00</p>
                          <Badge variant="default" className="bg-gradient-success">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="icon w-5 h-5 text-primary" />
                    API & Trading Settings
                  </CardTitle>
                  <CardDescription>Configure API access and trading preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>API Key</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={showApiKey ? userInfo.apiKey : "•".repeat(40)}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="icon w-4 h-4" /> : <Eye className="icon w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyApiKey}
                        >
                          {copiedApi ? <Check className="icon w-4 h-4" /> : <Copy className="icon w-4 h-4" />}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use this API key to connect your trading applications
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" onClick={handleExportData}>
                        <Download className="icon w-4 h-4 mr-2" />
                        Export Trading Data
                      </Button>
                      <Button variant="outline" onClick={handleImportSettings}>
                        <Upload className="icon w-4 h-4 mr-2" />
                        Import Settings
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Trading Preferences</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="defaultLeverage">Default Leverage</Label>
                      <Input id="defaultLeverage" defaultValue="1x" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stopLossPercent">Default Stop Loss (%)</Label>
                      <Input id="stopLossPercent" defaultValue="5" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="takeProfitPercent">Default Take Profit (%)</Label>
                      <Input id="takeProfitPercent" defaultValue="10" />
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-primary" onClick={handleSaveSettings}>
                    Save Trading Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}