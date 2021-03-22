import React, { useState } from 'react';

import fakeData from '../../fakeData.json';
import Rider from '../Rider/Rider';
import './Home.css';


const Home = () => {
    const [riders,setRiders] = useState(fakeData);
          
   
    return (
   
          <div className="riders-container">
             {
        riders.map(rider => <Rider key={rider.id} rider={rider} ></Rider> )
      }
        </div>
      
    );
};

export default Home;