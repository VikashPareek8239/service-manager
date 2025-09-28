const WP_API_BASE = "http://service-manager.test/wp-json/wp/v2";

export const API_ENDPOINTS = {
  SERVICES: `${WP_API_BASE}/services`,
  POSTS: `${WP_API_BASE}/posts`,
  MEDIA: `${WP_API_BASE}/media`,
};
export const getFeaturedImage = (mediaId) => {
  return `${WP_API_BASE}/media/${mediaId}`;
};
