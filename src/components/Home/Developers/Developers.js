import React, { useRef,useEffect} from 'react';
import './Developers.scss';
import {FaGithubSquare,FaPhone,FaFacebookSquare,FaLinkedin,FaSnapchatSquare,FaInstagram,FaTwitterSquare} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {TimelineLite,Power2} from 'gsap';

const devs = [
    {
        name:"Rakshit Chopra",
        image:"https://media-exp1.licdn.com/dms/image/C5103AQFs-6c1MMxAOw/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=iTUQ1mRzMQzsMGjQzeW5uMeZrDx2gdbSwISRnZ6HmRw",
        contact : {
            linkedin:"https://www.linkedin.com/in/rakshittchopraa/",
            github : "https://github.com/rakshitchopra/",
            email : "rakshitchopra1717@gmail.com"
        }

    },
    {
        name:"Piyush kamal Anand",
        image:"https://media-exp1.licdn.com/dms/image/C5603AQFs7pqbKGXlWA/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=V3AvhRHZSi2EFrwOukTkvP6DO0nFSR4-PmZyMul2vdg",
        contact : {
            linkedin:"https://www.linkedin.com/in/piyush-kamal-anand-6b623014a/",
            github : "#",
            email : "#"
        }
    },
    {
        name:"kaushik chowdary",
        image:"https://media-exp1.licdn.com/dms/image/C5603AQESCWGm97-WDw/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=aKxETENGv6KewMTNfSNf1ZbA39g42f4jNlyigCesPVI",
        contact : {
            linkedin:"https://www.linkedin.com/in/kaushik-chowdary-a4572a184/",
            github : "#",
            email : "#"
        }
    },
    {
        name:"Rubini Madhasen",
        image:"https://media-exp1.licdn.com/dms/image/C5603AQGuDhR50G4SHw/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=BtvzeFYU3Vm5CwJWDO6oJ8s8uskzv0I1xJM6xlXK3o0",
        contact : {
            linkedin:"https://www.linkedin.com/in/rubini-madhasen/",
            github : "#",
            email : "#"
        }
    },

]

const Developers = () => {
    const devRef = useRef({tile:[]});
    let timeline = new TimelineLite();
    useEffect(()=>{    
         let observer = new IntersectionObserver(async (obj)=>{
            if(obj[0].intersectionRatio > 0.002){

                await animation();
                observer.unobserve(document.querySelector('.developers'));
            }
                   
        });
        observer.observe(document.querySelector('.developers'));
        
    },[])

    const animation = () => {
        timeline.to(document.querySelector('.dev-container'),0.2,{opacity:1,ease:Power2.easeInOut})
                .staggerFrom(devRef.current.tile,0.5,{y:-100,x:-100,opacity:0,ease:Power2.easeInOut},0.2)
        
    }
    const icon = (key) => {
        switch(key.toUpperCase()){
            case 'EMAIL' : return <MdEmail/>
            case 'FACEBOOK': return <FaFacebookSquare/>
            case 'TWITTER' : return <FaTwitterSquare/>
            case 'LINKEDIN' : return <FaLinkedin/>
            case 'SNAPCHAT' : return <FaSnapchatSquare/>
            case 'INSTAGRAM' : return <FaInstagram/>
            case 'GITHUB' : return <FaGithubSquare/>
            case 'PHONE' : return <FaPhone/>
            default : return 'none'; 
        }

    }
    return (
        <div className="developers" id="developers">
            <div className="heading">Developers</div>
            <div className="dev-container">
            {devs.map((dev,index) => (
                <div className="dev-tile" key={"dev"+index} ref={el => devRef.current.tile[index] = el}>
                    <img className="image" src={dev.image} alt="profile"/>
                    <div className="name">{dev.name}</div>
                    <div className="social">
                        {Object.keys(dev.contact).map(social => (<div className="tile" key={"dev-social"+social} onClick={() => window.open(social === 'email'? "mailto:"+dev.contact[social]:dev.contact[social])}>{icon(social)}</div>))}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Developers;