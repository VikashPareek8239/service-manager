import { useState, useEffect } from "react";
import { API_ENDPOINTS, getFeaturedImage } from "../config/api";

const useBlogs = (useWordPress = false) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let data;

        if (useWordPress) {
          const response = await fetch(API_ENDPOINTS.POSTS);
          if (!response.ok) {
            throw new Error("Failed to fetch posts from WordPress");
          }
          const wpPosts = await response.json();
          data = await Promise.all(
            wpPosts.map(async (post) => {
              let imageUrl = "/images/default-blog.jpg";
              if (post.featured_media) {
                try {
                  const mediaResponse = await fetch(
                    getFeaturedImage(post.featured_media)
                  );
                  const mediaData = await mediaResponse.json();
                  imageUrl = mediaData.source_url;
                } catch (mediaError) {
                  console.warn("Failed to fetch featured image:", mediaError);
                }
              }
              const categories = post.categories || [];
              const tags = post.tags || [];

              return {
                id: post.id,
                title: post.title.rendered,
                excerpt:
                  post.excerpt.rendered
                    .replace(/<[^>]*>/g, "")
                    .substring(0, 150) + "...",
                content: post.content.rendered,
                image: imageUrl,
                category: categories.length > 0 ? "WordPress" : "Uncategorized", // You'd need to fetch category names
                tags: tags.length > 0 ? ["wordpress"] : ["general"],
              };
            })
          );
        } else {
          const response = await fetch("/data/blogs.json");
          if (!response.ok) {
            throw new Error("Failed to fetch blogs from local JSON");
          }
          data = await response.json();
        }

        setBlogs(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching blogs:", err);
        try {
          const response = await fetch("/data/blogs.json");
          const localData = await response.json();
          setBlogs(localData);
        } catch (fallbackError) {
          setError("Failed to load blogs from both sources");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [useWordPress]);

  return { blogs, loading, error };
};

export default useBlogs;
