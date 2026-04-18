
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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full shadow-2xl text-primary-foreground font-body transition-all hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
      style={{ backgroundColor: "#25D366" }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <MessageCircle size={24} />
    </motion.a>
  );
};

export default WhatsAppButton;
