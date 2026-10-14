import { useState } from "react";
import { useCreateEdge } from "@/hooks/use-edges";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function AddEdgeDialog() {
  const [open, setOpen] = useState(false);
  const { mutateAsync } = useCreateEdge();

  // Edge form
  const [edge, setEdge] = useState({
    id: "",
    serial_number: "",
    mgmt_ip_address: "",
    cpu_capacity: 0,
    memory_capacity: 0,
    disk_capacity: 0,
    edge_location: "",
  });

  // VPN form
  const [vpn, setVpn] = useState({
    connection_id: "",
    local_addrs: "",
    remote_addrs: "",
    psk: "",
    name: "",
    local_ts: "",
    remote_ts: "",
  });

  const updateEdge = (k: string, v: any) =>
    setEdge((prev) => ({ ...prev, [k]: v }));

  const updateVpn = (k: string, v: any) =>
    setVpn((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async () => {
    const vpnPayload = {
      connection_id: vpn.connection_id,
      config: {
        version: "2",
        local_addrs: [vpn.local_addrs],
        remote_addrs: [vpn.remote_addrs],
        local_auth: {
          auth_method: "psk",
          psk: vpn.psk,
        },
        remote_auth: {
          auth_method: "psk",
          psk: vpn.psk,
        },
        children: [
          {
            name: vpn.name,
            local_ts: [vpn.local_ts],
            remote_ts: [vpn.remote_ts],
            mode: "tunnel",
            start_action: "start",
          },
        ],
        proposals: ["aes256-sha256-modp2048"],
      },
    };

    console.log("EDGE:", edge);
    console.log("VPN:", vpnPayload);
    try {
        
        await mutateAsync({edge, vpn: {connection_id: vpnPayload.connection_id, config: vpnPayload.config}});
        const {dismiss} = toast({
            title: "Edge created",
            description: `Edge ${edge.id} was successfully registered`,
            className: "bg-green-400 text-white border-green-700",
        
        });
        setOpen(false);
        setTimeout(() => {
            dismiss()
        }, 2000)
    } catch (error) {
        toast({
            title: "Error",
            description: "Failed to create edge",
            variant: "destructive",
        });
    }finally {

    }
    
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="hover:cursor-pointer">
        <Plus className="w-4 h-4 mr-2" />
        Add Edge
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Edge</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="edge" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="edge">Edge Info</TabsTrigger>
              <TabsTrigger value="vpn">VPN Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="edge" className="space-y-3">
              <Input value={edge.id} placeholder="ID" onChange={(e) => updateEdge("id", e.target.value)} />
              <Input value={edge.serial_number} placeholder="Serial" onChange={(e) => updateEdge("serial_number", e.target.value)} />
              <Input value={edge.mgmt_ip_address} placeholder="Mgmt IP Address" onChange={(e) => updateEdge("mgmt_ip_address", e.target.value)} />

              <Input value={edge.cpu_capacity} type="number" placeholder="CPU"
                onChange={(e) => updateEdge("cpu_capacity", +e.target.value)}
              />
              <Input value={edge.memory_capacity} type="number" placeholder="Memory"
                onChange={(e) => updateEdge("memory_capacity", +e.target.value)}
              />
              <Input value={edge.disk_capacity} type="number" placeholder="Disk"
                onChange={(e) => updateEdge("disk_capacity", +e.target.value)}
              />

              <Input value={edge.edge_location} placeholder="Location"
                onChange={(e) => updateEdge("edge_location", e.target.value)}
              />
            </TabsContent>

            <TabsContent value="vpn" className="space-y-3">
              <Input value={vpn.connection_id} placeholder="Connection ID"
                onChange={(e) => updateVpn("connection_id", e.target.value)}
              />

              <Input value={vpn.local_addrs} placeholder="Local Address"
                onChange={(e) => updateVpn("local_addrs", e.target.value)}
              />

              <Input value={vpn.remote_addrs} placeholder="Remote Address"
                onChange={(e) => updateVpn("remote_addrs", e.target.value)}
              />

              <Input value={vpn.psk} placeholder="Pre-shared key (PSK)"
                onChange={(e) => updateVpn("psk", e.target.value)}
              />

              <Input value={vpn.name} placeholder="SA Name"
                onChange={(e) => updateVpn("name", e.target.value)}
              />

              <Input value={vpn.local_ts} placeholder="Local TS (example: 192.168.1.0/24)"
                onChange={(e) => updateVpn("local_ts", e.target.value)}
              />

              <Input value={vpn.remote_ts} placeholder="Remote TS"
                onChange={(e) => updateVpn("remote_ts", e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}