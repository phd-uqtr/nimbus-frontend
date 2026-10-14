import { useDashboardStats } from "@/hooks/use-dashboard";
import Layout from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { DonutChart } from "@/components/DonutChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Server, Activity, Network, ShieldCheck, RefreshCw } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import EagleView from "@/components/EagleView";
export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </Layout>
    );
  }

  const edgeData = [
    { name: 'Up', value: stats?.edges.up || 0, color: '#0ea5e9' }, // Sky 500
    { name: 'Down', value: stats?.edges.down || 0, color: '#ef4444' }, // Red 500
  ];

  const controllerData = [
    { name: 'Healthy', value: stats?.controllers.healthy || 0, color: '#22c55e' }, // Green 500
    { name: 'Unhealthy', value: stats?.controllers.unhealthy || 0, color: '#f97316' }, // Orange 500
  ];

  return (
    <Layout>
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Edges" 
          value={stats?.edges.total || 0} 
          icon={Network} 
          change={12} 
          trend="up"
        />
        <StatCard 
          title="Active Services" 
          value={stats?.services.active || 0} 
          icon={Activity} 
          change={-2} 
          trend="down"
        />
        <StatCard 
          title="Cluster Nodes" 
          value={stats?.nodes.total || 0} 
          icon={Server} 
          change={0} 
          trend="neutral"
        />
        <StatCard 
          title="Security Alerts" 
          value={0} 
          icon={ShieldCheck} 
          className="border-green-500/20 bg-green-500/5"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edges Status */}
        <Card className="col-span-1 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Edge Status</CardTitle>
            <CardDescription>Real-time connectivity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={edgeData} title="Edges" />
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                  <span>Up (Connected)</span>
                </div>
                <span className="font-bold">{stats?.edges.up}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>Down (Disconnected)</span>
                </div>
                <span className="font-bold">{stats?.edges.down}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controllers Status */}
        <Card className="col-span-1 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Controllers</CardTitle>
            <CardDescription>Control plane health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={controllerData} title="Ctlrs" />
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>Healthy</span>
                </div>
                <span className="font-bold">{stats?.controllers.healthy}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                  <span>Unhealthy</span>
                </div>
                <span className="font-bold">{stats?.controllers.unhealthy}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed / Latest Updates */}
        <Card className="col-span-1 lg:col-span-1 border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Latest Activity</CardTitle>
              <CardDescription>Recent system events</CardDescription>
            </div>
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { time: '2m ago', msg: 'Edge-04 disconnected', type: 'error' },
                { time: '15m ago', msg: 'New deployment: api-v2', type: 'success' },
                { time: '1h ago', msg: 'Cluster scaling initiated', type: 'info' },
                { time: '3h ago', msg: 'Edge-02 firmware updated', type: 'success' },
              ].map((event, i) => (
                <div key={i} className="flex gap-4 items-start relative pb-6 last:pb-0 border-l border-border ml-2 pl-6 last:border-0">
                  <span className={cn(
                    "absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-background",
                    event.type === 'error' ? 'bg-red-500' : event.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  )}></span>
                  <div>
                    <p className="text-sm font-medium leading-none">{event.msg}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Map Placeholder - Full Width */}
        <h1 className="text-xl">Edge Map</h1>
        <Card className="col-span-1 lg:col-span-3 border-border/50 bg-card/50 overflow-hidden h-96 relative group">
          <EagleView />
        </Card>
      </div>
    </Layout>
  );
}
