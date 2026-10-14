import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Network, 
  Server, 
  AppWindow, 
  Settings, 
  LogOut,
  Menu,
  Bell
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import NimbusLogo from '../assets/nimbus-logo-dark.png';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
}


function SidebarItem({ icon: Icon, label, href, active }: SidebarItemProps) {
  return (
    <Link href={href} className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      active 
        ? "bg-primary/10 text-primary border-r-2 border-primary" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
    )}>
      <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Network, label: "Edges", href: "/edges" },
    { icon: Server, label: "Clusters", href: "/clusters" },
    { icon: AppWindow, label: "Apps", href: "/apps" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-border/50">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-blue-600 mr-3 flex items-center justify-center">
              <img src={NimbusLogo}/>
            </div>
            <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Nimbus
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Orchestration
            </p>
            {navItems.map((item) => (
              <SidebarItem 
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location === item.href}
              />
            ))}

            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-4">
              System
            </p>
            <SidebarItem icon={Settings} label="Settings" href="/settings" active={location === "/settings"} />
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Mohammed</p>
                <p className="text-xs text-muted-foreground truncate">mohammed@nimbus.ca</p>
              </div>
              <LogOut className="w-4 h-4 text-muted-foreground hover:text-red-400 transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-display font-semibold hidden md:block">
              {navItems.find(i => i.href === location)?.label || "Dashboard"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             </Button>
          </div>
        </header>

        {/* Page Content - Now scrollable */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black/20">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}