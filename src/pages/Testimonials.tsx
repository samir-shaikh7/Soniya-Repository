import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (data) setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  return (
    <Layout>
      <section className="relative py-24 md:py-32 gradient-primary">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4">Bride Voices</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Reviews</h1>
            <p className="font-subheading text-xl text-primary-foreground/70">
              Real stories from real brides — hear what they have to say about their experience.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="col-span-full py-10 text-center text-muted-foreground">Loading testimonials...</p>
            ) : reviews.length === 0 ? (
              <p className="col-span-full py-10 text-center text-muted-foreground">No testimonials uploaded yet.</p>
            ) : (
              reviews.map((r, i) => (
                <motion.div
                  key={r.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  className="bg-background rounded-lg p-6 md:p-8 border border-border"
                >
                  <Quote size={24} className="text-gold/30 mb-4" />
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: r.rating || 5 }).map((_, j) => (
                      <Star key={j} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-subheading text-lg text-muted-foreground mb-5 italic leading-relaxed">"{r.review_text}"</p>
                  <div className="flex items-center justify-between">
                    <p className="font-body text-sm font-semibold text-foreground">— {r.client_name}</p>
                    <span className="text-xs bg-nude px-3 py-1 rounded-full text-muted-foreground tracking-wider uppercase">{r.type}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-primary text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Be Our Next Happy Bride?</h2>
          <p className="font-subheading text-lg text-primary-foreground/70 mb-6">Book your consultation today and let's create your dream bridal look.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 gradient-gold text-foreground font-body text-sm tracking-widest uppercase font-semibold rounded">
            Book Your Slot
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
