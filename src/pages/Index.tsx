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
import hdMakeup from "@/assets/8.webp";
import luxuryMakeup from "@/assets/12.webp";

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
      <section className="relative min-h-[75vh] md:min-h-screen flex items-center bg-cream/50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src={heroBride}
            alt="Premium Bridal Makeup"
            className="w-full h-full object-cover animate-slow-zoom"
            loading="eager"
          />
          {/* Advanced Luxury Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-3xl animate-float"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-6 py-2 rounded-full bg-white/10 text-gold-light text-[10px] font-bold uppercase tracking-[0.3em] border border-white/20 mb-8 backdrop-blur-xl shadow-2xl"
            >
              <Sparkles size={12} className="inline-block mr-2 animate-pulse" />
              Premium Artistry by Soniya Patange
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 tracking-tighter">
              Elegance <span className="text-gold-light italic font-subheading drop-shadow-2xl">Redefined.</span>
            </h1>
            
            <p className="font-subheading text-lg md:text-2xl text-white/90 mb-10 leading-relaxed max-w-xl text-shadow-elegant font-light">
              Crafting <span className="text-gold-light font-bold">timeless</span> bridal transformations with a luxury touch for your most precious moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link
                to="/contact?service=Bridal Makeup"
                className="group relative px-12 py-5 overflow-hidden rounded-2xl bg-gold text-foreground font-bold tracking-[0.2em] uppercase text-xs transition-all hover:scale-105 active:scale-95 animate-shimmer"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Check Availability <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/bridal-pricing"
                className="group px-12 py-5 rounded-2xl bg-white/5 text-white font-bold tracking-[0.2em] uppercase text-xs border border-white/30 hover:bg-white/10 hover:border-white transition-all backdrop-blur-md flex items-center justify-center gap-2"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Glass Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
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

      {/* Trust Highlights Bar */}
      <section className="bg-burgundy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-30" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Award className="text-gold-light w-10 h-10 stroke-[1.2]" />
              <p className="font-subheading text-white text-xl md:text-2xl italic tracking-wide">
                Trusted by 100+ Brides
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Star className="text-gold-light w-10 h-10 stroke-[1.2]" />
              <p className="font-subheading text-white text-xl md:text-2xl italic tracking-wide max-w-[250px]">
                Professional Bridal Makeup Artist
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <Heart className="text-gold-light w-10 h-10 stroke-[1.2]" />
              <p className="font-subheading text-white text-xl md:text-2xl italic tracking-wide max-w-[250px]">
                Specialist in Traditional Bridal Looks
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 px-4">
            <p className="font-subheading text-lg text-gold tracking-widest uppercase mb-4">Our Expertise</p>
            <h2 className="text-4xl md:text-5xl font-bold text-burgundy italic">Exquisite Artistry Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
            {/* HD Makeup Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gold/10 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={hdMakeup} 
                  alt="HD Bridal Makeup" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-burgundy mb-4">{BRIDAL_PRICING.hd.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed mb-8 h-18 line-clamp-2">
                  {BRIDAL_PRICING.hd.description} Perfect for classic, elegant looks.
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px] group/link"
                >
                  Learn More <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Luxury Makeup Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gold/10 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={luxuryMakeup} 
                  alt="Luxury Airbrush Makeup" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-10">
                <h3 className="text-3xl font-bold text-burgundy mb-4">{BRIDAL_PRICING.luxury.title}</h3>
                <p className="text-muted-foreground font-body leading-relaxed mb-8 h-18 line-clamp-2">
                  {BRIDAL_PRICING.luxury.description} Waterproof, 18-hour long-lasting finish.
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[11px] group/link"
                >
                  Learn More <ChevronRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
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
