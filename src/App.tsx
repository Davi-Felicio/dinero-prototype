import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BottomNav } from "@/components/BottomNav";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import AssetDetail from "./pages/AssetDetail";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import Cards from "./pages/Cards";
import Categories from "./pages/Categories";
import Currencies from "./pages/Currencies";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-[430px] mx-auto relative min-h-screen">
    {children}
    <BottomNav />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div className="max-w-[430px] mx-auto"><Login /></div>} />
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/portfolio" element={<AppLayout><Portfolio /></AppLayout>} />
          <Route path="/asset/:ticker" element={<AppLayout><AssetDetail /></AppLayout>} />
          <Route path="/add" element={<AppLayout><AddTransaction /></AppLayout>} />
          <Route path="/transactions" element={<AppLayout><Transactions /></AppLayout>} />
          <Route path="/cards" element={<AppLayout><Cards /></AppLayout>} />
          <Route path="/categories" element={<AppLayout><Categories /></AppLayout>} />
          <Route path="/currencies" element={<AppLayout><Currencies /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
