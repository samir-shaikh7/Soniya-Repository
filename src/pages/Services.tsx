
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Check, Play, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { BRIDAL_PRICING, INCLUSIONS, CONTACT_INFO } from "@/data/bridalData";
import bridalImg from "@/assets/8.webp";
import partyImg from "@/assets/about-artist.jpg";
import southIndianImg from "@/assets/12.webp";

const Services = () => {
  return (
    <Layout>
      <SEO
        title="Bridal & Beauty Services | Soniya Patange"
        description="Premium bridal makeup, engagement styling, and party makeover services by Soniya Patange. Comprehensive beauty expertise for your special day."
      />

      {/* Header */}
      <section className="relative py-24 md:py-32 gradient-primary">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4 text-shadow-elegant">Luxury Artistry</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Bridal & Beauty Services</h1>
            <p className="font-subheading text-xl text-primary-foreground/70">
              Transforming your vision into a stunning reality with expert hand-crafted makeup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 space-y-32">

          {/* HD Makeup Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={bridalImg} alt="HD Bridal Makeup" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-burgundy/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-subheading text-lg text-gold tracking-widest uppercase mb-3 text-shadow-sm">Natural Perfection</p>
              <h2 className="text-4xl font-bold mb-6 text-burgundy">{BRIDAL_PRICING.hd.title}</h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                {BRIDAL_PRICING.hd.description} Perfect for brides who want a classic, elegant finish that looks flawless both in person and on camera.
              </p>

              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-6 italic">
                Pricing varies based on event type and requirements
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full">
                <Link
                  to="/contact?service=Bridal Makeup"
                  className="flex-1 px-8 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Check Availability <MessageCircle size={16} />
                </Link>
                <Link
                  to="/bridal-pricing"
                  className="flex-1 px-8 py-4 border-2 border-primary text-primary font-bold tracking-widest uppercase text-xs rounded-xl hover:bg-primary hover:text-white transition-all text-center flex items-center justify-center"
                >
                  View Full Pricing
                </Link>
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">Premium Brands Used:</p>
                <div className="flex flex-wrap gap-3">
                  {BRIDAL_PRICING.hd.products?.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold transition-transform group-hover:scale-150" />
                      <span className="text-sm font-semibold text-foreground/80">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Luxury / Airbrush Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-last relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={southIndianImg} alt="Luxury Airbrush Makeup" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gold/5" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-[10px] font-bold uppercase tracking-widest border border-gold/20 mb-6">
                ✨ Most Requested
              </div>
              <h2 className="text-4xl font-bold mb-6 text-burgundy">{BRIDAL_PRICING.luxury.title}</h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                {BRIDAL_PRICING.luxury.description} Ideal for long wedding days, our airbrush technique ensures your makeup remains smudge-proof and radiant for up to 18 hours.
              </p>

              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-6 italic">
                Pricing varies based on event type and requirements
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full">
                <Link
                  to="/contact?service=Luxury Airbrush Makeup"
                  className="flex-1 px-8 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Check Availability <MessageCircle size={16} />
                </Link>
                <Link
                  to="/bridal-pricing"
                  className="flex-1 px-8 py-4 border-2 border-gold text-gold font-bold tracking-widest uppercase text-xs rounded-xl hover:bg-gold hover:text-white transition-all text-center flex items-center justify-center"
                >
                  View Full Pricing
                </Link>
              </div>

              <div className="space-y-4 mb-10">
                <p className="text-xs font-bold uppercase tracking-widest text-gold text-right lg:text-left">Luxury Brands Used:</p>
                <div className="flex flex-wrap gap-3">
                  {BRIDAL_PRICING.luxury.products?.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 group bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gold/5">
                      <Sparkles size={12} className="text-gold" />
                      <span className="text-sm font-semibold text-foreground/80">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>

          {/* Sider Makeup Section */}
          <div className="max-w-4xl mx-auto py-16 px-8 rounded-3xl bg-blush-pink border border-gold/10 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-3xl font-bold mb-4 text-burgundy">{BRIDAL_PRICING.sider.title}</h3>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                Beautifully crafted looks for bridesmaids, family members, and guests to ensure everyone looks their best.
              </p>

              <p className="text-xs font-bold text-gold uppercase tracking-widest mb-10 italic">
                Pricing varies based on event type and requirements
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-lg mx-auto">
                <Link
                  to="/contact?service=Bridal Makeup"
                  className="flex-1 px-8 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Check Availability <MessageCircle size={16} />
                </Link>
                <Link
                  to="/bridal-pricing"
                  className="flex-1 px-8 py-4 border-2 border-burgundy text-burgundy font-bold tracking-widest uppercase text-xs rounded-xl hover:bg-burgundy hover:text-white transition-all text-center flex items-center justify-center"
                >
                  View Full Pricing
                </Link>
              </div>

              <div className="py-6 px-8 bg-white/50 rounded-2xl inline-block border border-gold/20">
                <p className="text-sm font-bold text-burgundy italic">
                  💎 {INCLUSIONS}
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-burgundy">Ready for Your Transformation?</h2>
          <p className="text-lg text-muted-foreground mb-12 font-body italic">
            "A bride's beauty is in her confidence, and her confidence is my responsibility."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <Link
              to="/contact?service=Bridal Makeup"
              className="px-10 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-sm rounded-xl hover:shadow-xl transition-all shadow-md flex-1 flex items-center justify-center gap-2 border-none"
            >
              Check Availability <MessageCircle size={20} />
            </Link>
            <Link
              to="/bridal-pricing"
              className="px-10 py-4 border-2 border-primary text-primary font-bold tracking-widest uppercase text-sm rounded-xl hover:bg-primary hover:text-white transition-all shadow-md flex-1 text-center"
            >
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
