import React from 'react';
import {FaGithubSquare,FaPhone,FaFacebookSquare,FaLinkedin,FaSnapchatSquare,FaInstagram,FaTwitterSquare} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
const Social = () => {
    
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
    const social = {
        email:"https://www.gmail.com",
        facebook:"https://www.facebook.com",
        twitter:"https://www.twitter.com",
        snapchat:"https://www.snapchat.com",
        instagram:"https://www.instagram.com",
        linkedin:"https://www.linkedin.com",
    }

    return (
        <div className="social">
                    <div className="heading">Social</div>
                    <div className="tile-container">
                {Object.keys(social).map((soc,index) => {
                    return(<div  className="tile" key={soc} onClick={()=>window.open(social[soc])} >{icon(soc)}</div>)
                })}
                </div>
                </div>
    );
};

export default Social;