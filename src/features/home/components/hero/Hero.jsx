import './Hero.css';
import heroShoe from '@/assets/hero-shoe.png';
import { Badge, Button } from '@/shared/components/atoms';
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <Badge variant="accent" className="hero__badge">New Release</Badge>
          <h1 className="hero__title">
            AIR MAX<br />
            <span className="hero__title-accent">DN8</span>
          </h1>
          <p className="hero__description">
            Experience the future of air. Revolutionary Air Max technology meets bold design for unmatched comfort and style.
          </p>
          <div className="hero__price">
            <span className="hero__price-current">$189.99</span>
            <span className="hero__price-original">$229.99</span>
          </div>
          <div className="hero__buttons">
            <Button variant="accent" size="large">Shop Now</Button>
            <Button variant="secondary" size="large">Learn More</Button>
          </div>
        </div>
        <div className="hero__image-container">
          <div className="hero__image-bg"></div>
          <img 
            src={heroShoe} 
            alt="Nike Air Max DN8" 
            className="hero__image"
          />
          <div className="hero__stats">
            <div className="hero__stat-item">
              <span className="hero__stat-value">40%</span>
              <span className="hero__stat-label">Lighter</span>
            </div>
            <div className="hero__stat-item">
              <span className="hero__stat-value">2X</span>
              <span className="hero__stat-label">More Cushion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;