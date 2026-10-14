import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import NotFound from "./pages/not-found";
import Dashboard from "./pages/Dashboard";
import Edges from "./pages/Edges";
import Apps from "./pages/Apps";
import AppDetails from "./pages/AppDetails";
import Clusters from "./pages/Clusters";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/edges" component={Edges} />
      <Route path="/apps" component={Apps} />
      <Route path="/apps/:id" component={AppDetails} />
      <Route path="/clusters" component={Clusters} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
