import Layout from "@/components/Layout";
import { useApps } from "@/hooks/use-apps";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Box, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function Apps() {
  const { data: apps, isLoading } = useApps();

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Applications</h1>
          <p className="text-muted-foreground">Deployed workloads and services</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Deploy App
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="border-border/50 bg-card/50">
              <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </CardHeader>
              <CardContent>
                 <Skeleton className="w-full h-20" />
              </CardContent>
            </Card>
          ))
        ) : apps?.map((app) => (
          <Link key={app.id} href={`/apps/${app.id}`} className="block group">
            <Card className="h-full border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 group-hover:-translate-y-1">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Box className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{app.project}</p>
                  </div>
                </div>
                <Badge variant="outline" className={
                  app.health === 'Healthy' 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }>
                  {app.health}
                </Badge>
              </CardHeader>
              <CardContent className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Tenant</p>
                    <p className="font-medium">{app.tenant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Scheduler</p>
                    <p className="font-medium">{app.schedulers}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                   {app.syncStatus === 'Synced' ? (
                     <CheckCircle2 className="w-4 h-4 text-green-500" />
                   ) : (
                     <Clock className="w-4 h-4 text-yellow-500" />
                   )}
                   <span className="text-xs text-muted-foreground">
                     {app.syncStatus === 'Synced' ? 'Synchronized with cluster' : 'Sync pending'}
                   </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
