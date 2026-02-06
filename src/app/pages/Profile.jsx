import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/Profile.css";

const NIKE_LOGO = "/images/nike.png";

export default function Profile() {
    const [user] = useState({
        displayName: "display name o day",
        memberSince: "February 2026(month + year)",
        avatar: null,
    });

    const [activeTag, setActiveTag] = useState("All");

    const interestCategories = ["All", "Sports", "Products", "Teams", "Athletes", "Cities"];

    return (
        <div className="nike-profile-page">
            {/* Member Info Header */}
            <div className="nike-member-header">
                <div className="nike-member-avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt="Avatar" />
                    ) : (
                        <div className="nike-avatar-placeholder">
                            {user.displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="nike-member-info">
                    <h1 className="nike-member-name">{user.displayName}</h1>
                    <p className="nike-member-subtitle">
                        Nike Member • Member since {user.memberSince}
                    </p>
                </div>
            </div>

            {/* Interests */}
            <section className="nike-profile-section interests-section">
                <div className="section-header">
                    <h2>Interests</h2>
                    <button className="edit-btn">Edit</button>
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
                        <p>Add (Interest))</p>
                    </div>
                    <p className="helper-text">
                        Add your interests to shop a collection of products that are based on what you're into.
                    </p>
                </div>
            </section>

            {/* Recommended Products */}
            <section className="nike-profile-section recommended-section">
                <h2>Find your next favourite</h2>
                <div className="products-carousel">
                    <div className="product-card">
                        <img src="/images/placeholder-product1.jpg" alt="Product" />
                        <p>Nike Sportswear Phoenix Fleece</p>
                        <p className="price">1,000,000₫</p>
                    </div>
                    <div className="product-card">
                        <img src="/images/placeholder-product2.jpg" alt="Product" />
                        <p>Air Jordan Mule</p>
                        <p className="price">1,234,567₫</p>
                    </div>
                </div>
            </section>

            {/* Member Benefits */}
            <section className="nike-profile-section benefits-section">
                <h2>Member Benefits</h2>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <img src="/images" alt=" Mem benefit01" />
                        <p>Member-Only Products</p>
                    </div>
                    <div className="benefit-card">
                        <img src="/images" alt=" Mem benefit02" />
                        <p>Free Returns With Every Order</p>
                    </div>
                </div>
            </section>

            {/* Nike Apps */}
            <section className="nike-profile-section apps-section">
                <h2>Nike Apps</h2>
                <div className="apps-grid">
                    <div className="app-card">
                        <img src="/images" alt="Nike Run Club IMG" />
                        <p>Nike Run Club</p>
                        <button className="download-btn">Download</button>
                    </div>
                    <div className="app-card">
                        <img src="/images" alt="Nike Training Club IMG" />
                        <p>Nike Training Club</p>
                        <button className="download-btn">Download</button>
                    </div>
                </div>
            </section>
        </div>
    );
}