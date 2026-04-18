import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load all page components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const BridalPricing = lazy(() => import("./pages/BridalPricing"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Courses"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/admin/Login"));

// Admin pages
const Dashboard = lazy(() => import("./pages/admin/Dashboard").then(m => ({ default: m.Dashboard })));
const ManagePortfolio = lazy(() => import("./pages/admin/ManagePortfolio").then(m => ({ default: m.ManagePortfolio })));
const ManageServices = lazy(() => import("./pages/admin/ManageServices").then(m => ({ default: m.ManageServices })));
const ManageBookings = lazy(() => import("./pages/admin/ManageBookings").then(m => ({ default: m.ManageBookings })));
const ManageTestimonials = lazy(() => import("./pages/admin/ManageTestimonials").then(m => ({ default: m.ManageTestimonials })));
const ManageCourses = lazy(() => import("./pages/admin/ManageCourses").then(m => ({ default: m.ManageCourses })));
const ManageSettings = lazy(() => import("./pages/admin/ManageSettings").then(m => ({ default: m.ManageSettings })));

const queryClient = new QueryClient();

// Minimal loading screen
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-cream">
    <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bridal-pricing" element={<BridalPricing />} />
            <Route path="/packages" element={<Navigate to="/bridal-pricing" replace />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/portfolio" element={<ManagePortfolio />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/testimonials" element={<ManageTestimonials />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/settings" element={<ManageSettings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
