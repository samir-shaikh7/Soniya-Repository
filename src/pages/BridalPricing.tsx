
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Star, ArrowRight, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { BRIDAL_PRICING, BOOKING_POLICY, CONTACT_INFO } from "@/data/bridalData";

const BridalPricing = () => {

  return (
    <Layout>
      <SEO
        title="Bridal Makeup Pricing & Packages"
        description="Premium bridal makeup pricing by Soniya Patange. Choose between HD and Luxury Airbrush packages tailored for your dream wedding look in Sangli."
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 gradient-primary">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4">Luxury Experience</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">Bridal Pricing</h1>
            <p className="font-subheading text-xl text-primary-foreground/70">
              Transparent pricing for world-class bridal transformations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* HD Makeup Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-border flex flex-col group hover:shadow-2xl transition-all duration-500"
            >
              <div className="p-8 md:p-10 flex-1">
                <h3 className="text-3xl font-bold mb-4 text-burgundy">{BRIDAL_PRICING.hd.title}</h3>
                <p className="text-muted-foreground mb-8 font-body leading-relaxed h-14">
                  {BRIDAL_PRICING.hd.description}
                </p>

                <div className="space-y-4 mb-10">
                  {BRIDAL_PRICING.hd.services.map((svc, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-nude/30 last:border-0">
                      <span className="font-body font-semibold text-foreground">{svc.name}</span>
                      <span className="text-xl font-bold text-primary">{svc.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Premium Products Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {BRIDAL_PRICING.hd.products?.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-nude-light text-[10px] font-bold uppercase tracking-wider rounded-full text-muted-foreground group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link
                  to="/contact?service=Bridal Makeup"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase font-bold rounded-lg hover:bg-burgundy transition-all"
                >
                  Book Your Slot <MessageCircle size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Luxury Airbrush Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gold flex flex-col group scale-105 z-10"
            >
              <div className="absolute top-0 left-0 right-0 gradient-gold text-center py-2">
                <p className="text-xs font-bold tracking-widest uppercase text-foreground flex items-center justify-center gap-1">
                  <Star size={12} className="fill-foreground" /> Most Popular Choice
                </p>
              </div>

              <div className="p-8 md:p-10 pt-12 flex-1">
                <h3 className="text-3xl font-bold mb-4 text-burgundy">{BRIDAL_PRICING.luxury.title}</h3>
                <p className="text-muted-foreground mb-8 font-body leading-relaxed h-14">
                  {BRIDAL_PRICING.luxury.description}
                </p>

                <div className="space-y-4 mb-10">
                  {BRIDAL_PRICING.luxury.services.map((svc, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-nude/30 last:border-0">
                      <span className="font-body font-semibold text-foreground">{svc.name}</span>
                      <span className="text-xl font-bold text-primary">{svc.price}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Luxury Products Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {BRIDAL_PRICING.luxury.products?.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-gold/10 text-[10px] font-bold uppercase tracking-wider rounded-full text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link
                  to="/contact?service=Luxury Airbrush Makeup"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 gradient-gold text-foreground font-body text-sm tracking-widest uppercase font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  Book Luxury Session <MessageCircle size={18} />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Sider Makeup Section (Minimalist) */}
          <div className="max-w-4xl mx-auto mt-24 mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-burgundy mb-2">{BRIDAL_PRICING.sider.title}</h3>
              <p className="text-muted-foreground font-body italic">Perfect for family members & guests</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              {BRIDAL_PRICING.sider.services.map((svc, i) => (
                <div key={i} className="flex flex-col items-center p-6 border-b-2 border-gold/10 md:border-b-0 md:border-r-2 md:last:border-r-0 border-gold/10 px-12 transition-all hover:scale-105">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{svc.name} Makeup</span>
                  <span className="text-3xl font-bold text-primary">{svc.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-20 p-8 rounded-2xl border border-gold/20 bg-blush-pink">
            <h4 className="text-2xl font-bold mb-6 text-burgundy border-b border-gold/20 pb-4">Booking Policy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {BOOKING_POLICY.map((policy, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="text-gold" />
                  </div>
                  <p className="text-sm text-foreground/80 font-body italic leading-relaxed">{policy}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm font-bold text-burgundy italic">
              "Every bridal session includes: High-end Skin Prep, Full Makeup, Hairstyling, Saree/Dupatta Draping, and Jewellery Setting."
            </p>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 md:py-24 gradient-primary text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-3">Don't Wait</p>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Limited Dates Available
            </h2>
            <p className="font-subheading text-lg text-primary-foreground/70 mb-10">
              We are currently accepting bookings for the 2026 wedding season. Secure your date before someone else does!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact?service=Bridal Makeup"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 gradient-gold text-foreground font-body text-sm tracking-widest uppercase font-bold rounded-lg hover:shadow-xl transition-all"
              >
                Book Your Slot <MessageCircle size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-gold-light text-primary-foreground font-body text-sm tracking-widest uppercase font-bold rounded-lg hover:bg-gold/10 transition-all"
              >
                WhatsApp Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BridalPricing;
