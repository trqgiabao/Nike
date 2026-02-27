import './ProductCard.css';
import { Heart } from 'lucide-react';
import { Badge, Button } from '@/shared/components/atoms';
import { IconButton } from '@/shared/components/molecules';
const ProductCard = ({ 
  name, 
  category, 
  price, 
  originalPrice, 
  image, 
  isNew, 
  colors 
}) => {
  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        {isNew && <Badge variant="new" className="product-card__badge">New</Badge>}
        <IconButton className="product-card__wishlist">
          <Heart size={20} />
        </IconButton>
        <img src={image} alt={name} className="product-card__image" />
        <div className="product-card__overlay">
          <Button variant="primary" size="small">Quick Add</Button>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__header">
          <span className="product-card__category">{category}</span>
          <span className="product-card__colors">{colors} Colors</span>
        </div>
        <h3 className="product-card__name">{name}</h3>
        <div className="product-card__pricing">
          <span className="product-card__price">${price}</span>
          {originalPrice && (
            <span className="product-card__original-price">${originalPrice}</span>
          )}
        </div>
      </div>
    </article>
  );
};
export default ProductCard;