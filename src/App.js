
import './App.css';
import background from './images/bg1.jpg';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRouter/PrivateRoute';


export const UserContext = createContext();


function App() {
   
    const [loggedInUser,setLoggedInUser] = useState({}); 
    const bgStyle = {
    backgroundImage:`url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:'100vh'
  }

  return (
      
    <div  style={bgStyle}>
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
        
          
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination">
           <Destination /> 
          </PrivateRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
     
    </Router>
    
    </UserContext.Provider>
    </div> 
  );
}

export default App;
