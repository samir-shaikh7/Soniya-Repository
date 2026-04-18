
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_INFO, WHATSAPP_TEMPLATES } from "@/data/bridalData";
import { createWhatsAppLink } from "@/utils/whatsapp";

const WhatsAppButton = () => {
  const whatsappUrl = createWhatsAppLink(CONTACT_INFO.soniya, WHATSAPP_TEMPLATES.bridal);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl text-primary-foreground font-body text-sm font-semibold tracking-wide"
      style={{ backgroundColor: "#25D366" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">Check Availability</span>
    </motion.a>
  );
};

export default WhatsAppButton;
