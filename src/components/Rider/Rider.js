
import React from 'react';
import './Rider.css';
import { Link } from "react-router-dom";

const Rider = (props) => {
    const {riderName, riderImage} = props.rider;
    return (
       <Link to= "/destination"> 
           <div className="rider-container">
            <div className="rider-card">
            <img style={{width:'100%'}} src={riderImage} alt=""/>
            </div>
            <div>
               
                <h2>{riderName}</h2>
                
            </div>
            
        </div>
       </Link>
    );
};

export default Rider;