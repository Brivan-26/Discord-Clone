import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import Sidebar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import {selectUser, login, logout} from './features/userSlice';
import Login from './Login.jsx';
import {auth} from './firebase';
function App() {
  const dispatch = useDispatch() // to shot things to data layout
  const user = useSelector(selectUser);
  React.useEffect(()=> {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          email:authUser.email,
          displayName:authUser.displayName
        }));
      } else{
        dispatch(logout());
      }
    }) 
  },[dispatch])
  return (
    <div className="app">
      {
        user? (
            <>
              <Sidebar />
              <Chat />
            </>
          ): (
            <Login />
          )
      }
    </div>
  );
}

export default App;
