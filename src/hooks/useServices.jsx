import { useState, useEffect } from "react";
import { API_ENDPOINTS, getFeaturedImage } from "../config/api";

const useServices = (useWordPress = false) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let data;

        if (useWordPress) {
          const response = await fetch(API_ENDPOINTS.SERVICES);
          if (!response.ok) {
            throw new Error("Failed to fetch services from WordPress");
          }
          const wpServices = await response.json();
          data = await Promise.all(
            wpServices.map(async (service) => {
              let imageUrl = "/images/default-service.jpg";
              if (service.featured_media) {
                try {
                  const mediaResponse = await fetch(
                    getFeaturedImage(service.featured_media)
                  );
                  const mediaData = await mediaResponse.json();
                  imageUrl = mediaData.source_url;
                } catch (mediaError) {
                  console.warn("Failed to fetch featured image:", mediaError);
                }
              }

              return {
                id: service.id,
                title: service.title.rendered,
                description:
                  service.excerpt.rendered
                    .replace(/<[^>]*>/g, "")
                    .substring(0, 100) + "...",
                price: service.custom_fields?.price || "$0",
                image: imageUrl,
                category: service.custom_fields?.category || "Uncategorized",
              };
            })
          );
        } else {
          const response = await fetch("/data/services.json");
          if (!response.ok) {
            throw new Error("Failed to fetch services from local JSON");
          }
          data = await response.json();
        }

        setServices(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching services:", err);

        try {
          const response = await fetch("/data/services.json");
          const localData = await response.json();
          setServices(localData);
        } catch (fallbackError) {
          setError("Failed to load services from both sources");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [useWordPress]);

  return { services, loading, error };
};

export default useServices;
