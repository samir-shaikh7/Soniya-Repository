/**
 * Centralized utility for creating WhatsApp links with proper encoding and phone cleaning.
 */
export const createWhatsAppLink = (phone: string, message: string): string => {
  // Clean phone number: remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");
  
  // Ensure the phone includes the country code if it's not present
  // For this project, we assume +91 (India) if it's a 10-digit number
  const finalPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  // Create encoded URL
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Opens a WhatsApp link in a new tab.
 */
export const openWhatsApp = (phone: string, message: string): void => {
  const link = createWhatsAppLink(phone, message);
  window.open(link, "_blank", "noopener,noreferrer");
};
