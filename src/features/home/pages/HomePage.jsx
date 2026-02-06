import { Header, Footer } from '@/shared/components/organisms';
import { Hero, ProductGrid } from '../components';
const HomePage = () => {
  return (
    <div className="page">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};
export default HomePage;