import React, { useEffect } from 'react';
import './Home.scss';
import About from './About/About';
import Contact from './Contact/Contact';
import Developers from './Developers/Developers';
const Home = () => {
    useEffect(()=>{
        setTimeout(() => window.scrollTo(0,0),300);
    },[])
    return (
        <div className="home">
          
          
           <About/>
           <Contact/>
           <Developers/>
        </div>
    );
};

export default Home;