import { useState } from 'react';
import Button  from '@/shared/components/atoms/button/Button.jsx';
import Header from '@/shared/components/organisms/header/Header.jsx';
import Footer from '@/shared/components/organisms/footer/Footer.jsx';
import './Profile.css';

export default function Profile() {
  const [user] = useState({
    displayName: "Duy Minh",
    memberSince: "February 2026",
    avatar: null,
    role: "Member",
  });

  const [activeTag, setActiveTag] = useState("All");

  const interestCategories = ["All", "Sports", "Products", "Teams", "Athletes", "Cities"];

  const recommendedProducts = [
    {
      name: "Nike Sportswear Phoenix Fleece",
      category: "Women's Hoodie",
      price: "1,000,000₫",
      originalPrice: "1,200,000₫",
      image: "product1.jpg",
      isNew: true,
      colors: 6,
    },
    {
      name: "Air Jordan Mule",
      category: "Slides",
      price: "1,234,567₫",
      image: "product2.jpg",
      isNew: false,
      colors: 3,
    },
  ];
  return (
    <div className="profile-wrapper">
      <Header />

      <main className="profile-page" style={{ paddingTop: '90px' }}>
        {/* User Header */}
        <div className="profile-header">
          <div className="avatar-wrapper">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="avatar" />
            ) : (
              <div className="avatar-placeholder">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="user-info">
            <h1 className="user-name">{user.displayName.toUpperCase()}</h1>
            <p className="user-subtitle">
              Nike Member • Since {user.memberSince}
            </p>
          </div>
        </div>

        {/* Interests */}
        <section className="interests-section">
          <div className="section-header">
            <h2>Interests</h2>
            <Button variant="outline" size="small">Edit</Button>
          </div>

          <div className="interests-tags">
            {interestCategories.map((category) => (
              <span
                key={category}
                className={`tag ${activeTag === category ? "active" : ""}`}
                onClick={() => setActiveTag(category)}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="add-interests-placeholder">
            <div className="placeholder-box">
              <span className="plus-icon">+</span>
              <p>Add {activeTag === "All" ? "Interests" : activeTag}</p>
            </div>
            <p className="helper-text">
              Add interests to get personalized product recommendations.
            </p>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="recommended-section">
          <h2>Find Your Next Favourite</h2>
          <div className="product-grid">
            {recommendedProducts.map((product, idx) => (
              <div key={idx} className="product-card">
                {product.isNew && <span className="badge badge--new">New</span>}
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <p className="category">{product.category}</p>
                  <h3>{product.name}</h3>
                  <div className="pricing">
                    <span className="price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="colors">{product.colors} Colors</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Member Benefits */}
        <section className="benefits-section">
          <h2>Member Benefits</h2>
          <div className="benefits-grid">
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}