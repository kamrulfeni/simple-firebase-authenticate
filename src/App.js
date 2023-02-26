import './App.css';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({})
  const provider = new GoogleAuthProvider();

  const handleGoogleSingIn = () =>{
  signInWithPopup(auth, provider)
   .then (result => {
    const user = result.user;
    setUser(user);
    console.log(user);
   })
   .catch ( error =>{
    console.error('error: ', error);
   })
  }

  const handleSingOut =() =>{
      signOut(auth)
      .then( () => {
        setUser({});
      })
      .catch( () =>{
        setUser({})
      })
  }

  return (
    <div className="App">
       { user.email ?
         <button onClick={handleSingOut}> SingOut</button>
         :
        <button onClick={handleGoogleSingIn}>Google sing in </button>
       
       }
       { user.email &&
        <div>
        <h1>User name: {user.displayName}</h1>
        <p>Email address: {user.email}</p>
        <img src={user.photoURL} alt="" />
       </div>
       }
    </div>
  );
}

export default App;