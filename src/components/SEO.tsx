import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}

const SEO = ({
  title,
  description = "Professional Bridal Makeup Artist in Sangli. Specializing in traditional Maharashtrian, South Indian, and modern bridal looks.",
  ogTitle,
  ogDescription,
  ogType = "website"
}: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | Soniya Patange`;
    document.title = fullTitle;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Open Graph Title
    let ogT = document.querySelector('meta[property="og:title"]');
    if (!ogT) {
      ogT = document.createElement('meta');
      ogT.setAttribute('property', 'og:title');
      document.head.appendChild(ogT);
    }
    ogT.setAttribute('content', ogTitle || fullTitle);

    // Open Graph Description
    let ogD = document.querySelector('meta[property="og:description"]');
    if (!ogD) {
      ogD = document.createElement('meta');
      ogD.setAttribute('property', 'og:description');
      document.head.appendChild(ogD);
    }
    ogD.setAttribute('content', ogDescription || description);

    // Open Graph Type
    let ogTy = document.querySelector('meta[property="og:type"]');
    if (!ogTy) {
      ogTy = document.createElement('meta');
      ogTy.setAttribute('property', 'og:type');
      document.head.appendChild(ogTy);
    }
    ogTy.setAttribute('content', ogType);

  }, [title, description, ogTitle, ogDescription, ogType]);

  return null;
};

export default SEO;
