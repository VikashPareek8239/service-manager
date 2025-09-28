import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("/data/blogs.json");
        const blogs = await response.json();
        const foundBlog = blogs.find((b) => b.id === parseInt(id));
        setBlog(foundBlog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className='blog-detail loading'>
        <div className='container'>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className='blog-detail not-found'>
        <div className='container'>
          <h1 className='text-center'>Blog Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to='/blog' className='btn'>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='blog-detail'>
      <div className='container'>
        <Link to='/blog' className='back-link'>
          ← Back to Blog
        </Link>

        <article className='blog-article'>
          <header className='blog-header'>
            <h1 className='text-center'>{blog.title}</h1>
            <div className='blog-meta'>
              <span className='category'>{blog.category}</span>
              <div className='tags'>
                {blog.tags.map((tag) => (
                  <span key={tag} className='tag'>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div className='blog-image'>
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className='blog-content'>
            <p>{blog.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
