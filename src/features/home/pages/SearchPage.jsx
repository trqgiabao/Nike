import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/features/product";
import { apiClient } from "@/shared/utils";
import "@/features/home/components/productGrid/ProductGrid.css";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        setLoading(true);

        const queryString = apiClient.buildQueryString({ q: keyword });
        const data = await apiClient.get(`/api/product/search${queryString}`);

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

    if (keyword) fetchSearchProducts();
  }, [keyword]);

  if (loading) return <p style={{ paddingTop: "100px" }}>Searching...</p>;

  return (
    <section className="product-section" style={{ paddingTop: "100px" }}>
      <div className="product-section__container">
        <div className="product-section__header">
          <h2 className="product-section__title">
            Search results for "{keyword}"
          </h2>
        </div>

        <div className="product-section__grid">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;