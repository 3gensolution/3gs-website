import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './NotFound.scss';

const NotFound = () => {
  const pageRef = useRef(null);
  const codeRef = useRef(null);
  const headlineRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate 404 code
      tl.fromTo(codeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate headline words
      const words = headlineRef.current?.querySelectorAll('.not-found__word');
      if (words) {
        tl.fromTo(words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' },
          '-=0.4'
        );
      }

      // Animate links
      const links = linksRef.current?.querySelectorAll('.not-found__link');
      if (links) {
        tl.fromTo(links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
          '-=0.3'
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const renderWord = (word, index, isItalic = false) => (
    <span
      key={index}
      className={`not-found__word ${isItalic ? 'not-found__word--italic' : ''}`}
    >
      {word}{' '}
    </span>
  );

  return (
    <div className="not-found" ref={pageRef}>
      <div className="not-found__container">
        <div className="not-found__content">
          <span className="not-found__code" ref={codeRef}>404</span>

          <h1 className="not-found__headline" ref={headlineRef}>
            {"The page you're looking for".split(' ').map((word, i) => renderWord(word, `h-${i}`))}
            {"doesn't exist".split(' ').map((word, i) => renderWord(word, `i1-${i}`, true))}
            {"or has been moved. Let's get you back to".split(' ').map((word, i) => renderWord(word, `m-${i}`))}
            {'somewhere familiar.'.split(' ').map((word, i) => renderWord(word, `i2-${i}`, true))}
          </h1>
        </div>

        <div className="not-found__links" ref={linksRef}>
          <Link to="/" className="not-found__link" data-cursor-hover>
            <span className="not-found__link-text">HOME</span>
          </Link>
          <Link to="/about" className="not-found__link" data-cursor-hover>
            <span className="not-found__link-text">ABOUT</span>
          </Link>
          <Link to="/services" className="not-found__link" data-cursor-hover>
            <span className="not-found__link-text">SERVICES</span>
          </Link>
          <Link to="/projects" className="not-found__link" data-cursor-hover>
            <span className="not-found__link-text">PRODUCTS</span>
          </Link>
          <Link to="/contact" className="not-found__link" data-cursor-hover>
            <span className="not-found__link-text">CONTACT</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
