import React , { useState }from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {IoMdLogIn} from 'react-icons/io';
import '../Header/Login/Login.scss';
import {checkActive} from '../../utilities/validation';
import {buy,sell} from '../../utilities/api';
import Loading from '../Loading/Loading';
import "bootstrap/dist/css/bootstrap.min.css";
function PopUp(props) {
  let initial = {noOfShares:"",companyName:"",sharePrice:""}
  const [data,setData] = useState({...initial})
  const [active,setActive] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [fee,setFee] = useState();
  const [message,setMessage] = useState('');
  //Handles Input Change
  const handleChange = (event) => {
    let obj = data;
    obj[event.target.name] = event.target.value;
    setData({...obj});
    setActive(checkActive(data,{}));
  }

  const BUY = (data) => {
    console.log(data);
    setError('');
    setLoading(true);
    buy(({...data,userId:parseInt(localStorage.getItem('id'))}),resp => {
      setLoading(false);
      console.log(resp);
      setFee(resp.feeLader);
      if(!resp.status){setMessage('Your order has been added to bse')}else{setMessage('Purchased');}
      props.refresh();
      // props.toggle();
    })
  }

const SELL = (data) => {
  console.log(data);
  setError('');
  setLoading(true);
  sell(({...data,userId:parseInt(localStorage.getItem('id'))}),resp => {
    setLoading(false);
    console.log(resp);
    setFee(resp.feeLader);
    if(!resp.status){setMessage('Your order has been added to nse')}else{setMessage('sold');}
    props.refresh();
    // props.toggle();
  })
}
  return (
    <Modal isOpen={props.open} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.data.orderType === "sell" ? "SELL" : "BUY"}</ModalHeader>
      
      {fee ? 
      <div className="login-form text-center">
        <div className="label pt-10">Your fee Lader is <b>Rs.{fee}</b></div>
        <div className="label pt-10">Status : <b>{message.toUpperCase()}</b></div>
        <div className="login-button pt-10" onClick={() => {props.toggle();setFee();setData({...initial})}}><button>ok</button></div>
      </div>
      :<div className="login-form">
                <div className="input">
                    <div className="label">Shares</div>
                    <input type="number" placeholder="Number Of Shares " value={data.noOfShares} name="noOfShares" onChange={(event) => handleChange(event)}/>
                </div>
                <div className="input">
                    <div className="label">Company Name</div>
                    <input type="input" placeholder="Company Name" value={data.companyName} name="companyName" onChange={(event) => handleChange(event)}/>
                </div>
                <div className="input">
                    <div className="label">Share Price</div>
                    <input type="number" placeholder="Share Price" value={data.sharePrice} name="sharePrice" onChange={(event) => handleChange(event)}/>
                </div>
                {loading ? <Loading/>:
                <div className={active ? "login-button" : "login-button login-disable"} onClick={() => props.data.orderType === "sell" ? SELL(data) : BUY(data)}>
                    <button>{props.data.orderType === "sell" ? "SELL" : "BUY"} <IoMdLogIn/></button>
                </div>}
                <div className="error">{error}</div>
            </div>}
      <ModalBody />
    </Modal>
  );
}

export default PopUp;
