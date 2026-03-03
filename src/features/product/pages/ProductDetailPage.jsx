import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "@/features/product/services/ProductService";
import { addToCart } from "@/features/cart/services/CartService";
import { getCurrentUser } from "@/features/auth/session";
import { Header, Footer } from "@/shared/components/organisms";
import { Button } from "@/shared/components/atoms";
import "./ProductDetail.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = getCurrentUser();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      
      // Set default image
      const mainImg = data.images.find(img => img.isMain);
      setSelectedImage(mainImg?.url || data.images[0]?.url || "");
      
      // Select first active variant by default
      const firstVariant = data.variants.find(v => v.isActive);
      setSelectedVariant(firstVariant);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert("Please select a size first!");
      return;
    }

    if (!user?.id) {
      navigate("/signin");
      return;
    }

    try {
      await addToCart(user.id, {
        productVariantId: selectedVariant.id,
        quantity: 1,
      });
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart: " + err.message);
    }
  };

  const getGenderText = (gender) => {
    const map = { 0: "Women", 1: "Men", 2: "Unisex" };
    return map[gender] || "Unknown";
  };

  if (loading) {
    return (
      <div className="page">
        <Header />
        <main className="product-detail-container">
          <p>Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page">
        <Header />
        <main className="product-detail-container">
          <p className="error">Error: {error || "Product not found"}</p>
          <Button onClick={() => navigate("/")}>Back to Products</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isLimitedEdition = product.variants.some((v) => v.isLimitedEdition);

  return (
    <div className="page">
      <Header />
      <main className="product-detail-container">
        <Button onClick={() => navigate("/")} variant="secondary" className="back-btn">
          ← Back
        </Button>

        <div className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className="image-thumbnails">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={`${product.name} ${index + 1}`}
                  className={selectedImage === img.url ? "active" : ""}
                  onClick={() => setSelectedImage(img.url)}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            {isLimitedEdition && (
              <span className="limited-badge">Limited Edition</span>
            )}
            
            <p className="product-price">${product.basePrice}</p>

            <div className="product-meta">
              <p>
                <strong>Code:</strong> {product.code}
              </p>
              <p>
                <strong>Technology:</strong> {product.technology}
              </p>
              <p>
                <strong>Gender:</strong> {getGenderText(product.gender)}
              </p>
              {product.categories && product.categories.length > 0 && (
                <p>
                  <strong>Category:</strong>{" "}
                  {product.categories.map((c) => c.name).join(", ")}
                </p>
              )}
            </div>

            {product.description && (
              <div className="product-description">
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-variants">
              <h3>Select Size</h3>
              <div className="size-buttons">
                {product.variants
                  .filter((v) => v.isActive)
                  .map((variant) => (
                    <button
                      key={variant.id}
                      className={`size-btn ${
                        selectedVariant?.id === variant.id ? "active" : ""
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.size}
                    </button>
                  ))}
              </div>
            </div>

            <Button onClick={handleAddToCart} size="large" className="add-to-cart-btn">
              Add To Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
