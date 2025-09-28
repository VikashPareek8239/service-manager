import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import useServices from "../hooks/useServices";
import "./Services.css";

const Services = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [useWordPress, setUseWordPress] = useState(false);

  // Use the hook with WordPress toggle
  const { services, loading, error } = useServices(useWordPress);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(
        (service) => service.category === categoryFilter
      );
    }

    // Sort by price
    if (priceSort) {
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace("$", "").replace(",", ""));
        const priceB = parseInt(b.price.replace("$", "").replace(",", ""));
        return priceSort === "low-high" ? priceA - priceB : priceB - priceA;
      });
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, categoryFilter, priceSort]);

  const categories = [...new Set(services.map((service) => service.category))];

  if (loading) {
    return (
      <div className='services-page'>
        <div className='container'>
          <div className='loading'>Loading services...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='services-page'>
        <div className='container'>
          <div className='error'>Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='services-page'>
      <div className='container'>
        <h1 className='text-center'>Our Services</h1>
        <p className='page-description'>
          Discover our range of premium wellness services
        </p>

        {/* WordPress Toggle */}
        <div className='wordpress-toggle'>
          <label>
            <input
              type='checkbox'
              checked={useWordPress}
              onChange={(e) => setUseWordPress(e.target.checked)}
            />
            Use WordPress Data
          </label>
          <small>
            {useWordPress ? "Fetching from WordPress" : "Using local JSON data"}
          </small>
        </div>

        {/* Filters */}
        <div className='filter-section'>
          <input
            type='text'
            placeholder='Search services...'
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
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
            className='filter-select'>
            <option value=''>Sort by Price</option>
            <option value='low-high'>Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
          </select>
        </div>

        {/* Services Grid */}
        <div className='services-grid'>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <p className='no-results'>
              No services found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
