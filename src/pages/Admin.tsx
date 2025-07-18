import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Shield, 
  Settings, 
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

const mockUsers = [
  { id: 1, name: "Alex Thompson", email: "alex@example.com", plan: "Premium", status: "Active", balance: "$11,200", joinDate: "2024-03-15" },
  { id: 2, name: "Sarah Chen", email: "sarah@example.com", plan: "Diamond", status: "Active", balance: "$25,650", joinDate: "2024-02-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Bronze", status: "Suspended", balance: "$3,400", joinDate: "2024-01-10" },
  { id: 4, name: "Emma Davis", email: "emma@example.com", plan: "Premium", status: "Active", balance: "$8,900", joinDate: "2024-03-01" },
  { id: 5, name: "David Wilson", email: "david@example.com", plan: "Bronze", status: "Inactive", balance: "$1,200", joinDate: "2024-02-15" },
];

const mockTransactions = [
  { id: "TX001", user: "Alex Thompson", amount: "$250.00", currency: "USDT", network: "TRC20", status: "Confirmed", date: "2024-03-15" },
  { id: "TX002", user: "Sarah Chen", amount: "$500.00", currency: "USDT", network: "ERC20", status: "Confirmed", date: "2024-03-14" },
  { id: "TX003", user: "Mike Johnson", amount: "$100.00", currency: "USDT", network: "BEP20", status: "Pending", date: "2024-03-13" },
  { id: "TX004", user: "Emma Davis", amount: "$250.00", currency: "USDT", network: "TRC20", status: "Confirmed", date: "2024-03-12" },
  { id: "TX005", user: "David Wilson", amount: "$100.00", currency: "USDT", network: "TRC20", status: "Failed", date: "2024-03-10" },
];

const revenueData = [
  { month: "Oct", revenue: 12500, users: 45 },
  { month: "Nov", revenue: 18750, users: 62 },
  { month: "Dec", revenue: 23400, users: 78 },
  { month: "Jan", revenue: 31200, users: 95 },
  { month: "Feb", revenue: 28800, users: 89 },
  { month: "Mar", revenue: 35600, users: 108 },
];

export default function Admin() {
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [userFilter, setUserFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active users"
    },
    {
      title: "Monthly Revenue", 
      value: "$35,600",
      change: "+23.8%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "This month"
    },
    {
      title: "Total Trades",
      value: "8,642",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "All time"
    },
    {
      title: "System Status",
      value: "99.9%",
      change: "Uptime",
      changeType: "neutral" as const,
      icon: Activity,
      description: "Last 30 days"
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === "all" || user.status.toLowerCase() === userFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-gradient-success">Active</Badge>;
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTransactionStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge className="bg-gradient-success">Confirmed</Badge>;
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users, payments, and platform operations</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="default" className="bg-gradient-success">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
            <Button variant="premium">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={stat.changeType === "positive" ? "default" : "secondary"}
                    className={stat.changeType === "positive" ? "bg-gradient-success" : ""}
                  >
                    {stat.changeType === "positive" && <TrendingUp className="w-3 h-3 mr-1" />}
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue and user growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-foreground">User Growth</CardTitle>
              <CardDescription>New users registered over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--popover))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">User Management</CardTitle>
                <CardDescription>Manage user accounts and subscriptions</CardDescription>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="premium">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.plan === "Diamond" ? "default" : "outline"}>
                            {user.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="font-mono">{user.balance}</TableCell>
                        <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>User Details: {selectedUser?.name}</DialogTitle>
                                  <DialogDescription>
                                    View and manage user account information
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedUser && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Email</Label>
                                        <p className="text-sm text-foreground">{selectedUser.email}</p>
                                      </div>
                                      <div>
                                        <Label>Current Plan</Label>
                                        <p className="text-sm text-foreground">{selectedUser.plan}</p>
                                      </div>
                                      <div>
                                        <Label>Status</Label>
                                        {getStatusBadge(selectedUser.status)}
                                      </div>
                                      <div>
                                        <Label>Balance</Label>
                                        <p className="text-sm text-foreground font-mono">{selectedUser.balance}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button variant="outline" size="sm">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit User
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Ban className="w-4 h-4 mr-2" />
                                        Suspend
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">Payment Management</CardTitle>
                <CardDescription>Monitor USDT transactions and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-mono">{transaction.id}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell className="font-mono">{transaction.amount} {transaction.currency}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.network}</Badge>
                        </TableCell>
                        <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {transaction.status === "Pending" && (
                              <>
                                <Button variant="outline" size="sm">
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Subscription Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Bronze</span>
                      <span className="text-foreground">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Premium</span>
                      <span className="text-foreground">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Diamond</span>
                      <span className="text-foreground">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Network Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">TRC20</span>
                      <span className="text-foreground">60%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">BEP20</span>
                      <span className="text-foreground">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">ERC20</span>
                      <span className="text-foreground">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader>
                  <CardTitle className="text-foreground">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">API Response</span>
                      <Badge className="bg-gradient-success">99.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Trading Bot</span>
                      <Badge className="bg-gradient-success">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Database</span>
                      <Badge className="bg-gradient-success">Healthy</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="text-foreground">System Configuration</CardTitle>
                <CardDescription>Manage platform settings and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Trading Settings</h4>
                    <div className="space-y-2">
                      <Label>Maximum Leverage</Label>
                      <Input defaultValue="100x" />
                    </div>
                    <div className="space-y-2">
                      <Label>Trading Fee (%)</Label>
                      <Input defaultValue="0.1" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Payment Settings</h4>
                    <div className="space-y-2">
                      <Label>USDT Confirmation Blocks</Label>
                      <Input defaultValue="12" />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Timeout (minutes)</Label>
                      <Input defaultValue="30" />
                    </div>
                  </div>
                </div>

                <Button className="bg-gradient-primary">
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}