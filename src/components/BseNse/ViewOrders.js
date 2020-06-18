import React,{useState,useEffect} from 'react';
import {getNseUserOrder,getBseUserOrder} from '../../utilities/api';

const ViewOrders = () => {
    const [BSE,setBSE] = useState([]);
    const [NSE,setNSE] = useState([]);

    useEffect(() => {
        getData();
      }, [])
    
      const getData = () => {
        getNseUserOrder({userId:parseInt(localStorage.getItem('id'))},(response) => {console.log(response);setNSE(response);});
        getBseUserOrder({userId:parseInt(localStorage.getItem('id'))},(response) => {console.log(response);setBSE(response)});
      }

    const renderStockList = (list, type) => {
        return list.map(o =>
           (
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
                  <div className="btn buy">bought</div>
                ) : (
                  <div className="btn sell">sold</div>
                )}
              </div>
            </div>
          )
        );
      };
    
      const orderBook = () => {
        return (
          <div className="order-book">
            <div className="stock">
              <div
                className="heading buy"

              >
                NSE
              </div>
              {renderStockList(NSE, "buy")}
            </div>
            <div className="stock">
              <div
                className="heading sell"
                
              >
                BSE
              </div>
              {renderStockList(BSE, "sell")}
            </div>
          </div>
        );
      };
    return(<>{orderBook()}</>)
    
}

export default ViewOrders;