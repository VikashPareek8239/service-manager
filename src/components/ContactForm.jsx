import { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className='contact-form'>
      {isSubmitted && (
        <div className='success-message'>
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <textarea
            id='message'
            name='message'
            rows='5'
            value={formData.message}
            onChange={handleChange}
            required></textarea>
        </div>

        <div className='recaptcha-mock'>
          <div className='recaptcha-box'>
            <span>✓</span>
            <span>I'm not a robot</span>
          </div>
          <small>reCAPTCHA v2 - Privacy & Terms</small>
        </div>

        <button
          type='submit'
          className='btn submit-btn'
          disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
