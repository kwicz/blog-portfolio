// ProductCard — image-led, borderless, 4:5. Optional ribbon top-left.
function ProductCard({ product, onClick }) {
  return (
    <div className="pcard" onClick={onClick}>
      <div className="pcard-img">
        {product.ribbon && (
          <div className="pcard-ribbon">
            <Ribbon color={product.ribbon.color || 'tomato'}>{product.ribbon.label}</Ribbon>
          </div>
        )}
        <img src={product.image} alt={product.name} />
      </div>
      <div className="pcard-meta">
        <div className="pcard-name">{product.name}</div>
        <div className="pcard-price">
          <span>${product.price}</span>
          {product.rating && (
            <span className="pcard-rating">
              <Icon name="star" size={12} strokeWidth={2} /> {product.rating} ({product.reviews})
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProductCard });
