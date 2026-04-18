import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Award, Users, Palette, ArrowRight } from "lucide-react";
import aboutImg from "@/assets/Owner.webp";
import heroBride2 from "@/assets/hero-bride-2.jpg";

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-24 md:py-32 gradient-primary">
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-subheading text-lg text-gold-light tracking-widest uppercase mb-4">The Artist</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Meet Soniya Patange
          </h1>
          <p className="font-subheading text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            A passionate bridal makeup artist dedicated to making every bride feel like the most beautiful version of herself.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <img src={aboutImg} alt="Soniya Patange at work" loading="lazy" width={800} height={1000} className="rounded-lg shadow-xl w-full" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">My Journey in Bridal Beauty</h2>
          <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
            <p>
              Growing up in Maharashtra, I was always fascinated by the beautiful transformation of a bride on her wedding day. The traditional nauvari saree, the sacred mundavalya, the radiant glow — it was pure magic.
            </p>
            <p>
              That childhood fascination turned into my life's passion. After years of training in professional makeup artistry, I specialised in traditional bridal looks — particularly Maharashtrian and South Indian bridal styles that honour our rich cultural heritage.
            </p>
            <p>
              Every bride who sits in my chair becomes my priority. I listen to her vision, understand her personality, and create a look that makes her feel confident, beautiful, and truly herself. I use only premium products that ensure long-lasting, flawless results.
            </p>
            <p>
              Having worked with over 100 brides, each wedding has taught me something new. But one thing remains constant — the joy of seeing a bride smile when she sees her reflection for the first time.
            </p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity">
            Let's Create Your Look <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-cream">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { icon: Users, value: "100+", label: "Happy Brides" },
          { icon: Award, value: "5+", label: "Years Experience" },
          { icon: Heart, value: "100%", label: "Satisfaction" },
          { icon: Palette, value: "4+", label: "Specialised Styles" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <s.icon size={28} className="text-gold mx-auto mb-2" />
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground tracking-wider uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
