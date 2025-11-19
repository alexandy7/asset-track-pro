import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "@/contexts/InventoryContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EmployeesList from "./pages/employees/EmployeesList";
import UnitsOfMeasure from "./pages/inventory/UnitsOfMeasure";
import Categories from "./pages/inventory/Categories";
import ItemsList from "./pages/inventory/ItemsList";
import PhonesList from "./pages/phones/PhonesList";
import ChipsList from "./pages/phones/ChipsList";
import LinesList from "./pages/phones/LinesList";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <InventoryProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/colaboradores" element={<EmployeesList />} />
              <Route path="/estoque/unidades" element={<UnitsOfMeasure />} />
              <Route path="/estoque/categorias" element={<Categories />} />
              <Route path="/estoque/itens" element={<ItemsList />} />
              <Route path="/telefonia/telefones" element={<PhonesList />} />
              <Route path="/telefonia/chips" element={<ChipsList />} />
              <Route path="/telefonia/linhas" element={<LinesList />} />
              <Route path="/historico" element={<History />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </InventoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
