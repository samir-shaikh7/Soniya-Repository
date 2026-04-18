import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";

export const Dashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, enquiries: 0, portfolio: 0, testimonials: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [b, e, p, t] = await Promise.all([
        supabase.from("bookings").select("*", { count: 'exact', head: true }),
        supabase.from("course_enquiries").select("*", { count: 'exact', head: true }),
        supabase.from("portfolio").select("*", { count: 'exact', head: true }),
        supabase.from("testimonials").select("*", { count: 'exact', head: true })
      ]);
      setStats({
        bookings: b.count || 0,
        enquiries: e.count || 0,
        portfolio: p.count || 0,
        testimonials: t.count || 0
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to the Admin Dashboard. Select an option from the sidebar to manage your content.</p>
          
          {loading ? <p>Loading stats...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Total Bridal Leads</h3>
                <p className="text-4xl font-bold text-primary">{stats.bookings}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Total Testimonials</h3>
                <p className="text-4xl font-bold text-primary">{stats.testimonials}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Total Course Leads</h3>
                <p className="text-4xl font-bold text-primary">{stats.enquiries}</p>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Portfolio Items</h3>
                <p className="text-4xl font-bold text-primary">{stats.portfolio}</p>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
