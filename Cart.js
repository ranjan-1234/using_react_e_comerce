import React, { useState, useEffect } from 'react';

const Cart = ({ basket, setBasket, increment, decrement, clearBasket }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [shopItems, setShopItems] = useState([]); 
  const [loading, setLoading] = useState(true);  


  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await fetch('https://localhost:44365/api/Cart/ShopItem1');
        const data = await response.json();
        setShopItems(data);
        setLoading(false); 
      }
      catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);  
      }
    };
    fetchShopItems();
  }, []);  

 
  useEffect(() => {
    if (shopItems.length > 0) {
      calculateTotalAmount();
    }
  }, [basket, shopItems]);  

  const calculateTotalAmount = () => {
    const amount = basket
      .map((x) => {
        const { id, item } = x;
        const product = shopItems.find((product) => product.id === id); 
        return product ? product.price * item : 0;
      })
      .reduce((sum, current) => sum + current, 0);
    setTotalAmount(amount);
  };


  const removeItem = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    
    setBasket(updatedBasket); 
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    console.log("Clearing the cart...");
    clearBasket();
    
  };

  
  if (loading) {
    return <div>Loading shop items...</div>;
  }

  return (
    <div>
      <div id="shopping-cart">
        {basket.length > 0 ? (
          basket.map((item) => {
            const { id, item: quantity } = item;
            const product = shopItems.find((prod) => prod.id === id);  
            if (!product) return null;
            const { img, price, name } = product;
            return (
              <div key={id} className="cart-item">
                <img width="100" src={img} alt={name} />
                <div className="details">
                  <div className="title-price-x">
                    <h4 className="title-price">
                      <p>{name}</p>
                      <p className="cart-item-price">${price}</p>
                    </h4>
                    <i onClick={() => removeItem(id)} className="bi bi-x-lg">X</i>
                  </div>
                  <div className="cart-buttons">
                    <div className="buttons">
                      <p2 onClick={() => decrement(id)} className="bi bi-dash-lg">-</p2>
                      <div className="quantity">{quantity}</div>
                      <i onClick={() => increment(id)} className="bi bi-plus-lg">+</i>
                    </div>
                  </div>
                  <h3>${quantity * price}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>Cart is Empty</h2>
            <a href="/">
              <button className="HomeBtn">Back to Home</button>
            </a>
          </div>
        )}
      </div>

      <div id="label">
        {basket.length > 0 && (
          <div>
            <h2>Total Bill: ${totalAmount}</h2>
            <button className="checkout">Checkout</button>
            <button onClick={handleClearCart} className="removeAll">Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
