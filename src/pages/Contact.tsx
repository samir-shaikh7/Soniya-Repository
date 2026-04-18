import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/InstagramIcon";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { CONTACT_INFO, WHATSAPP_TEMPLATES } from "@/data/bridalData";
import { createWhatsAppLink } from "@/utils/whatsapp";

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    service: preSelectedService || "",
    eventType: "",
    message: ""
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [waLink, setWaLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.phone || !form.service) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill all required fields"
      });
      return;
    }

    setIsRedirecting(true);

    const formattedMessage = `Hi ma’am, I want to book makeup 💍

Name: ${form.name}
Phone: ${form.phone}
Service: ${form.service}
Event Type: ${form.eventType || 'N/A'}
Date: ${form.date}
Location: ${form.location}

Please share availability and details.`.trim();

    const link = createWhatsAppLink(CONTACT_INFO.soniya, formattedMessage);
    setWaLink(link);

    toast({
      title: "Checking Availability...",
      description: "Opening WhatsApp to send your enquiry."
    });

    setTimeout(() => {
      window.open(link, "_blank", "noopener,noreferrer");
      setIsRedirecting(false);
    }, 800);
  };

  return (
    <Layout>
      <SEO
        title="Contact Soniya Patange | Book Your Bridal Slot"
        description="Premium bridal makeup artist in Sangli. Contact Soniya Patange or Mayur Patange for bookings, enquiries, and academy details. Call 8624051090."
      />

      <section className="relative py-24 md:py-32 gradient-primary">
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4">Connect With Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-shadow-elegant">Book Your Bridal Slot</h1>
            <p className="font-subheading text-xl text-primary-foreground/70">
              Limited dates available for 2026. Reach out now to secure your transformation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 text-left">

          {/* Form Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gold/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-16 -mt-16" />

              <div className="mb-10">
                <h2 className="text-3xl font-bold text-burgundy mb-2">Check Availability for Your Date 💍</h2>
                <p className="text-muted-foreground italic font-body">Fill your details and get a quick response on WhatsApp</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Service Required *</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base cursor-pointer hover:bg-white"
                    >
                      <option value="" disabled>Select Service</option>
                      <option>Bridal Makeup</option>
                      <option>Engagement / Sangeet</option>
                      <option>Reception Makeup</option>
                      <option>Mehendi / Haldi</option>
                      <option>Luxury / Airbrush Makeup</option>
                      <option>Sider Makeup</option>
                      <option>Makeup Course (Academy)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Event Type</label>
                    <select
                      value={form.eventType}
                      onChange={(e) => setForm((p) => ({ ...p, eventType: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base cursor-pointer hover:bg-white"
                    >
                      <option value="" disabled>Select Type</option>
                      <option>Wedding</option>
                      <option>Engagement</option>
                      <option>Reception</option>
                      <option>Haldi / Mehendi</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Event Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Location / City</label>
                    <input
                      type="text"
                      placeholder="Enter venue or city"
                      value={form.location}
                      onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-gold">Special Requirements (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your preferences..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-nude-light/20 focus:border-gold focus:ring-4 focus:ring-gold/5 outline-none transition-all duration-300 font-body text-base resize-none"
                  />
                </div>

                <div className="pt-6 text-center space-y-4">
                  <p className="text-[11px] font-bold text-muted-foreground tracking-widest uppercase mb-1">
                    ✨ We respond within 5–10 minutes on WhatsApp
                  </p>

                  <button
                    type="submit"
                    disabled={isRedirecting}
                    className={`w-full py-5 gradient-gold text-foreground font-bold tracking-[0.15em] uppercase text-sm rounded-2xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${isRedirecting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    {isRedirecting ? (
                      <span className="flex items-center gap-2">Opening WhatsApp... <CheckCircle className="animate-spin" size={18} /></span>
                    ) : (
                      <>
                        <MessageCircle size={20} className="group-hover:scale-125 transition-transform" /> Send on WhatsApp
                      </>
                    )}
                  </button>

                  {waLink && !isRedirecting && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-bold text-xs underline underline-offset-4 hover:text-gold transition-colors"
                      >
                        WhatsApp didn't open? Click here to send manually
                      </a>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Details Side */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-8 text-burgundy">Reach Us Directly</h2>

            <div className="space-y-6 mb-12">
              <a href={`tel:${CONTACT_INFO.soniya}`} className="flex items-center gap-5 p-5 rounded-3xl hover:bg-white transition-all group bg-white/50 border border-transparent hover:border-gold/20">
                <div className="w-16 h-16 rounded-2xl bg-burgundy flex items-center justify-center shadow-lg group-hover:bg-gold transition-all duration-500 group-hover:rotate-6">
                  <Phone size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Soniya Patange</p>
                  <p className="text-2xl font-bold text-burgundy">{CONTACT_INFO.soniya}</p>
                </div>
              </a>

              <a href={`tel:${CONTACT_INFO.mayur}`} className="flex items-center gap-5 p-5 rounded-3xl hover:bg-white transition-all group bg-white/50 border border-transparent hover:border-gold/20">
                <div className="w-16 h-16 rounded-2xl bg-burgundy flex items-center justify-center shadow-lg group-hover:bg-gold transition-all duration-500 group-hover:rotate-6">
                  <Phone size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Mayur Patange</p>
                  <p className="text-2xl font-bold text-burgundy">{CONTACT_INFO.mayur}</p>
                </div>
              </a>

              <a href={`https://wa.me/+91${CONTACT_INFO.soniya}`} target="_blank" className="flex items-center gap-5 p-5 rounded-3xl hover:bg-white transition-all group bg-white/50 border border-transparent hover:border-gold/20">
                <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg group-hover:bg-green-600 transition-all duration-500 group-hover:rotate-6">
                  <MessageCircle size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Direct Chat</p>
                  <p className="text-2xl font-bold text-green-600">WhatsApp Now</p>
                </div>
              </a>

              <div className="flex items-start gap-5 p-5 rounded-3xl bg-white/50 border border-gold/10 lg:sticky lg:top-24">
                <div className="w-16 h-16 rounded-2xl bg-nude flex items-center justify-center shadow-sm">
                  <MapPin size={28} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">Our Location</p>
                  <p className="text-xl font-bold text-burgundy">Sangli, Maharashtra</p>
                  <p className="text-sm text-muted-foreground mt-2 font-body italic">Available for travel globally for destination weddings.</p>
                </div>
              </div>
            </div>

            <div className="bg-burgundy p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                <CheckCircle size={100} className="text-gold-light" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gold-light uppercase tracking-widest">Bridal Fast-Track</h3>
              <p className="text-white/80 leading-relaxed font-body italic text-lg">
                "For immediate response, mention your wedding date and location. We prioritize bridal session enquiries and typically respond within minutes."
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy italic">Our Studio Location – Sangli 📍</h2>
        </div>
        <div className="h-[450px] w-full border-t border-gold/10 grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.599684343118!2d74.56416177533812!3d16.841124298260173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1190041aaf957%3A0x976cb9acf3a1d82a!2sAkashwani%20(A.I.R)!5e0!3m2!1sen!2sin!4v1715694242699!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
