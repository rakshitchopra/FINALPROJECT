import React, { useState,useEffect } from 'react';
import './Header.scss';
import {FaBars,FaUserCircle} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';
import Login from './Login/Login';
import AddUser from '../AddUser';
import Change from './changePassword/Change';
const Header = () => {
    const [open,setOpen] = useState({login:false,register:false,change:false});
    const [login,setLogin] = useState(false);
    const [options,setOptions] = useState(false);
    let history = useHistory();

    //toggles between which view to be shown
    const toggle = (value) => setOpen({...open,[value]:!open[value]});

    //check pre-requisite before loading
    useEffect(()=>{
        localStorage.clear();
    },[])

    //toggle navbar for small devices
    const toggleNav = () => {
        let navbar = document.querySelector('.header-left');
        if(navbar.offsetHeight === 50){navbar.style.height = "auto";return;}
        navbar.style.height = "50px";
    }

    //Provides functionality to the link provided in navigation
    const goTo = async (val) => {
      await history.push('/');
      //  if(val !== 'banner'){toggleNav();}
        scrollToComponent(val);
    }

    //scrolls to selected component
    const scrollToComponent = (val) =>  window.scrollTo({ top: document.getElementById(val).offsetTop - 30, behavior: 'smooth'});
     
    
    //logs out the user
    const logout = () => {
        history.push('/');
        localStorage.clear();
        setLogin(false);
    }

    //toggles between options provided for logged in user
    const toggleOpacity = () =>  setOptions(!options);
    return (
        <>
        <div className="header">
            <div className="header-left">
                <div className="header-item title"><span className="sidebar" onClick={() => toggleNav()}><FaBars/></span> <span onClick={() => {goTo('banner')}}>STOCK EXCHANGE</span></div>
                {/* <div className="header-item" onClick={() => goTo('events')}>Events</div> */}
                <div className="header-item" onClick={() => goTo('about')}>About</div>
                <div className="header-item" onClick={() => goTo('contact')}>Contact</div>
                <div className="header-item" onClick={() => goTo('developers')}>Developers</div>
            </div>
            {login ? <div className="header-right" onMouseLeave={() => toggleOpacity()}>
                <div className="icon" onMouseEnter={() => toggleOpacity()} >{localStorage.getItem('name')} <FaUserCircle/></div>
                {options ? <div className="login-options">
                <div className="item" onClick={() => history.push('/stocks')}>DashBoard</div>
                <div className="item" onClick={() => toggle('change')}>Change Passsword</div>
                <div className="item" onClick={() => logout()}>logout</div>
                </div>:null}
                </div>:
            <div className="header-right" >
                <div className="btn-login login" onClick={() => {document.querySelector('.header-left').style.height = "50px";toggle('login')}}>login</div>
                <div className="btn-login signup" onClick={() => {document.querySelector('.header-left').style.height = "50px";toggle('register');}}>Sign Up</div>
            </div>}
            
        </div>
        <Login
        open={open.login}
        toggle={() => toggle('login')}
        success = {() => {setLogin(true);}}
        />
        <AddUser
        open={open.register}
        toggle={() => toggle('register')}/>
        <Change
        open = {open.change}
        toggle = {() => toggle('change')}
        />
        </>
    );
};

export default Header;