import React, { useState,useEffect } from "react";
import "./styles.scss";
import { allStocks } from "./data";
import PopUp from "../Popup/Popup";
import { useHistory } from "react-router-dom";
import {getNse,getBse,getNseUserOrder,getBseUserOrder} from '../../utilities/api';
import ViewOrders from './ViewOrders';

export default function BseNse() {
  const [selected, setSelected] = useState("stocks");
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState({});
  // const [data,setData] = useState({BSE:[],NSE:[]});
  const [BSE,setBSE] = useState([]);
  const [NSE,setNSE] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if(!localStorage.getItem('id'))
    {
      history.push('/');
      return;
    }
    getData();
  }, [])

  const getData = () => {
    getNse((response) => {console.log(response);setNSE(response);});
    getBse((response) => {console.log(response);setBSE(response)});
  }

  const renderStockList = (list, type) => {
    return list.map(o =>
      o.orderType.toLowerCase() === type ? (
        <div className="stock-tile" key={o.orderId}>
          <div className="stock-info">
            <div className="stock-name">{o.companyName}</div>
            <div className="stock-number">Price ${o.sharePrice}</div>
            <div className="stock-number">No. Of Stocks {o.noOfShares}</div>
          </div>
          <div
            className="stock-action"
          >
            {o.orderType.toLowerCase() === "buy" ? (
              <div className="btn buy">buy</div>
            ) : (
              <div className="btn sell">sell</div>
            )}
          </div>
        </div>
      ) : null
    );
  };

  const orderBook = type => {
    return (
      <div className="order-book">
        <div className="stock">
          <div
            className="heading buy"
            onClick={() => {
              setOpen(!open);
              setHeading({orderType:"buy"});
            }}
          >
            buy
          </div>
          {renderStockList(type === 'NSE' ? NSE : BSE, "buy")}
        </div>
        <div className="stock">
          <div
            className="heading sell"
            onClick={() => {
              setOpen(!open);
              setHeading({orderType:"sell"});
            }}
          >
            sell
          </div>
          {renderStockList(type === 'NSE' ? NSE : BSE, "sell")}
        </div>
      </div>
    );
  };

  const showComponent = value => {
    switch (value) {
      case "stocks":
        return orderBook("NSE");
      case "order-book":
        return orderBook("BSE");
      case "add":
        return <ViewOrders/>;
      default:
        return null;
    }
  };

  return (
    <div className="bse-nse">
      <div className="tab">
        <div
          className={selected === "stocks" ? "option selected" : "option"}
          onClick={() => setSelected("stocks")}
        >
          NSE
        </div>
        <div
          className={selected === "order-book" ? "option selected" : "option"}
          onClick={() => setSelected("order-book")}
        >
          BSE
        </div>
        <div
          className={selected === "add" ? "option selected" : "option"}
          onClick={() => setSelected("add")}
        >
          View Order
        </div>
      </div>
      {showComponent(selected)}
      <PopUp open={open} toggle={() => setOpen(!open)} data={heading} refresh={() => getData()}/>
    </div>
  );
}
