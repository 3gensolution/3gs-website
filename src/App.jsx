import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import ContactModal from './components/ui/ContactModal';
import './styles/main.scss';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Careers = lazy(() => import('./pages/Careers'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader__spinner" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component
const Layout = ({ children, onContactClick }) => {
  return (
    <>
      <Navbar onContactClick={onContactClick} />
      <main>{children}</main>
      <Footer onContactClick={onContactClick} />
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <Router>
      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}

      <div className={`app ${isLoading ? 'app--loading' : ''}`}>
        <ScrollToTop />

        <Layout onContactClick={openContactModal}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route
                path="/"
                element={<Home onContactClick={openContactModal} />}
              />
              <Route
                path="/about"
                element={<About onContactClick={openContactModal} />}
              />
              <Route
                path="/services"
                element={<Services onContactClick={openContactModal} />}
              />
              <Route
                path="/projects"
                element={<Projects onContactClick={openContactModal} />}
              />
              <Route
                path="/careers"
                element={<Careers onContactClick={openContactModal} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>

        <ContactModal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
        />
      </div>
    </Router>
  );
}

export default App;
