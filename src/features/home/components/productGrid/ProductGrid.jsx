import './ProductGrid.css';
import { useState } from 'react';
import { ProductCard } from '@/features/product';
import { Button } from '@/shared/components/atoms';
import { FilterButton } from '@/shared/components/molecules';
import { PRODUCTS, FILTER_OPTIONS } from '@/shared/constants';
const ProductGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
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
          {PRODUCTS.map((product) => (
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