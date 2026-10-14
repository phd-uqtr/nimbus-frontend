import Layout from "@/components/Layout";
import { useParams } from "wouter";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, GitBranch, Server, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AppDetails() {
  const { id } = useParams();

  // In a real app, fetch app details by ID here.
  // For demo, we'll assume valid ID and show mock topology.

  return (
    <Layout>
      <div className="mb-6">
        <Link href="/apps">
          <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Apps
          </Button>
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-display font-bold">App Topology: {id}</h1>
          <Badge variant="outline" className="text-green-500 border-green-500/50 bg-green-500/10">Healthy</Badge>
        </div>
      </div>

      {/* Visual Topology Tree Mockup */}
      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <CardHeader>
          <CardTitle>Resource Graph</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[500px] relative flex items-center justify-center bg-black/20">
          <div className="flex flex-col items-center gap-16 w-full max-w-4xl">
            
            {/* Level 1: Deployment */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-48 h-16 bg-blue-900/40 border border-blue-500/50 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10">
                <Box className="text-blue-400 w-5 h-5" />
                <span className="font-medium text-blue-100">Deployment</span>
              </div>
              {/* Connector Line */}
              <div className="h-16 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50 absolute top-full"></div>
            </div>

            {/* Level 2: ReplicaSet */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-48 h-16 bg-purple-900/40 border border-purple-500/50 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-purple-500/10">
                <GitBranch className="text-purple-400 w-5 h-5" />
                <span className="font-medium text-purple-100">ReplicaSet</span>
              </div>
              {/* Connector Lines Branching Out */}
              <div className="absolute top-full h-8 w-px bg-purple-500/50"></div>
              <div className="absolute top-[calc(100%+2rem)] w-[400px] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
              
              {/* Vertical Connectors to Pods */}
              <div className="absolute top-[calc(100%+2rem)] left-[calc(50%-200px)] h-8 w-px bg-green-500/30"></div>
              <div className="absolute top-[calc(100%+2rem)] left-1/2 h-8 w-px bg-green-500/30"></div>
              <div className="absolute top-[calc(100%+2rem)] right-[calc(50%-200px)] h-8 w-px bg-green-500/30"></div>
            </div>

            {/* Level 3: Pods */}
            <div className="flex gap-16 pt-8 z-10">
              {[1, 2, 3].map((pod) => (
                <div key={pod} className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-green-900/20 border border-green-500/30 rounded-full flex flex-col items-center justify-center gap-2 hover:bg-green-900/40 hover:scale-105 transition-all cursor-pointer">
                    <Server className="text-green-400 w-6 h-6" />
                    <span className="text-xs font-mono text-green-100">pod-xyz-{pod}</span>
                    <Badge className="text-[10px] h-4 bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">Running</Badge>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
