import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Bridal Pricing", path: "/bridal-pricing" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Academy", path: "/courses" },
  { name: "Reviews", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-gold/20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px] md:h-[80px]">
          <Link to="/" className="font-heading text-xl md:text-2xl font-bold text-primary tracking-wide lg:mr-4 xl:mr-8 border-none outline-none ring-0 shrink-0 min-w-0">
            {settings?.business_name || "Soniya Patange"}
          </Link>

          <div className="hidden xl:flex items-center gap-3 xl:gap-5 2xl:gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-[10px] xl:text-xs 2xl:text-sm tracking-wider xl:tracking-widest uppercase transition-colors duration-300 whitespace-nowrap ${location.pathname === link.path
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2 bg-primary text-primary-foreground font-body text-[10px] xl:text-xs 2xl:text-sm tracking-wider uppercase rounded hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Book Your Slot
            </Link>
          </div>

          <button
            className="xl:hidden text-foreground ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-background border-t border-gold/20"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-body text-sm tracking-widest uppercase py-2 ${location.pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase rounded"
              >
                Book Your Slot
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
