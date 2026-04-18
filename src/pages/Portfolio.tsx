import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

const categories = ["All", "Maharashtrian", "South Indian", "Engagement", "Carnival"];

const Portfolio = () => {
  const [active, setActive] = useState("All");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
        if (!error && data) {
          setImages(data.map(d => ({ src: d.image_url, cat: d.category, label: d.title, id: d.id })));
        }
      } catch (err) {
        console.error("Portfolio fetch error:", err);
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  const filtered = active === "All" ? images : images.filter((img) => img.cat === active);

  return (
    <Layout>
      <SEO
        title="Portfolio | Real Brides & Makeovers"
        description="Browse our portfolio of real traditional Maharashtrian, South Indian, and modern bridal transformations. Expertise in professional makeover services."
      />
      <section className="relative py-24 md:py-32 gradient-primary">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4">Our Work</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Portfolio</h1>
            <p className="font-subheading text-xl text-primary-foreground/70">
              A curated showcase of real brides, real transformations, and timeless beauty.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full font-body text-sm tracking-wider uppercase transition-all ${active === cat
                    ? "gradient-gold text-foreground font-semibold"
                    : "bg-background text-muted-foreground border border-border hover:border-gold/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-lg aspect-[3/4] overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            ) : filtered.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No imagery found for this category.</p>
            ) : (
              filtered.map((img, i) => (
                <motion.div
                  key={img.id || img.src + active}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-lg aspect-[3/4]"
                >
                  <img src={img.src} alt={img.label} loading="lazy" width={800} height={1000} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <p className="text-primary-foreground font-subheading text-lg">{img.label}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
