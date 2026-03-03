import './ProductGrid.css';
import { ProductCard } from '@/features/product';
import { Button } from '@/shared/components/atoms';
import { FilterButton } from '@/shared/components/molecules';
import { FILTER_OPTIONS } from '@/shared/constants';
import { useEffect, useState } from 'react';
const ProductGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState([]);   
  const [loading, setLoading] = useState(true);   
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      //ngrok-skip-browser-warning
      const response = await fetch("https://d8de-14-234-30-72.ngrok-free.app/api/product", 
        {
          headers: {
          'ngrok-skip-browser-warning': 'true'
                    }
        }
                                  );
      const data = await response.json();

      console.log("RAW DATA:", data);

      const formatted = data.map(product => {

        const categoryName = product.categories?.[0]?.name || "Unknown";


        const mainImage =
          product.images?.find(img => img.isMain)?.url ||
          product.images?.[0]?.url ||
          "";


        const colorsCount = new Set(
          product.variants?.map(v => v.color)
        ).size;

        return {
          id: product.id,
          name: product.name,
          category: categoryName,
          price: product.basePrice,
          originalPrice: null, 
          image: mainImage,
          isNew: false, 
          colors: colorsCount
        };
      });

      setProducts(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
if (loading) return <p>Loading products...</p>;
  return (
    <section className="product-section">
      <div className="product-section__container">
        <div className="product-section__header">
          <div className="product-section__title-group">
            <h2 className="product-section__title">Popular Right Now</h2>
            <p className="product-section__subtitle">Discover what everyone's wearing</p>
          </div>
          <div className="product-section__filters">
            {FILTER_OPTIONS.map((filter) => (
              <FilterButton
                key={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterButton>
            ))}
          </div>
        </div>
        
        <div className="product-section__grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="product-section__load-more">
          <Button variant="secondary" size="large">Load More Products</Button>
        </div>
      </div>
    </section>
  );
};
export default ProductGrid;