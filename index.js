import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+

import App from './App';
import './style.css'; // Add this import at the top of your file (App.js or index.js)
const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root element
root.render(<App />); // Render the App component into the root element
