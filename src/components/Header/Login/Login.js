import React, { useState } from 'react';
import {Modal,ModalBody,ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.scss';
import {getLogin} from '../../../utilities/api';
import {IoMdLogIn} from 'react-icons/io';
import {checkActive} from '../../../utilities/validation';
import Loading from '../../Loading/Loading';
import {useHistory} from 'react-router-dom';

const Login = (props) => {
    const [data,setData] = useState({userName:"",password:""})
    const [active,setActive] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    let history = useHistory();
    //Handles Input Change
    const handleChange = (event) => {
        let obj = data;
        obj[event.target.name] = event.target.value;
        setData({...obj});
        setActive(checkActive(data,{}));
    }

    //Handles login functionality
    const login = (data) => {
        console.log(data)
        setError('');
        setLoading(true);
        getLogin(data,(response) => {
            setLoading(false);
            console.log(response)
            if(!response.status){
                setError(response.message)
            }else{
                console.log(response);
                localStorage.setItem('id',response.userId);
                localStorage.setItem('name',response.userName);
                props.toggle();
                props.success();
                setData({userName:"",password:""});
                history.push('/stocks');
            }
        })
    }

    
    return (
        <div className="login-view">
             <Modal isOpen={props.open} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Login</ModalHeader>
        <ModalBody>
            <div className="login-form">
                <div className="input">
                    <div className="label">Username</div>
                    <input type="text" placeholder="Username" value={data.userName} name="userName" onChange={(event) => handleChange(event)}/>
                </div>
                <div className="input">
                    <div className="label">Password</div>
                    <input type="password" placeholder="Password" value={data.password} name="password" onChange={(event) => handleChange(event)}/>
                </div>
                {loading ? <Loading/>:
                <div className={active ? "login-button" : "login-button login-disable"} onClick={() => login(data)}>
                    <button>Login <IoMdLogIn/></button>
                </div>}
                <div className="error">{error}</div>
            </div>
        </ModalBody>
      </Modal>
            
        </div>
    );
};

export default Login;