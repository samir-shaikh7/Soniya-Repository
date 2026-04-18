import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

export const ManageTestimonials = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [form, setForm] = useState({ client_name: "", review_text: "", rating: 5, type: "Bride" });

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error fetching", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert([form]);
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Testimonial Added" });
      setForm({ client_name: "", review_text: "", rating: 5, type: "Bride" });
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) fetchData();
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Add New Testimonial</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Author Name</label>
                <input required type="text" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Type / Tag</label>
                <input required type="text" value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full p-2 border rounded" placeholder="e.g. Bride, Student" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Rating (1-5)</label>
                <select value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} className="w-full p-2 border rounded">
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-bold mb-1">Review Text</label>
                <textarea required value={form.review_text} onChange={e => setForm({...form, review_text: e.target.value})} className="w-full p-2 border rounded" rows={3} />
              </div>
            </div>
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold uppercase text-sm tracking-wide">Add Testimonial</button>
          </form>

          {loading ? <p>Loading testimonials...</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(i => (
                <div key={i.id} className="bg-white p-4 rounded-lg border border-border flex flex-col justify-between items-start relative">
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold">{i.client_name} <span className="text-xs font-normal bg-neutral-100 px-2 py-1 rounded ml-2">{i.type}</span></h3>
                       <p className="text-gold text-sm font-bold">{i.rating} ★</p>
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{i.review_text}"</p>
                  </div>
                  <button onClick={() => handleDelete(i.id)} className="mt-4 text-red-500 text-sm flex items-center gap-1 hover:underline">
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              ))}
              {items.length === 0 && <p className="text-muted-foreground">No testimonials found.</p>}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
