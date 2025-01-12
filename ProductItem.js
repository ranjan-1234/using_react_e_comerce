import React from 'react';

const ProductItem = ({ item, increment, decrement }) => {
  return (
    <div className="product-item">
      <img src={item.img} alt={item.name} width="200" />
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      <p>Price: ${item.price}</p>
      <button onClick={() => increment(item.id)}>Add to Cart</button>
      <button onClick={() => decrement(item.id)}>Remove from Cart</button>
    </div>
  );
};

export default ProductItem;
