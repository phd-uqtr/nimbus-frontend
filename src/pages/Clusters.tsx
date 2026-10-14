import Layout from "../components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Server, Cpu, HardDrive, Box, Activity } from "lucide-react";

export default function Clusters() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Cluster Overview</h1>
        <p className="text-muted-foreground">Resource usage and node health</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: "Nodes", value: "8", icon: Server },
          { label: "Pods", value: "45", icon: Box },
          { label: "Deployments", value: "12", icon: Activity },
          { label: "StatefulSets", value: "3", icon: HardDrive },
          { label: "DaemonSets", value: "5", icon: Server },
          { label: "ReplicaSets", value: "15", icon: Box },
        ].map((item, i) => (
          <Card key={i} className="bg-card/50 border-border/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <item.icon className="w-6 h-6 text-primary mb-2 opacity-80" />
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top CPU Consumers */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              Top CPU Usage (Nodes)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "worker-node-01", usage: 85 },
              { name: "worker-node-04", usage: 72 },
              { name: "control-plane-01", usage: 45 },
              { name: "worker-node-02", usage: 32 },
              { name: "worker-node-03", usage: 18 },
            ].map((node) => (
              <div key={node.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono">{node.name}</span>
                  <span className="text-muted-foreground">{node.usage}%</span>
                </div>
                <Progress value={node.usage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Memory Consumers */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-purple-500" />
              Top Memory Usage (Nodes)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { name: "worker-node-02", usage: 92 },
              { name: "worker-node-01", usage: 68 },
              { name: "worker-node-04", usage: 64 },
              { name: "control-plane-01", usage: 55 },
              { name: "worker-node-03", usage: 41 },
            ].map((node) => (
              <div key={node.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono">{node.name}</span>
                  <span className="text-muted-foreground">{node.usage}%</span>
                </div>
                <Progress value={node.usage} className="h-2" color="bg-purple-500" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
