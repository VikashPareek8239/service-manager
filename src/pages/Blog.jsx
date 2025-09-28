import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import "./Blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((blog) => blog.category === categoryFilter);
    }

    if (tagFilter) {
      filtered = filtered.filter((blog) => blog.tags.includes(tagFilter));
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, categoryFilter, tagFilter]);

  const categories = [...new Set(blogs.map((blog) => blog.category))];
  const allTags = [...new Set(blogs.flatMap((blog) => blog.tags))];

  return (
    <div className='blog-page'>
      <div className='container'>
        <h1 className='text-center'>Our Blog</h1>
        <p className='page-description'>
          Stay updated with the latest wellness tips and insights
        </p>

        <div className='filter-section'>
          <input
            type='text'
            placeholder='Search blog posts...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='search-input'
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='filter-select'>
            <option value=''>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className='filter-select'>
            <option value=''>All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        </div>

        <div className='blog-grid'>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className='no-results'>
              No blog posts found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
