import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './modal.scss';
import Loading from './Loading/Loading';
import {createAdmin} from '../utilities/api';
const AddUser = (props) => {
    const [data,setData] = useState({userName:"",password:"",email:""});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    
    const handleChange = (event) => {
        let obj = data;
        obj[event.target.name] = event.target.value;
        setData({...obj});
    }

    const add = () => {
        setError('');
        setLoading(true);
        createAdmin(data,(resp) => {
            setLoading(false);
            if(!resp.status){setError('Registered Sucessfully');
            setData({userName:"",password:"",email:""});
            setError('');
            props.toggle();
            props.add(data.userName);
        }
        else{
            setError(resp.message)
        }
    });
    }
    
    return ( 
        <Modal isOpen={props.open} toggle={props.toggle} >
        <ModalHeader toggle={props.toggle}>Add User</ModalHeader>
        <ModalBody>
            <div className="add-event">
                <div className="heading">Enter Username</div>
                <input placeholder="Enter Username..." value={data.userName} name="userName" onChange={(event) => handleChange(event)}/>
                <div className="heading">Enter Password</div>
                <input placeholder="Enter Password..." type="password" value={data.password} name="password" onChange={(event) => handleChange(event)}/>
                <div className="heading">Email</div>
                <input placeholder="Email..." value={data.email} name="email" onChange={(event) => handleChange(event)}/>
            </div>
            <div className="error">{error}</div>
        </ModalBody>
        <ModalFooter>
        {loading ? <Loading/>:<>
          <Button color="primary" className={data.userName.length === 0 || data.password.length === 0 || data.email.length === 0? "disable":""} onClick={() => add()}>OK</Button>{' '}
          <Button color="danger" onClick={() => {setError('');setData({userName:"",password:"",email:""});props.toggle();}}>Cancel</Button></>}
        
        </ModalFooter>
      </Modal>
    );
};

export default AddUser;