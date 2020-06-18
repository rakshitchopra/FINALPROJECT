import React, { useState, useEffect } from 'react';
import{IoIosSend} from 'react-icons/io';
import {validate,checkActive} from '../../../../utilities/validation';

const ContactForm = () => {
    const [data,setData] = useState({name:"",email:"",message:""});
    const [error,setError] = useState({name:"",email:""});
    const [active,setActive] = useState(false);
    const [message,setMessage] = useState('');

    useEffect(()=>{
        let obj = {name:"",email:"",message:""}
        setData({...obj})
        setTimeout(()=>setMessage(''),2000);
    },[message])

    const changeHandler = (event) => {
        let obj = data;
        setError({...error,...validate(event)});
        obj[event.target.name] = event.target.value;
        setData({...obj});
        setActive(checkActive(data,error))
    }
    const send = (data) => {
        console.log(data)
    }
    return (
        <div className="form">
                    <div className="heading">
                        Reach Out to us
                    </div>
                    <div className="table-container">
                            <div className="label">Name</div>
                            <div className="input">
                                <input placeholder="Enter Name..." name="name"  value={data.name} onChange={(event)=>changeHandler(event)}/>
                                <div className='error'>{error.name}</div>
                                </div>
                            
                            <div className="label">Email</div>
                            <div className="input">
                                <input placeholder="Enter Email..." name="email" value={data.email} onChange={(event)=>changeHandler(event)}/>
                                <div className='error'>{error.email}</div>
                                </div>
                            
                            <div className="label">Message</div>
                            <div className="input"><textarea placeholder="Enter Message..." value={data.message} name="message"  onChange={(event)=>changeHandler(event)}></textarea></div>
                            
                    </div>
                    <div className={active ? "button":"button disabled"} onClick={()=>{ send(data);}}>
                    <button>Submit <IoIosSend/></button>
                    </div>
                        <div className="message">{message}</div>

                </div>
    );
};

export default ContactForm;