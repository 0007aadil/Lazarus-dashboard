import React, { useState, useContext } from "react";

import axios from "axios";
import GeneralContext from "./GeneralContext";


import "./SellActionWindow.css";



const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const context = useContext(GeneralContext); // Use context to access close function

  const handleSellClick = () => {
    axios.post("https://lazarus-backend-emut.onrender.com/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",  // Set mode to SELL
    }, { withCredentials: true })  // Include credentials to send cookies
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });

    context.closeSellWindow(); // Use the context to close the sell window
  };

  const handleCancelClick = () => {
    context.closeSellWindow(); // Use the context to close the sell window
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
