import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Warn if the user hasn't configured Supabase properly
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      toast({
        title: "Configuration Error",
        description: "Supabase credentials are not set in .env. Please connect to Supabase first.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome Administrator",
        description: "You have signed in to the admin panel.",
      });
      navigate("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-background rounded-lg shadow-xl overflow-hidden border border-border"
      >
        <div className="p-8 text-center bg-primary text-primary-foreground">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Portal</h1>
          <p className="text-primary-foreground/70 text-sm font-subheading">Secure Login</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-border rounded focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
              placeholder="admin@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-border rounded focus:ring-2 focus:ring-primary focus:outline-none bg-background text-foreground"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-primary font-bold uppercase tracking-widest py-4 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
