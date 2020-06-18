import React,{useEffect} from 'react';
import './Contact.scss';
import {TimelineLite,Power2} from 'gsap';
import ContactForm from './ContactForm/ContactForm';
import Social from './Social/Social';
const Contact = () => {
    let timeline = new TimelineLite();
    useEffect(()=>{
         let observer = new IntersectionObserver(async (obj)=>{
            if(obj[0].intersectionRatio > 0){
                await animation();
                observer.unobserve(document.querySelector('.contact'));
            }   
        });
        observer.observe(document.querySelector('.contact'));
        
    },[])

    const animation = () => {
        timeline.to(document.querySelector('.contact'),0.2,{opacity:1,ease:Power2.easeInOut})
                .from(document.querySelector('.form'),1.5,{y:-100,opacity:0,ease:Power2.easeInOut})
                .from(document.querySelector('.social'),1,{y:-100,opacity:0,ease:Power2.easeInOut})
        
    }
    

    
    return (
        <div className="contact" id="contact">
            <div className="heading">Contact</div>
            <div className="container">
                <ContactForm/>
                <Social/>
            </div>
            
        </div>
    );
};

export default Contact;