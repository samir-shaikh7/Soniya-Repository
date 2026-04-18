import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Star, GraduationCap, MapPin, Calendar, Clock, Phone, Sparkles, Heart, Award, Target, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { ACADEMY_DETAILS, CONTACT_INFO } from "@/data/bridalData";
import academyHeroImg from "@/assets/15.jpg";

const Courses = () => {

  return (
    <Layout>
      <SEO
        title="Professional Makeup Academy | 30-Day Intensive Course"
        description="Join Soniya Patange's Makeup Academy in Sangli. 30-day professional bridal makeup course. Learn hairstyles, saree draping, and marketing."
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 gradient-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={academyHeroImg} alt="Academy background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-subheading text-lg md:text-xl text-gold-light tracking-widest uppercase mb-4 flex items-center justify-center lg:justify-start gap-2">
                <GraduationCap size={20} /> Join Our Academy
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
                Master the Art of <span className="text-gold-light">Bridal Makeup</span>
              </h1>
              <p className="font-subheading text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Turn your passion into a professional career with our 30-day intensive training program in Sangli.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <Star size={16} className="text-gold-light fill-gold-light" />
                  <span className="text-primary-foreground text-sm font-bold uppercase tracking-wider">Certified Program</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                  <Sparkles size={16} className="text-gold-light" />
                  <span className="text-primary-foreground text-sm font-bold uppercase tracking-wider">Hands-on Practice</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-full border-2 border-gold/30 p-4 animate-pulse-slow">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gold bg-cream shadow-2xl">
                  <img src={academyHeroImg} alt="Academy Professional training" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Stats / Details Bar */}
      <section className="py-10 bg-white border-y border-border shadow-md relative z-20 -mt-10 max-w-4xl mx-auto rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-12">
          {[
            { icon: Clock, label: "Duration", value: ACADEMY_DETAILS.duration },
            { icon: Clock, label: "Time", value: ACADEMY_DETAILS.timing },
            { icon: MapPin, label: "Location", value: ACADEMY_DETAILS.location },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center md:items-start group transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-2">
                <item.icon size={18} className="text-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{item.label}</span>
              </div>
              <p className="text-sm md:text-base font-bold text-burgundy">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Course Info */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Content - Curriculum */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-bold mb-8 text-burgundy flex items-center gap-3">
                  <Award size={32} className="text-gold" /> What You Will Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ACADEMY_DETAILS.curriculum.map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gold/5 group hover:border-gold/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-nude flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Check size={16} className="text-primary" />
                      </div>
                      <p className="text-foreground/80 font-semibold font-body">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl font-bold mb-8 text-burgundy flex items-center gap-3">
                  <Target size={32} className="text-gold" /> Exclusive Benefits
                </h2>
                <div className="space-y-4">
                  {ACADEMY_DETAILS.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-blush-pink/50 border border-gold/10">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Heart size={20} className="text-primary" />
                      </div>
                      <p className="text-lg font-body font-semibold text-burgundy">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Content - Pricing & Contact */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-gold relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full -mr-12 -mt-12" />

                <p className="text-sm font-bold uppercase tracking-widest text-gold mb-2">Complete Course Fees</p>
                <h3 className="text-3xl md:text-4xl font-bold text-burgundy mb-6 leading-tight">{ACADEMY_DETAILS.fees}</h3>
                <div className="inline-block px-4 py-1 rounded-full bg-burgundy/5 text-burgundy text-xs font-bold uppercase tracking-widest border border-burgundy/10 mb-8">
                  🔥 Limited Seats Available
                </div>

                <div className="space-y-4 mb-10 pt-6 border-t border-border">
                  <p className="flex items-center gap-3 text-sm font-body">
                    <Target size={18} className="text-gold" /> <span>Practical Focus: 100% Guaranteed</span>
                  </p>
                </div>

                <Link
                  to="/contact?service=Makeup Course (Academy)"
                  className="w-full flex items-center justify-center gap-2 py-4 gradient-gold text-foreground font-bold tracking-widest uppercase text-xs rounded-xl hover:shadow-xl transition-all"
                >
                  Enquire Now on WhatsApp <MessageCircle size={18} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-burgundy p-8 rounded-3xl text-primary-foreground shadow-xl"
              >
                <h4 className="text-xl font-bold mb-6 text-gold-light border-b border-white/10 pb-4">Need Help Booking?</h4>
                <div className="space-y-6">
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Phone size={18} className="text-gold-light" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Soniya Patange</p>
                      <p className="text-lg font-semibold">{CONTACT_INFO.soniya}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Phone size={18} className="text-gold-light" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Mayur Patange</p>
                      <p className="text-lg font-semibold">{CONTACT_INFO.mayur}</p>
                    </div>
                  </div>
                </div>
                <p className="mt-8 text-xs italic opacity-70">
                  "Call directly for early-bird discounts and group bookings."
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-20">
          {[
            { icon: Award, label: "Certified Expert" },
            { icon: Sparkles, label: "Live Practice" },
            { icon: Heart, label: "Career Guidance" },
            { icon: GraduationCap, label: "Batch Limitation" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-nude flex items-center justify-center shadow-sm">
                <item.icon size={28} className="text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  );
};

export default Courses;
