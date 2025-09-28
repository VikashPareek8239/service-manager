import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='container'>
          <div className='hero-content'>
            <h1>Welcome to ServiceManager</h1>
            <p>
              Your trusted partner for premium wellness services and expert
              insights
            </p>
            <div className='hero-buttons'>
              <Link to='/services' className='btn btn-primary'>
                Explore Services
              </Link>
              <Link to='/blog' className='btn btn-secondary'>
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='features'>
        <div className='container'>
          <h2>Why Choose Us?</h2>
          <div className='features-grid'>
            <div className='feature'>
              <h3>Expert Services</h3>
              <p>Professional treatments delivered by certified experts</p>
            </div>
            <div className='feature'>
              <h3>Quality Guaranteed</h3>
              <p>We maintain the highest standards in all our services</p>
            </div>
            <div className='feature'>
              <h3>Customer Focused</h3>
              <p>Your satisfaction is our top priority</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
