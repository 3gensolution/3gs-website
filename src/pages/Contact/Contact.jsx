import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import TextReveal from '../../components/common/TextReveal';
import './Contact.scss';

const Contact = () => {
  const pageRef = useRef(null);
  const emailRef = useRef(null);
  const socialRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate email
      tl.fromTo(emailRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate social links
      if (socialRef.current) {
        const links = socialRef.current.querySelectorAll('a');
        tl.fromTo(links,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // Animate bottom section
      tl.fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef}>
      <div className="contact-page__container">
        <div className="contact-page__main">
          <div className="contact-page__content">
            <TextReveal
              as="h1"
              className="contact-page__title"
              type="words"
              stagger={0.04}
              duration={0.7}
              delay={0.3}
              trigger={false}
            >
              Get in touch
            </TextReveal>

            <div className="contact-page__email" ref={emailRef}>
              <a
                href="mailto:hello@3gensolution.com"
                className="contact-page__email-link"
                data-cursor-hover
              >
                hello@3gensolution.com
              </a>
              <span className="contact-page__email-arrow" data-cursor-hover>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          <div className="contact-page__social" ref={socialRef}>
            <a
              href="https://x.com/AwinFiHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-page__social-link"
              data-cursor-hover
            >
              TWITTER
            </a>
            <a
              href="https://www.linkedin.com/company/3gensolution"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-page__social-link"
              data-cursor-hover
            >
              LINKEDIN
            </a>
          </div>
        </div>

        <div className="contact-page__bottom" ref={bottomRef}>
          <div className="contact-page__legal">
            <Link to="/privacy" className="contact-page__legal-link" data-cursor-hover>
              PRIVACY POLICY
            </Link>
            <Link to="/terms" className="contact-page__legal-link" data-cursor-hover>
              TERMS OF SERVICE
            </Link>
          </div>

          <p className="contact-page__copyright">
            3GS SOLUTION {new Date().getFullYear()} &copy; ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
