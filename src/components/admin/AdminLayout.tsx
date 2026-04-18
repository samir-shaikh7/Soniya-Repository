import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  GraduationCap, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Portfolio", path: "/admin/portfolio", icon: ImageIcon },
    { title: "Services", path: "/admin/services", icon: Sparkles },
    { title: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { title: "Bridal Leads", path: "/admin/bookings", icon: Calendar },
    { title: "Course Leads", path: "/admin/courses", icon: GraduationCap },
    { title: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-primary text-primary-foreground z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 pb-2 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gold tracking-wider">Admin</h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-primary-foreground">
              <X size={24} />
            </button>
          </div>
          <div className="px-6 pb-6">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50">Business System</p>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-gold text-primary font-semibold" : "hover:bg-primary-foreground/10"
                  }`}
                >
                  <item.icon size={20} className={isActive ? "text-primary" : "text-gold-light"} />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-300 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        <header className="bg-white border-b border-border h-16 flex items-center px-4 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-primary hover:bg-neutral-100 rounded-md"
          >
            <Menu size={24} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm border border-gold/30 bg-gold/10 text-gold px-3 py-1 rounded-full font-semibold">
              Live Environment
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
