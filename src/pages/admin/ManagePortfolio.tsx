import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Image as ImageIcon, Pencil, X, Link as LinkIcon, Upload } from "lucide-react";

export const ManagePortfolio = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const { toast } = useToast();

  const [form, setForm] = useState({ title: "", category: "Maharashtrian", image_url: "" });
  const [file, setFile] = useState<File | null>(null);

  const fetchPortfolio = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error fetching portfolio", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const resetForm = () => {
    setForm({ title: "", category: "Maharashtrian", image_url: "" });
    setFile(null);
    setEditingId(null);
    setUploadMethod("file");
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({ title: item.title, category: item.category, image_url: item.image_url });
    setFile(null);
    setUploadMethod(item.image_url.startsWith('http') && !item.image_url.includes('supabase.co') ? "url" : "file");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isUrlMode = uploadMethod === "url";
    const hasImage = isUrlMode ? form.image_url.trim() !== "" : (file || (editingId && items.find(i => i.id === editingId)?.image_url));

    if (!hasImage) {
      toast({ title: "Validation Error", description: "Please provide an image (upload or link)", variant: "destructive" });
      return;
    }

    setUploading(true);
    let finalImageUrl = isUrlMode ? form.image_url : (items.find(i => i.id === editingId)?.image_url || "");

    try {
      if (!isUrlMode && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file);
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        finalImageUrl = publicUrl;
      }

      const payload = {
        title: form.title,
        category: form.category,
        image_url: finalImageUrl,
      };

      if (editingId) {
        const { error: dbError } = await supabase.from('portfolio').update(payload).eq('id', editingId);
        if (dbError) throw dbError;
        toast({ title: "Portfolio updated successfully" });
      } else {
        const { error: dbError } = await supabase.from('portfolio').insert(payload);
        if (dbError) throw dbError;
        toast({ title: "Portfolio added successfully" });
      }

      resetForm();
      fetchPortfolio();
    } catch (error: any) {
      toast({ title: editingId ? "Update Failed" : "Upload Failed", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Portfolio deleted successfully" });
      fetchPortfolio();
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Portfolio Management</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-border shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">{editingId ? "Update Portfolio Item" : "Add New Image"}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-sm text-red-500 flex items-center gap-1 hover:underline">
                  <X size={14} /> Cancel Editing
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Title</label>
                <input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="p-2 border rounded focus:ring-1 focus:ring-primary outline-none" placeholder="Bride Name / Look Title" />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-bold mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="p-2 border rounded focus:ring-1 focus:ring-primary outline-none bg-white">
                  <option>Maharashtrian</option>
                  <option>South Indian</option>
                  <option>Engagement</option>
                  <option>Carnival</option>
                </select>
              </div>

              <div className="flex flex-col lg:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-bold">Image Source</label>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setUploadMethod("file")} className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${uploadMethod === 'file' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                      <Upload size={10} className="inline mr-1" /> Upload
                    </button>
                    <button type="button" onClick={() => setUploadMethod("url")} className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${uploadMethod === 'url' ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                      <LinkIcon size={10} className="inline mr-1" /> Paste Link
                    </button>
                  </div>
                </div>

                {uploadMethod === "file" ? (
                  <input required={!editingId} type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="p-1.5 border rounded text-xs file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-primary/10 file:text-primary" />
                ) : (
                  <input required type="url" value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} className="p-2 border rounded text-sm focus:ring-1 focus:ring-primary outline-none" placeholder="https://image-link.com/photo.jpg" />
                )}
              </div>
            </div>
            
            <button disabled={uploading} type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded font-bold uppercase text-xs tracking-widest disabled:opacity-50 hover:opacity-90 transition-opacity">
              {uploading ? "Processing..." : editingId ? "Update Image" : "Upload Image"}
            </button>
          </form>

          {loading ? (
            <p className="text-muted-foreground p-4">Loading portfolio items...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-border group relative flex flex-col hover:border-gold/50 transition-colors">
                  <div className="aspect-[4/3] bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-muted-foreground opacity-50" size={40} />
                    )}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(item)} className="bg-white/90 p-2 rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="bg-white/90 p-2 rounded-full text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:scale-110">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <p className="font-bold text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</p>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="col-span-full py-10 text-center text-muted-foreground bg-neutral-50 rounded-lg border-2 border-dashed">No portfolio items found. Upload one above!</p>}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
