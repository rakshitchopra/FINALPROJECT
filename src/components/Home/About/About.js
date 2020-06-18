import React,{useRef,useEffect} from 'react';
import './About.scss';
import {IoIosCreate} from 'react-icons/io';
import {FaIdCardAlt} from 'react-icons/fa';
import {FiMonitor} from 'react-icons/fi';
import {TimelineLite,Power2} from 'gsap';
const About = () => {
    let timeline = new TimelineLite();
    let tileRef = useRef({tile:[]});
    let aboutCards = [
        {icon:'monitor',
        title :'Stock Exchange'},   
    ]

    //return icon for cards
    const icons = (value) => {
        switch(value){
            case 'register' : return <IoIosCreate/>
            case 'id' : return <FaIdCardAlt/>
            case 'monitor' : return <FiMonitor/>
            default : return null
        }

    }

    //attached IntersectionObserver for correct time to trigger animation
    useEffect(()=>{
         let observer = new IntersectionObserver(async (obj)=>{
            if(obj[0].intersectionRatio > 0.001){
               await animation();
                observer.unobserve(document.querySelector('.about'));
            }        
        });
        observer.observe(document.querySelector('.about'));  
    },[])


    //animation using GSAP
    const animation = () => {
        timeline.to(document.querySelector('.about'),0.2,{opacity:1,ease:Power2.easeInOut})
        .staggerFrom(tileRef.current['tile'],0.8,{y:-100,x:-100,opacity:0,ease:Power2.easeInOut},0.2) 
    }
    
    return (
        <div className="about" id="about">
            <div className="heading">About</div>
            <div className="sub-heading">WELCOME TO STOCK EXCHANE</div>
            <div className="container">
                {aboutCards.map((about,index) => (
                <div className="card" key={"card-"+index} ref={el => {tileRef.current.tile[index] = el}}>
                    <div className="icon">{icons(about.icon)}</div>
                    <div className="title">{about.title}</div>
                </div>))}
            </div>
            
        </div>
    );
};

export default About;