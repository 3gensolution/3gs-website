import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ContactModal.scss';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const tl = gsap.timeline();

      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      tl.fromTo(contentRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.1'
      );

      // Animate form fields
      const fields = contentRef.current?.querySelectorAll('.contact-modal__field, .contact-modal__submit');
      if (fields) {
        tl.fromTo(fields,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          '-=0.2'
        );
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.2,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', message: '' });
        setErrors({});
      }
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto close after success
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal" ref={modalRef}>
      <div
        className="contact-modal__overlay"
        ref={overlayRef}
        onClick={handleClose}
      />

      <div className="contact-modal__content" ref={contentRef}>
        <button className="contact-modal__close" onClick={handleClose} data-cursor-hover>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {!isSuccess ? (
          <>
            <div className="contact-modal__header">
              <h2 className="contact-modal__title">Get in Touch</h2>
              <p className="contact-modal__subtitle">
                Have a project in mind? Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form className="contact-modal__form" onSubmit={handleSubmit}>
              <div className="contact-modal__field">
                <label htmlFor="name" className="contact-modal__label">
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact-modal__input ${errors.name ? 'contact-modal__input--error' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && <span className="contact-modal__error">{errors.name}</span>}
              </div>

              <div className="contact-modal__field">
                <label htmlFor="email" className="contact-modal__label">
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact-modal__input ${errors.email ? 'contact-modal__input--error' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="contact-modal__error">{errors.email}</span>}
              </div>

              <div className="contact-modal__field">
                <label htmlFor="company" className="contact-modal__label">
                  Company <span className="optional">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="contact-modal__input"
                  placeholder="Your company name"
                />
              </div>

              <div className="contact-modal__field">
                <label htmlFor="message" className="contact-modal__label">
                  Message <span>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`contact-modal__textarea ${errors.message ? 'contact-modal__input--error' : ''}`}
                  placeholder="Tell us about your project..."
                  rows="4"
                />
                {errors.message && <span className="contact-modal__error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="contact-modal__submit"
                disabled={isSubmitting}
                data-cursor-hover
              >
                {isSubmitting ? (
                  <span className="contact-modal__spinner" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="contact-modal__success">
            <div className="contact-modal__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="contact-modal__success-title">Message Sent!</h3>
            <p className="contact-modal__success-text">
              Thank you for reaching out. We'll get back to you shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
