import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import './Login.css';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



const Login = () => {

  const [newUser,setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error : '',
    success : false
  });
      const [loggedInUser,setLoggedInUser] = useContext(UserContext);
      const history = useHistory();
      const location = useLocation();
      let {from} = location.state || {from: {pathname: "/"}};

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignin = () => {

    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        var user = result.user;
        const { displayName, email, photoURL } = user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        console.log(user)
        setUser(signedInUser);
        setLoggedInUser(signedInUser);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

      });
  }
  const handleSignOut = () => {
    firebase.auth().signOut().
      then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      }).catch((error) => {
       console.log(error)
      });
  }
 
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },

    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    button:{
      margin: theme.spacing(1, 0, 2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const handleInputField = (e) => {
    console.log(e.target.name, e.target.value)
    let isFormValid = true;

    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFormValid = e.target.value.length > 7 && /\d{1}/.test(e.target.value);

    }
    if (e.target.name === 'confirmPassword') {
      isFormValid = e.target.value.length > 7 && /\d{1}/.test(e.target.value);

    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }

  const handleSubmitUser = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo)
    history.replace(from);
  })
  .catch((error) => {
    const newUserInfo = {...user};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
  });
    }

    e.preventDefault();
  }
const updateUserName = name =>{
  const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
  
 
}).then( () => {
  console.log('username update successfully')
}).catch((error) => {
  console.log(error)
});
}




  return (
    <div className="logIn-container">
     
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Typography component="h3" variant="h5">
            {newUser?"Create an account":"Log In"}
        </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              {
                newUser && <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  autoFocus
                  onBlur={handleInputField}

                />
              </Grid>
              }

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="username or email"
                  name="email"
                  autoComplete="email"
                  onBlur={handleInputField}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onBlur={handleInputField}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onBlur={handleInputField}

                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmitUser}

            >
             {newUser? 'Sign Up' : 'Login' } 
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link  variant="body2">
                  {newUser?  "Already have an account?":"to create an account"}
                   <input onClick={()=>setNewUser(!newUser)} style={{border:'none',backgroundColor:'orange',padding:'5px', borderRadius:'5px', margin:'5px'}} 
                   type="button" value={newUser?'Login':'Sign up'}/>
              </Link>
              </Grid>
            </Grid>
          </form>
          {
            user.success ? <p style={{color:'green'}}>Your account {newUser? 'created':'logged in'} successfullly</p>
            : <p style={{color:'red'}}>{user.error}</p>
          }
         
          {
            user.isSignedIn ? <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleSignOut}
            >
              Sign Out
             </Button>

              : <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={handleGoogleSignin}
              >
                Sign in with Google
                        </Button>
          }
        </div>


      </Container>
      
    </div>

  );
};

export default Login;