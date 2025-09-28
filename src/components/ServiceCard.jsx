import "./ServiceCard.css";

const ServiceCard = ({ service }) => {
  return (
    <div className='service-card'>
      <img src={service.image} alt={service.title} />
      <div className='card-content'>
        <h3>{service.title}</h3>
        <p className='description'>{service.description}</p>
        <div className='card-footer'>
          <span className='price'>{service.price}</span>
          <span className='category'>{service.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
