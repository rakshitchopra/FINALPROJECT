import React,{useState} from 'react';
import {Modal,ModalBody,ModalHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.scss';
import {IoMdLogIn} from 'react-icons/io';
import {checkActive} from '../../../utilities/validation';
import {update} from '../../../utilities/api';
import Loading from '../../Loading/Loading';

export default function Change(props) {
    const [data,setData] = useState({password:"",confirm_password:""})
    const [active,setActive] = useState(false);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    // let history = useHistory();

    //Handles Input Change
    const handleChange = (event) => {
        let obj = data;
        obj[event.target.name] = event.target.value;
        setData({...obj});
        setActive(checkActive(data,{}));
    }

    const change = (data) => {
        setError('');
        if(data.password !== data.confirm_password){setError("passowrds don't match");return;}
        setLoading(true);
        update({password:data.password,userId:parseInt(localStorage.getItem('id'))},resp => {
            console.log(resp);
            setLoading(false);
            props.toggle();
        })


    }
    
    return (
        <div className="login-view">
        <Modal isOpen={props.open} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Login</ModalHeader>
            <ModalBody>
                <div className="login-form">
                    <div className="input">
                        <div className="label">Enter New Password</div>
                        <input type="password" placeholder="New Password" value={data.password} name="password" onChange={(event) => handleChange(event)}/>
                    </div>
                    <div className="input">
                        <div className="label">Confirm Password</div>
                        <input type="password" placeholder="Confirm Password" value={data.confirm_password} name="confirm_password" onChange={(event) => handleChange(event)}/>
                    </div>
                    {loading ? <Loading/>:
                    <div className={active ? "login-button" : "login-button login-disable"} onClick={() => change(data)}>
                        <button>Change Password<IoMdLogIn/></button>
                    </div>}
                    <div className="error">{error}</div>
                </div>
            </ModalBody>
        </Modal>
   </div>
    )
}
