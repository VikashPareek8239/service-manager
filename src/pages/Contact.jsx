import ContactForm from "../components/ContactForm";
import "./Contact.css";

const Contact = () => {
  return (
    <div className='contact-page'>
      <div className='container'>
        <h1 className='text-center'>Contact Us</h1>
        <p className='page-description'>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>

        <div className='contact-content'>
          <div className='contact-info'>
            <h2>Get in Touch</h2>
            <div className='info-item'>
              <h3>Email</h3>
              <p>info@servicemanager.com</p>
            </div>
            <div className='info-item'>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className='info-item'>
              <h3>Address</h3>
              <p>
                123 Wellness Street
                <br />
                Health City, HC 12345
              </p>
            </div>
          </div>

          <div className='contact-form-wrapper'>
            <h2>Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
