import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ElementType;
  className?: string;
  trend?: "up" | "down" | "neutral";
}

export function StatCard({ title, value, change, icon: Icon, className, trend }: StatCardProps) {
  return (
    <Card className={cn("p-6 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-display font-bold text-foreground">{value}</h3>
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      
      {typeof change !== 'undefined' && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn(
            "flex items-center font-medium mr-2",
            trend === 'up' ? "text-emerald-500" : trend === 'down' ? "text-red-500" : "text-muted-foreground"
          )}>
            {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : trend === 'down' ? <ArrowDown className="w-4 h-4 mr-1" /> : null}
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground text-xs">from last month</span>
        </div>
      )}
    </Card>
  );
}
