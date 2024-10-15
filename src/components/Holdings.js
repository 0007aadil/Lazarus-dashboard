import React, { useState, useEffect } from "react";
import axios from "axios";
import HoldingsChart from './HoldingsChart';

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  

  useEffect(() => {
    // Fetch holdings and buy orders data concurrently
    const fetchData = async () => {
      try {
        const [holdingsResponse, buyOrdersResponse] = await Promise.all([
          axios.get("https://lazarus-backend-emut.onrender.com/allHoldings"),
          
        ]);
        setAllHoldings(holdingsResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the chart
  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Prices',
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Calculate total investment, current value, and P&L
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );
  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );
  const pnl = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? ((pnl / totalInvestment) * 100).toFixed(2) : '0.00';

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>Cur. Val</th>
              <th>P&L</th>
              <th>Net Chg.</th>
              <th>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total Investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current Value</p>
        </div>
        <div className="col">
          <h5>{pnl.toFixed(2)} ({pnlPercentage}%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <div>
        <HoldingsChart data={data} />
      </div>
    </>
  );
};

export default Holdings;
