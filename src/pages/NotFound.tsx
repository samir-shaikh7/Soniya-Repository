import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[70vh] items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-heading text-primary font-bold">404</h1>
          <p className="mb-8 font-body text-xl text-muted-foreground">Oops! The page you're looking for cannot be found.</p>
          <a href="/" className="px-6 py-3 bg-primary text-primary-foreground font-body text-sm tracking-widest uppercase rounded hover:opacity-90 transition-opacity">
            Return to Home
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
