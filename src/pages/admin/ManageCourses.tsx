import { useState, useEffect } from "react";
import { Trash2, Edit } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ManageCourses = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", course_type: "Basic Makeup Course", message: "" });
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("course_enquiries").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error fetching leads", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      const { error } = await supabase.from("course_enquiries").delete().eq("id", id);
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
      course_type: item.course_type,
      message: item.message || ""
    });
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      const { error } = await supabase.from("course_enquiries").update(form).eq("id", editingId);
      if (!error) {
        toast({ title: "Lead updated successfully" });
        setEditingId(null);
        setForm({ name: "", phone: "", course_type: "Basic Makeup Course", message: "" });
        fetchData();
      } else {
        toast({ title: "Error tracking lead", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await supabase.from("course_enquiries").insert([form]);
      if (!error) {
        toast({ title: "Lead logged successfully" });
        fetchData();
        setForm({ name: "", phone: "", course_type: "Basic Makeup Course", message: "" });
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
          <h1 className="text-3xl font-bold">Course Leads</h1>
          
          <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg border border-border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
              <h2 className="font-bold">{editingId ? "Edit Lead" : "Manual Entry / Log WhatsApp Lead"}</h2>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", phone: "", course_type: "Basic Makeup Course", message: "" }); }} className="text-sm border border-border px-3 py-1 rounded bg-neutral-100 font-medium">Cancel Edit</button>
              )}
            </div>
            <input required type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <input required type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <select required value={form.course_type} onChange={e => setForm({...form, course_type: e.target.value})} className="w-full p-3 md:p-2 border rounded">
              <option>Basic Makeup Course</option>
              <option>Advanced Makeup Course</option>
              <option>Professional Course</option>
            </select>
            <input type="text" placeholder="Notes (Optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full p-3 md:p-2 border rounded" />
            <button type="submit" className="w-full bg-primary text-primary-foreground font-bold uppercase rounded p-4 md:p-2 text-sm col-span-full">{editingId ? "Update Lead" : "Add Lead"}</button>
          </form>
          
          {loading ? <p className="text-center py-8">Loading course leads...</p> : (
            <div className="bg-white rounded-lg border border-border overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px] md:whitespace-normal md:min-w-0">
                  <thead className="bg-neutral-50 border-b border-border">
                  <tr>
                    <th className="p-4 font-bold">Name & Contact</th>
                    <th className="p-4 font-bold">Course Type</th>
                    <th className="p-4 font-bold">Message</th>
                    <th className="p-4 font-bold">Date Received</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(i => (
                    <tr key={i.id} className="border-b border-border last:border-0 hover:bg-neutral-50">
                      <td className="p-4 align-top">
                        <p className="font-bold">{i.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{i.phone}</p>
                      </td>
                      <td className="p-4 align-top">{i.course_type}</td>
                      <td className="p-4 align-top max-w-xs truncate" title={i.message}>{i.message || "-"}</td>
                      <td className="p-4 align-top">{new Date(i.created_at).toLocaleDateString()}</td>
                      <td className="p-4 align-top text-right whitespace-nowrap">
                        <button onClick={() => handleEdit(i)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(i.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && <tr className="text-center"><td colSpan={5} className="p-8 text-muted-foreground">No course enquiries received yet.</td></tr>}
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
