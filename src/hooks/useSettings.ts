import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BusinessSettings {
  business_name: string;
  whatsapp_number: string;
  instagram_link: string;
  contact_email: string;
  location: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("settings").select("*").single();
      if (!error && data) {
        setSettings(data as BusinessSettings);
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
