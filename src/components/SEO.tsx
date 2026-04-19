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
  description = "Best makeup artist in Sangli offering bridal, engagement, HD & airbrush makeup services.",
  ogTitle,
  ogDescription,
  ogType = "website"
}: SEOProps) => {

  useEffect(() => {
    const fullTitle = `${title} | Best Makeup Artist in Sangli`;

    // ✅ Title
    document.title = fullTitle;

    // ✅ Helper function (clean code)
    const setMetaTag = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // ✅ Basic SEO
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords",
      "best makeup artist in sangli, bridal makeup artist sangli, hd makeup sangli, airbrush makeup sangli, maharashtrian bridal makeup, soniya patange, soniya patange makeups, soniya patange makeup artist, soniya patange makeup artist in sangli, sangli makeup artists, sangli makeup artist");

    // ✅ Open Graph
    setMetaTag("property", "og:title", ogTitle || fullTitle);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", "https://soniyapatangemakeups.in/");

    // ✅ Twitter
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", ogTitle || fullTitle);
    setMetaTag("name", "twitter:description", ogDescription || description);

    // ✅ Canonical
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", "https://soniyapatangemakeups.in/");

    // ✅ Schema (IMPORTANT for Google ranking)
    let script = document.querySelector("#schema-json");
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("id", "schema-json");
      document.head.appendChild(script);
    }

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "Soniya Patange Makeup Artist",
      "url": "https://soniyapatangemakeups.in/",
      "telephone": "+918624051090",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sangli",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "description": "Best makeup artist in Sangli for bridal, engagement and party makeup.",
      "areaServed": "Sangli"
    });

  }, [title, description, ogTitle, ogDescription, ogType]);

  return null;
};

export default SEO;