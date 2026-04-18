import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Shield, Award, Heart, Clock, Sparkles, ChevronRight, ArrowRight, Check, GraduationCap, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { BRIDAL_PRICING, ACADEMY_DETAILS, CONTACT_INFO, WHATSAPP_TEMPLATES } from "@/data/bridalData";

// Assets
import heroBride from "@/assets/hero-bride.jpg";
import southIndian1 from "@/assets/Owner.webp";
import heroBride2 from "@/assets/15.jpg";
import engagement1 from "@/assets/bride-engagement-1.jpg";
import party1 from "@/assets/bride-party-1.jpg";

const Index = () => {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);


  useEffect(() => {
    const fetchGallery = async () => {
      setLoadingGallery(true);
      try {
        const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false }).limit(6);
        if (data) {
          setGalleryImages(data.map(d => ({ src: d.image_url, label: d.title, id: d.id })));
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      }
      setLoadingGallery(false);
    };

    const fetchTestimonials = async () => {
      setLoadingTestimonials(true);
      try {
        const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false }).limit(3);
        if (data) setTestimonials(data);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
      }
      setLoadingTestimonials(false);
    };

    fetchGallery();
    fetchTestimonials();
  }, []);

  return (
    <Layout>
      <SEO
        title="Premium Bridal Makeup Artist in Sangli"
        description="Soniya Patange — Specialist in traditional Maharashtrian, South Indian, and modern airbrush bridal looks. Professional makeup academy with intensive 30-day courses."
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-cream/50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBride}
            alt="Premium Bridal Makeup"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light text-xs font-bold uppercase tracking-widest border border-gold/30 mb-6 backdrop-blur-sm">
              Premium Artistry by Soniya Patange
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
              Elegance <span className="text-gold-light italic">Redefined.</span>
            </h1>
            <p className="font-subheading text-xl md:text-2xl text-white/80 mb-10 leading-relaxed">
              Crafting timeless bridal transformations with a luxury touch for your most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/contact?service=Bridal Makeup"
                className="px-10 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                Check Availability <MessageCircle size={16} />
              </Link>
              <Link
                to="/bridal-pricing"
                className="px-10 py-4 bg-white/10 text-white font-bold tracking-widest uppercase text-xs rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-md flex items-center justify-center"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency Ribbon */}
      <div className="bg-burgundy py-3 overflow-hidden whitespace-nowrap relative z-20">
        <div className="flex animate-marquee gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4">
              <Sparkles size={12} className="text-gold-light" /> Limited Dates Available for 2026 Batch
            </span>
          ))}
        </div>
      </div>

      {/* Pricing Preview Section - NEW */}
      <section className="py-20 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="font-subheading text-lg text-gold tracking-widest uppercase mb-4">Investment</p>
              <h2 className="text-4xl md:text-5xl font-bold text-burgundy italic">Curated Bridal Packages</h2>
            </div>
            <Link to="/bridal-pricing" className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:text-gold transition-colors">
              Full Pricing Guide <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col group border border-gold/5"
            >
              <h3 className="text-3xl font-bold mb-2 text-burgundy">{BRIDAL_PRICING.hd.title}</h3>
              <p className="text-muted-foreground mb-8">Flawless, camera-ready natural finish.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-xs font-bold text-muted-foreground uppercase opacity-60">Starting from</span>
                <span className="text-4xl font-bold text-primary">₹15,000</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {BRIDAL_PRICING.hd.services.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex justify-between items-center text-sm font-semibold border-b border-nude/30 pb-3">
                    <span className="text-foreground/80">{s.name}</span>
                    <span className="text-primary">{s.price}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact?service=Bridal Makeup"
                className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold tracking-widest uppercase text-xs text-center hover:bg-primary hover:text-white transition-all block"
              >
                Enquire Now
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-burgundy p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden ring-4 ring-gold/20"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Star size={80} className="text-gold-light" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-gold-light">{BRIDAL_PRICING.luxury.title}</h3>
              <p className="text-white/60 mb-8">Waterproof, 18-hour stay luxury finish.</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-xs font-bold text-white/40 uppercase">Starting from</span>
                <span className="text-4xl font-bold text-gold-light">₹20,000</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {BRIDAL_PRICING.luxury.services.slice(0, 3).map((s, i) => (
                  <li key={i} className="flex justify-between items-center text-sm font-semibold border-b border-white/10 pb-3">
                    <span className="text-white/80">{s.name}</span>
                    <span className="text-gold-light">{s.price}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact?service=Luxury Airbrush Makeup"
                className="w-full py-4 rounded-xl gradient-gold text-foreground font-bold tracking-widest uppercase text-xs text-center hover:shadow-xl transition-all block"
              >
                Book Luxury Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Products Highlight - NEW */}
      <section className="py-20 bg-white border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-subheading text-lg text-gold tracking-widest uppercase mb-8">The Professional Kit</p>
          <h2 className="text-3xl font-bold mb-12 text-burgundy italic">Only the Finest for Your Skin</h2>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60">
            {["DIOR", "CHARLOTTE TILBURY", "NARS", "MAC", "HUDA BEAUTY", "ANASTASIA", "TOO FACED"].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-heading font-extrabold tracking-tighter text-burgundy grayscale hover:grayscale-0 transition-all cursor-default">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Style */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={southIndian1} alt="Signature Style" className="w-full" />
                <div className="absolute inset-0 bg-burgundy/5" />
              </div>
            </motion.div>
            <div className="space-y-10">
              <div>
                <p className="font-subheading text-lg text-gold tracking-widest uppercase mb-4">The Artistic Touch</p>
                <h2 className="text-4xl md:text-5xl font-bold text-burgundy italic leading-tight">Why Soniya is Trusted by Hundreds of Brides</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: Heart, t: "Soft Glam Base", d: "Breathable, natural perfection." },
                  { icon: Shield, t: "Hygiene Protocol", d: "Sanitized kit and tools." },
                  { icon: Clock, t: "Timeline Focus", d: "Punctual and efficient styling." },
                  { icon: Sparkles, t: "Unique Design", d: "Tailored to your personality." },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <item.icon className="text-gold" size={32} />
                    <h4 className="text-lg font-bold text-burgundy">{item.t}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs border-b-2 border-gold pb-1 hover:text-gold transition-colors">
                Meet the Artist <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Promo - UPGRADED */}
      <section className="py-20 md:py-32 bg-nude-light/50">
        <div className="max-w-7xl mx-auto px-4 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gold/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-10 md:p-20 order-last lg:order-first">
              <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-6">
                <GraduationCap size={20} /> Professional Training
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-burgundy mb-8 italic">Join Our Makeup Academy</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-body">
                Kickstart your career as a professional bridal makeup artist. Our 30-day intensive course covers everything from basic fundamentals to advanced business strategies.
              </p>

              <div className="flex items-center gap-6 mb-12">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{ACADEMY_DETAILS.duration}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Course Time</p>
                </div>
                <div className="w-px h-10 bg-gold/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{ACADEMY_DETAILS.fees}</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Enrollment Fee</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/courses" className="px-10 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl shadow-lg hover:shadow-2xl transition-all text-center">
                  View Course Details
                </Link>
                <div className="flex items-center gap-2 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-red-500">Limited Seats Available</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-auto lg:h-full">
              <img src={heroBride2} alt="Academy training" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-burgundy/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Recent Bridal Work" subtitle="A curation of our latest bridal transformations and traditional designs." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {loadingGallery ? (
              Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />)
            ) : (
              galleryImages.map((img, i) => (
                <motion.div
                  key={img.id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl overflow-hidden aspect-[3/4] relative group shadow-lg"
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white font-bold">{img.label}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/portfolio" className="px-8 py-3 rounded-full border border-gold text-gold font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-white transition-all">
              Explore Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-blush-pink/30 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading title="The Bride's Voice" subtitle="What our real brides have to say about their special day makeover." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingTestimonials ? (
              <p>Loading love...</p>
            ) : (
              testimonials.map((t, i) => (
                <motion.div
                  key={t.id || i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-3xl shadow-lg border border-gold/5"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} className="fill-gold text-gold" />)}
                  </div>
                  <p className="text-muted-foreground font-body italic text-lg leading-relaxed mb-8">"{t.review_text}"</p>
                  <p className="font-bold text-burgundy uppercase tracking-widest text-xs">— {t.client_name}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Urgency Final CTA */}
      <section className="py-24 gradient-primary text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -ml-32 -mt-32 blur-3xl animate-pulse" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">Your Dream Bridal Look is Just One Step Away</h2>
          <p className="text-white/70 text-xl font-subheading mb-12 max-w-2xl mx-auto">
            Secure your preferred wedding date and batch slot. Professional consultation included with every booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact" className="px-12 py-5 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-2xl transition-all scale-110">
              Check Availability Now
            </Link>
            <a href={`tel:${CONTACT_INFO.soniya}`} className="px-12 py-5 border-2 border-white/20 text-white font-bold tracking-widest uppercase text-xs rounded-xl hover:bg-white/10 transition-all">
              Call {CONTACT_INFO.soniya}
            </a>
          </div>
          <p className="mt-12 text-gold-light font-bold text-xs uppercase tracking-[0.5em] animate-pulse">
            ✨ Limited Dates Available ✨
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
