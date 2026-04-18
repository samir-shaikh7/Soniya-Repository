import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ManageSettings = () => {
  const [form, setForm] = useState({
    business_name: "",
    whatsapp_number: "",
    instagram_link: "",
    contact_email: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("settings").select("*").single();
    if (data) setForm(data);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Remove id from payload if handling upsert/insert
    const payload = { ...form };
    const id = (payload as any).id;
    
    let error;
    if (id) {
      const { error: updateError } = await supabase.from("settings").update(payload).eq("id", id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("settings").insert([payload]);
      error = insertError;
      // Fetch settings again to grab the new ID
      fetchSettings();
    }
    
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Settings updated successfully" });
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold">Business Settings</h1>
          {loading ? <p>Loading...</p> : (
            <form onSubmit={handleSave} className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Business Name</label>
                <input type="text" value={form.business_name} onChange={e => setForm({...form, business_name: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">WhatsApp Number</label>
                <input type="text" value={form.whatsapp_number} onChange={e => setForm({...form, whatsapp_number: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Instagram Link</label>
                <input type="text" value={form.instagram_link} onChange={e => setForm({...form, instagram_link: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Contact Email</label>
                <input type="text" value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Location</label>
                <input type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold uppercase text-sm w-full mt-4">Save Settings</button>
            </form>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
