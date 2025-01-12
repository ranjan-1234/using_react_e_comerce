import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ basket }) => {
  const totalItems = basket.reduce((total, item) => total + item.item, 0);

  return (
    <div className="navbar">
      <Link to="/">
        <h2>Clothing Store</h2>
      </Link>
      <Link to="/cart">
        <div className="cart">
          <i className="bi bi-cart2"></i>
          <div className="cartAmount">{totalItems}</div>
        </div>
      </Link>
    </div>
  );
};
export default Navbar;
