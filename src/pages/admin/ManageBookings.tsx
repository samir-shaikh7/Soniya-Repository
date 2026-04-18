import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ManageBookings = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", event_type: "Bridal", event_date: "", location: "", message: "", status: "New" });
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (!error) {
      toast({ title: "Status updated" });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (!error) {
        toast({ title: "Lead deleted successfully" });
        fetchData();
      } else {
        toast({ title: "Error deleting lead", variant: "destructive", description: error.message });
      }
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      phone: item.phone,
      event_type: item.event_type,
      event_date: item.event_date ? new Date(item.event_date).toISOString().split('T')[0] : "",
      location: item.location,
      message: item.message || "",
      status: item.status
    });
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from("bookings").update(form).eq("id", editingId);
      if (!error) {
        toast({ title: "Lead updated successfully" });
        setEditingId(null);
        setForm({ name: "", phone: "", event_type: "Bridal", event_date: "", location: "", message: "", status: "New" });
        fetchData();
      } else {
        toast({ title: "Error tracking lead", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await supabase.from("bookings").insert([form]);
      if (!error) {
        toast({ title: "Lead logged successfully" });
        fetchData();
        setForm({ name: "", phone: "", event_type: "Bridal", event_date: "", location: "", message: "", status: "New" });
      } else {
        toast({ title: "Error tracking lead", description: error.message, variant: "destructive" });
      }
    }
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Bridal Leads</h1>
          
          <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg border border-border shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-full flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
              <h2 className="font-bold">{editingId ? "Edit Lead" : "Manual Entry / Log WhatsApp Lead"}</h2>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", phone: "", event_type: "Bridal", event_date: "", location: "", message: "", status: "New" }); }} className="text-sm border border-border px-3 py-1 rounded bg-neutral-100 font-medium">Cancel Edit</button>
              )}
            </div>
            <input required type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <input required type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <select value={form.event_type} onChange={e => setForm({...form, event_type: e.target.value})} className="w-full p-3 md:p-2 border rounded">
              <option>Bridal</option>
              <option>Engagement</option>
              <option>Party</option>
              <option>Other</option>
            </select>
            <input required type="date" value={form.event_date} onChange={e => setForm({...form, event_date: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <input required type="text" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full p-3 md:p-2 border rounded">
              <option>New</option>
              <option>Contacted</option>
              <option>Confirmed</option>
            </select>
            <input type="text" placeholder="Notes (Optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full p-3 md:p-2 border rounded col-span-full" />
            <button type="submit" className="w-full bg-primary text-primary-foreground font-bold uppercase rounded p-4 md:p-2 text-sm col-span-full">{editingId ? "Update Lead" : "Add Lead"}</button>
          </form>
          
          {loading ? <p className="text-center py-8">Loading...</p> : (
            <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                  <thead className="bg-neutral-50 border-b border-border">
                  <tr>
                    <th className="p-4 font-bold">Details</th>
                    <th className="p-4 font-bold">Event Type</th>
                    <th className="p-4 font-bold">Location</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(i => (
                    <tr key={i.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                      <td className="p-4">
                        <p className="font-bold">{i.name}</p>
                        <p className="text-xs text-muted-foreground">{i.phone}</p>
                      </td>
                      <td className="p-4">{i.event_type}</td>
                      <td className="p-4">{i.location}</td>
                      <td className="p-4">{new Date(i.event_date).toLocaleDateString()}</td>
                      <td className="p-4">
                        <select 
                          value={i.status} 
                          onChange={(e) => updateStatus(i.id, e.target.value)}
                          className={`p-1 text-xs font-bold rounded border ${i.status === 'New' ? 'bg-blue-100 text-blue-800' : i.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                        >
                          <option>New</option>
                          <option>Contacted</option>
                          <option>Confirmed</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleEdit(i)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(i.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr className="text-center p-8"><td colSpan={6} className="p-8">No bookings yet.</td></tr>}
                </tbody>
              </table>
             </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
