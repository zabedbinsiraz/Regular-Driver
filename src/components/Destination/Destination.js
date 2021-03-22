
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Destination.css';
import fakeData from '../../fakeData.json';
import { useParams } from 'react-router';


const Destination = () => {
   
  const {riderId} = useParams();
  console.log('riderid',riderId)
   const [riders,setRiders] = useState(fakeData);
   const [isSearch,setIsSearch] = useState(false);
   const [pick,setPick] = useState([]);
   
  

    const classes = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));

      const handlePick = (e) => {
       
        if(e.target.name==='from'){
          const newPick = [...pick,e.target.value];
          setPick(newPick); }

        if(e.target.name==='to'){
          const newPick = [...pick,e.target.value];
          setPick(newPick);
        } }
         
      

        
          
    return (
    
        <div className="destination-container">
      
      {
        isSearch ?  <div className="book-container">

        <div style={{height:'100px',width:'200px',backgroundColor:'tomato',padding:'10px'}}>
          <h3>{pick[0]}</h3>
          <div style={{height:'20px',borderLeft:'3px solid white',paddingLeft:'5px'}}></div>
          <h3>{pick[1]}</h3>
        </div>
        <div style={{height:'220px',width:'200px',backgroundColor:'green',padding:'10px'}}>
          {
             riders.map(rider => <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',padding:'10px',backgroundColor:'teal',margin:'5px'}}> 
               <img src={rider.riderImage} style={{height:'20px'}} alt=""/>
               <li>{rider.id}</li>
                <h3>${99}</h3>
               </div>)
               
           }
          
          
           
         
          
        </div>

      </div> :   <div className="form-container">
       <form className={classes.root} noValidate autoComplete="off">
     
     <TextField id="outlined-basic" name="from" onBlur={handlePick} label="From" variant="outlined" />
     <br/>
     <br/>
     <TextField id="outlined-basic" name="to" onBlur={handlePick} label="To" variant="outlined" />
     <br/>
     <br/>
     <TextField
       id="date" label="Date" type="date" defaultValue="2017-05-24" 
       className={classes.textField} InputLabelProps={{  shrink: true, }} />
     <Button onClick={()=>setIsSearch(true)} type="submit" fullWidth variant="contained" color="primary" > Search </Button>

   </form>
       </div>
      }
       <div className="map-container">
         
       
       </div>
     </div>
    
    );
};

export default Destination;