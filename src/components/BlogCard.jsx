import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <div className='blog-card'>
      <img src={blog.image} alt={blog.title} />
      <div className='card-content'>
        <h3>{blog.title}</h3>
        <p className='excerpt'>{blog.excerpt}</p>
        <div className='card-footer'>
          <span className='category'>{blog.category}</span>
          <Link to={`/blog/${blog.id}`} className='read-more'>
            Read More
          </Link>
        </div>
        <div className='tags'>
          {blog.tags.map((tag) => (
            <span key={tag} className='tag'>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
