import { useEffect } from "react";
import { SITE_DATA } from "@/data/siteData";

interface SEOProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
}

const SEO = ({
  title,
  description = `Best makeup artist in Sangli offering bridal, engagement, HD & airbrush makeup services by ${SITE_DATA.ownerName}.`,
  ogTitle,
  ogDescription,
  ogType = "website"
}: SEOProps) => {

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_DATA.businessName}`;

    // ✅ Title
    document.title = fullTitle;

    // ✅ Helper function
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
      `best makeup artist in sangli, bridal makeup artist sangli, hd makeup sangli, airbrush makeup sangli, maharashtrian bridal makeup, ${SITE_DATA.ownerName}, ${SITE_DATA.businessName}, makeup artist in sangli`);

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

    // ✅ Schema
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
      "name": SITE_DATA.businessName,
      "url": "https://soniyapatangemakeups.in/",
      "telephone": `+91${SITE_DATA.contactNumber}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sangli",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "description": description,
      "areaServed": "Sangli"
    });

  }, [title, description, ogTitle, ogDescription, ogType]);

  return null;
};

export default SEO;