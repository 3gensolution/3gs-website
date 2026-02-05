import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import CustomCursor from './components/ui/CustomCursor';
import { useSmoothScroll } from './hooks';
import './styles/main.scss';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
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

// Layout component with smooth scroll
const Layout = ({ children, hideFooter = false }) => {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <Router>
      <CustomCursor />

      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}

      <div className={`app ${isLoading ? 'app--loading' : ''}`}>
        <ScrollToTop />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/projects" element={<Layout><Projects /></Layout>} />
            <Route path="/contribute" element={<Layout><Careers /></Layout>} />
            <Route path="/contact" element={<Layout hideFooter><Contact /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
