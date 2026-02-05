import Hero from '../../sections/home/Hero';
import ProductBanner from '../../sections/home/ProductBanner';
import WhoWeAre from '../../sections/home/WhoWeAre';
import Solutions from '../../sections/home/Solutions';
import FeaturedProducts from '../../sections/home/FeaturedProducts';
// import WhyUs from '../../sections/home/WhyUs';
import CTA from '../../sections/home/CTA';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ProductBanner />
      <WhoWeAre />
      <Solutions />
      <FeaturedProducts />
      {/* <WhyUs /> */}
      {/* <CTA /> */}
    </div>
  );
};

export default Home;
