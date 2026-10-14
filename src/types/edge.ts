export interface Edge {
    id: string;
    serial_number: string;
    mgmt_ip_address: string;
    vpn_ip_address: string;
    cpu_capacity: number;
    memory_capcity: number;
    disk_capacity: number;
    edge_location: string;
    is_up: boolean;
    is_provisioned: boolean;
}