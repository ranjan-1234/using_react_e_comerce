import React from 'react';
import ProductItem from './ProductItem';

const Shop = ({ items, basket, increment, decrement }) => {
  return (
    <div className="shop">
      {items.map(item => (
        <ProductItem 
          key={item.id} 
          item={item}  // Corrected prop from 'product' to 'item'
          basket={basket} 
          increment={increment} 
          decrement={decrement} 
        />
      ))}
    </div>
  );
};
export default Shop;
