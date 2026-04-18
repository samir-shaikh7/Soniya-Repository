import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Pencil, X, Eye, Upload, Link as LinkIcon, Save, Sparkles, Image as ImageIcon } from "lucide-react";

export const ManageServices = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("url");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { toast } = useToast();

  const [form, setForm] = useState({ 
    service_name: "", 
    description: "", 
    price: "", 
    category: "Bridal",
    image_url: "",
    features: [] as string[],
    is_popular: false
  });

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error fetching", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // Handle preview for URL or local file
  useEffect(() => {
    if (uploadMethod === "url") {
      setPreviewUrl(form.image_url);
    } else if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(form.image_url);
    }
  }, [form.image_url, file, uploadMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.service_name.trim()) {
      toast({ title: "Validation Error", description: "Service name is required", variant: "destructive" });
      return;
    }
    const filteredFeatures = form.features.filter(f => f && f.trim() !== "");
    if (filteredFeatures.length === 0) {
      toast({ title: "Validation Error", description: "Add at least one feature", variant: "destructive" });
      return;
    }

    setProcessing(true);
    let finalImageUrl = form.image_url;

    try {
      // Handle file upload if in file mode
      if (uploadMethod === "file" && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Using "portfolio" bucket as default as it's guaranteed to exist from schema
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file);
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        finalImageUrl = publicUrl;
      }

      const dataToSave = { 
        service_name: form.service_name,
        description: form.description,
        price: form.price,
        category: form.category,
        image_url: finalImageUrl,
        features: filteredFeatures,
        is_popular: form.is_popular
      };

      if (editingId) {
        // FIXED: Using object instead of array for .update()
        const { error } = await supabase.from("services").update(dataToSave).eq("id", editingId);
        if (error) throw error;
        toast({ title: "Service updated successfully" });
      } else {
        const { error } = await supabase.from("services").insert(dataToSave);
        if (error) throw error;
        toast({ title: "Service added successfully" });
      }

      resetForm();
      fetchData();
      window.scrollTo({ top: document.getElementById('services-list')?.offsetTop || 800, behavior: 'smooth' });
    } catch (error: any) {
      toast({ title: "Action Failed", description: error.message, variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setForm({ 
      service_name: "", 
      description: "", 
      price: "", 
      category: "Bridal",
      image_url: "",
      features: [],
      is_popular: false
    });
    setFile(null);
    setEditingId(null);
    setUploadMethod("url");
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setForm({
      service_name: item.service_name,
      description: item.description,
      price: item.price || "",
      category: item.category,
      image_url: item.image_url || "",
      features: Array.isArray(item.features) ? item.features : [],
      is_popular: item.is_popular || false
    });
    // If it's a Supabase URL, favor "file" mode (editing existing image), else "url"
    setUploadMethod(item.image_url?.includes('supabase.co') ? "file" : "url");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ""] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...form.features];
    newFeatures.splice(index, 1);
    setForm({ ...form, features: newFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (!error) {
      toast({ title: "Service deleted successfully" });
      fetchData();
    } else {
      toast({ title: "Deletion failed", description: error.message, variant: "destructive" });
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Services CRM</h1>
            <a href="/services" target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors">
              <Eye size={16} /> View Live Services
            </a>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-border shadow-xl space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center border-b border-border pb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${editingId ? 'bg-amber-50 text-amber-600' : 'bg-primary/5 text-primary'}`}>
                  {editingId ? <Pencil size={20} /> : <Plus size={20} />}
                </div>
                <h2 className="text-xl font-bold text-foreground">{editingId ? "Edit Service Details" : "Create New Service"}</h2>
              </div>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-full hover:bg-neutral-50">
                  <X size={14} /> Cancel Editing
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Service Identity</label>
                  <input required placeholder="E.g. Royal Maharashtrian Bridal" type="text" value={form.service_name} onChange={e => setForm({...form, service_name: e.target.value})} className="w-full p-3.5 border border-border rounded-xl focus:ring-4 focus:ring-gold/5 focus:border-gold outline-none transition-all placeholder:text-muted-foreground/50" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Pricing</label>
                    <input type="text" placeholder="₹15,000 / On Request" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full p-3.5 border border-border rounded-xl focus:ring-4 focus:ring-gold/5 focus:border-gold outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Category</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-3.5 border border-border rounded-xl focus:ring-4 focus:ring-gold/5 focus:border-gold outline-none transition-all bg-white cursor-pointer">
                      <option value="Bridal">Bridal</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Party">Party</option>
                      <option value="Package">Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Marketing Pitch</label>
                  <textarea required placeholder="Briefly describe what makes this service special..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-3.5 border border-border rounded-xl focus:ring-4 focus:ring-gold/5 focus:border-gold outline-none transition-all resize-none min-h-[100px]" rows={3} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Thumbnail Visual</label>
                    <div className="flex p-0.5 bg-neutral-100 rounded-lg">
                      <button type="button" onClick={() => setUploadMethod("file")} className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all ${uploadMethod === 'file' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                        Upload
                      </button>
                      <button type="button" onClick={() => setUploadMethod("url")} className={`px-3 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all ${uploadMethod === 'url' ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                        URL Link
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      {uploadMethod === "url" ? (
                        <input type="text" placeholder="https://..." value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="w-full p-3.5 border border-border rounded-xl focus:ring-4 focus:ring-gold/5 focus:border-gold outline-none transition-all text-sm" />
                      ) : (
                        <div className="relative group">
                          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                          <div className="w-full p-3.5 border-2 border-dashed border-border group-hover:border-gold/30 rounded-xl bg-neutral-50 flex items-center justify-center gap-2 text-sm text-muted-foreground transition-all">
                            <Upload size={16} /> 
                            <span className="truncate max-w-[150px]">{file ? file.name : editingId ? "Replace Current Image" : "Choose Image File"}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-20 h-20 rounded-xl border border-border bg-neutral-50 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "https://placehold.co/200x200?text=Error")} />
                      ) : (
                        <ImageIcon className="text-muted-foreground/20" size={30} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gold/5 rounded-xl border border-gold/10">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={form.is_popular} onChange={e => setForm({...form, is_popular: e.target.checked})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    <span className="ml-3 text-sm font-bold text-foreground select-none">Mark as "Most Popular" on Website</span>
                  </label>
                </div>
              </div>

              <div className="col-span-full border-t border-dashed border-border pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Service Value Props</label>
                    <p className="text-xs text-muted-foreground">List the features or items included in this package / service.</p>
                  </div>
                  <button type="button" onClick={addFeature} className="w-full sm:w-auto text-[10px] uppercase font-bold flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:shadow-lg transition-all active:scale-95">
                    <Plus size={14} /> Add Feature Point
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {form.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 group animate-in zoom-in-95 duration-200">
                      <div className="flex-1 flex items-center bg-white border border-border rounded-xl px-3 focus-within:ring-4 focus-within:ring-gold/5 focus-within:border-gold transition-all">
                        <span className="text-[10px] font-bold text-muted-foreground/50 mr-2 w-4">{idx + 1}</span>
                        <input required placeholder="E.g. HD Base & Eyelashes" value={feature} onChange={e => updateFeature(idx, e.target.value)} className="w-full bg-transparent py-3 outline-none text-sm font-medium" />
                      </div>
                      <button type="button" onClick={() => removeFeature(idx)} className="text-muted-foreground hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  {form.features.length === 0 && (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-neutral-100 rounded-2xl bg-neutral-50/50">
                      <Sparkles className="mx-auto text-gold/20 mb-3" size={40} />
                      <p className="text-sm text-muted-foreground font-medium">Elevate your service by adding unique features.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xs text-muted-foreground italic">
                * All changes will reflect instantly on the public website.
              </p>
              <button 
                type="submit" 
                disabled={processing}
                className="w-full md:w-auto min-w-[250px] bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {processing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                {processing ? "Saving Changes..." : editingId ? "Update Service Information" : "Launch Service to Website"}
              </button>
            </div>
          </form>

          <div id="services-list" className="space-y-6 pt-10">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Active Inventory</h2>
              <div className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold leading-none">
                {items.length} Services
              </div>
            </div>
            
            {loading ? (
              <div className="py-20 text-center animate-pulse">
                <div className="w-12 h-12 bg-neutral-100 rounded-full mx-auto mb-4" />
                <p className="text-sm text-muted-foreground font-medium">Syncing with database...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map(i => (
                  <div key={i.id} className="bg-white rounded-2xl border border-border flex flex-col group hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 overflow-hidden">
                    <div className="relative h-48 overflow-hidden bg-neutral-100">
                      <img src={i.image_url || "https://placehold.co/600x400?text=No+Preview"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${i.category === 'Package' ? 'bg-purple-500/90 text-white' : 'bg-white/90 text-primary'}`}>
                          {i.category}
                        </span>
                        {i.is_popular && <span className="text-[10px] uppercase font-bold px-3 py-1 rounded-full bg-gold/90 text-foreground shadow-sm backdrop-blur-md">Featured</span>}
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                         <button onClick={() => handleEdit(i)} className="p-3 bg-white text-primary rounded-full hover:bg-gold hover:text-white transition-all transform hover:scale-110 shadow-xl">
                            <Pencil size={18} />
                         </button>
                         <button onClick={() => handleDelete(i.id)} className="p-3 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 shadow-xl">
                            <Trash2 size={18} />
                         </button>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{i.service_name}</h3>
                        <p className="text-primary font-bold text-lg">{i.price || "Contact"}</p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 italic mb-6">"{i.description}"</p>
                      
                      <div className="mt-auto flex flex-wrap gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        {i.features?.slice(0, 3).map((f: string, idx: number) => (
                           <span key={idx} className="text-[10px] font-medium bg-neutral-100 px-2 py-0.5 rounded text-muted-foreground">{f}</span>
                        ))}
                        {i.features?.length > 3 && <span className="text-[10px] font-medium bg-neutral-100 px-2 py-0.5 rounded text-muted-foreground">+{i.features.length - 3} move</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                   <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-3xl bg-neutral-50/50">
                      <div className="w-20 h-20 bg-neutral-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <Plus className="text-muted-foreground/30" size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">Inventory is Empty</h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">Start by creating your first bridal or party makeup service using the form above.</p>
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};
