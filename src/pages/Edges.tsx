import Layout from "@/components/Layout";
import { useEdges } from "@/hooks/use-edges";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { AddEdgeDialog } from "@/components/AddEdgeDialog";

export default function Edges() {
  const { data: edges, isLoading } = useEdges();
  const [search, setSearch] = useState("");

  const filteredEdges = edges?.filter(edge => 
    edge.id.toLowerCase().includes(search.toLowerCase()) || 
    edge.serial_number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Edges</h1>
          <p className="text-muted-foreground">Manage your edge devices</p>
        </div>
        <div className="flex gap-2">
          {/* <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Edge
          </Button> */}
          <AddEdgeDialog />
        </div>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search edges..." 
                className="pl-9 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-50">Id</TableHead>
                  <TableHead>Serial No.</TableHead>
                  <TableHead>Mgmt IP</TableHead>
                  <TableHead>Virtual IP</TableHead>
                  <TableHead>Reachability</TableHead>
                  <TableHead>Prov Status</TableHead>
                  <TableHead className="w-12.5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><div className="h-4 w-32 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-24 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-16 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-16 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-16 bg-muted/50 rounded animate-pulse" /></TableCell>
                      <TableCell className="text-right"><div className="h-4 w-24 bg-muted/50 rounded animate-pulse ml-auto" /></TableCell>
                      <TableCell><div className="h-8 w-8 bg-muted/50 rounded animate-pulse" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredEdges?.length === 0 ? (
                   <TableRow>
                     <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                       No edges found.
                     </TableCell>
                   </TableRow>
                ) : (
                  filteredEdges?.map((edge) => (
                    <TableRow key={edge.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-primary">{edge.id}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{edge.serial_number}</TableCell>
                      <TableCell className="font-mono text-xs">{edge.mgmt_ip_address == null || edge.mgmt_ip_address == "" ? <>Not yet assigned</> : <>{edge.mgmt_ip_address}</>}</TableCell>
                      <TableCell className="font-mono text-xs">{edge.vpn_ip_address == null || edge.vpn_ip_address == "" ? <>Not yet assigned</> : <>{edge.vpn_ip_address}</>}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          edge.is_up 
                            ? "border-green-500/50 text-green-500 bg-green-500/10" 
                            : "border-red-500/50 text-red-500 bg-red-500/10"
                        }>
                          {edge.is_up ? <>UP</> : <>DOWN</>}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          edge.is_provisioned
                            ? "border-blue-500/50 text-blue-500 bg-blue-500/10" 
                            : "border-yellow-500/50 text-yellow-500 bg-yellow-500/10"
                        }>
                          {edge.is_provisioned ? <>PROVISIONED</>: <>NOT PROVISIONED</>}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
