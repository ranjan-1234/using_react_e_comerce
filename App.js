import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Cart from './components/Cart';

const App = () => {

  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('data');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

 
  const [shopItems, setShopItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const incrementItem = (id) => {
    setBasket(prevBasket => {
      const updatedBasket = [...prevBasket];
      const itemIndex = updatedBasket.findIndex(item => item.id === id);
      if (itemIndex > -1) {
        updatedBasket[itemIndex].item += 1;
      } else {
        updatedBasket.push({ id, item: 1 });
      }
      return updatedBasket;
    });
  };

  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await fetch('https://localhost:44365/api/Cart/ShopItem1');
        const data = await response.json();

        if (response.ok) {
          setShopItems(data);
          setIsLoading(false); 
        } else {
          console.error('Error fetching data:', data);
          setIsLoading(false); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchShopItems();
  }, [incrementItem]); 


  useEffect(() => {
    if (basket.length > 0) {
      localStorage.setItem('data', JSON.stringify(basket));
    }
  }, [basket]); 
 
  const decrementItem = (id) => {
    setBasket(prevBasket => {
      const updatedBasket = [...prevBasket];
      const itemIndex = updatedBasket.findIndex(item => item.id === id);
      if (itemIndex > -1 && updatedBasket[itemIndex].item > 1) {
        updatedBasket[itemIndex].item -= 1;
      }
       else {
        updatedBasket.splice(itemIndex, 1); 
      }
      return updatedBasket;
    });
  };

  const clearBasket = () => {
    setBasket([]);  // Clear all items from the basket
    localStorage.removeItem('data');
  };

  return (
    <Router>
      <div>
        <Navbar basket={basket} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Shop items={shopItems} basket={basket} increment={incrementItem} decrement={decrementItem} />}
            />
            <Route
              path="/cart"
              element={<Cart basket={basket} setBasket={setBasket} increment={incrementItem} decrement={decrementItem} clearBasket={clearBasket} />}
            />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
