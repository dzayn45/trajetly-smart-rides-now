
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { TripProvider } from "@/context/TripContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DriverDashboard from "./pages/driver/Dashboard";
import VehiclesPage from "./pages/driver/Vehicles";
import PassengerDashboard from "./pages/passenger/Dashboard";
import SearchPage from "./pages/passenger/Search";
import ReservationsPage from "./pages/passenger/Reservations";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateTripPage from "./pages/CreateTrip";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TripProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Driver Routes */}
              <Route path="/driver/dashboard" element={<DriverDashboard />} />
              <Route path="/driver/vehicles" element={<VehiclesPage />} />
              <Route path="/create-trip" element={<CreateTripPage />} />
              
              {/* Passenger Routes */}
              <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/passenger/reservations" element={<ReservationsPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TripProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
