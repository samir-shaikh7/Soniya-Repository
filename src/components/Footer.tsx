import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/InstagramIcon";
import { useSettings } from "@/hooks/useSettings";
import { CONTACT_INFO } from "@/data/bridalData";

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gold">{settings?.business_name || "Soniya Patange"}</h3>
            <p className="font-subheading text-lg text-primary-foreground/70">
              Premium Bridal Makeup Artist — Specialist in Traditional & Soft Glam Looks
            </p>
          </div>
          <div>
            <h4 className="font-subheading text-xl font-semibold mb-4 text-gold-light">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Bridal Pricing", path: "/bridal-pricing" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <Link key={link.name} to={link.path} className="block text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-subheading text-xl font-semibold mb-4 text-gold-light">Services</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <p>Bridal Makeup</p>
              <p>Engagement Makeup</p>
              <p>Party Makeup</p>
              <p>Hairstyling & Draping</p>
            </div>
          </div>
          <div>
            <h4 className="font-subheading text-xl font-semibold mb-4 text-gold-light">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <a href={`tel:+91${CONTACT_INFO.soniya}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone size={16} /> +91 {CONTACT_INFO.soniya}
              </a>

              <a
                href={settings?.instagram_link || "https://www.instagram.com/makeup_by_soniyapatange/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Instagram size={16} /> {settings?.instagram_link ? '@' + settings.instagram_link.split('.com/')[1]?.replace('/', '') : '@makeup_by_soniyapatange'}
              </a>
              <a href={`https://www.google.com/maps?q=${encodeURIComponent(settings?.location || 'Sangli, Maharashtra')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <MapPin size={16} /> {settings?.location || 'Sangli, Maharashtra'}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} {settings?.business_name || "Soniya Patange"} — Premium Bridal Makeup Artist. All rights reserved.
        </div>
        <div className="mt-4 pt-4 text-center text-sm opacity-90 font-semibold mb-4 flex justify-center items-center gap-2">
          <a href="https://instagram.com/sam.digitalagency"
            target="_blank">
            <span>Design & Developed By:</span>
          </a>
          <a
            href="https://instagram.com/sam.digitalagency"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-pink-500 hover:underline"
          >
            Sam Digital Agency
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
