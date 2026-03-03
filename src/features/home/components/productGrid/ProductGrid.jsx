import './ProductGrid.css';
import { ProductCard } from '@/features/product';
import { Button } from '@/shared/components/atoms';
import { FilterButton } from '@/shared/components/molecules';
import { FILTER_OPTIONS } from '@/shared/constants';
import { getProducts } from '@/features/product/services/ProductService';
import { useEffect, useState } from 'react';

const ProductGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState([]);   
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts({ page, pageSize: 20 });

      console.log("RAW DATA:", data);

      // Map API response to ProductCard format
      const formatted = data.items.map(product => {
        // Map gender: 0 = Unisex, 1 = Men, 2 = Women
        const genderMap = {
          0: 'Unisex',
          1: 'Men',
          2: 'Women'
        };
        
        const categoryName = genderMap[product.gender] || 'Unknown';

        // Calculate colors count (can be enhanced if API provides variant data)
        const colorsCount = 1;

        return {
          id: product.id,
          name: product.name,
          category: categoryName,
          price: product.minPrice,
          originalPrice: product.minPrice !== product.maxPrice ? product.maxPrice : null, 
          image: product.mainImageUrl,
          isNew: false, 
          colors: colorsCount,
          isAvailable: product.isAvailable
        };
      });

      setProducts(formatted);
      setTotalPages(data.totalPages);
      setHasNext(data.hasNext);
      setHasPrevious(data.hasPrevious);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (hasNext) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (loading && page === 1) return <p>Loading products...</p>;
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
        {loading && page > 1 && (
          <div className="product-section__load-more">
            <p>Loading more products...</p>
          </div>
        )}
        {!loading && hasNext && (
          <div className="product-section__load-more">
            <Button variant="secondary" size="large" onClick={handleLoadMore}>
              Load More Products
            </Button>
          </div>
        )}
        {!loading && !hasNext && page > 1 && (
          <div className="product-section__load-more">
            <p>No more products to load</p>
          </div>
        )}
        <div className="product-section__pagination-info">
          <p>Page {page} of {totalPages}</p>
        </div>
      </div>
    </section>
  );
};
export default ProductGrid;