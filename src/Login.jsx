import React from 'react';
import './login.css';
import Button from '@material-ui/core/Button';
import logo from './logo.png';
import {auth, provider} from './firebase';
import { withStyles } from '@material-ui/core/styles';

const Login = () => {
	const signIn = () => {
		//firebase magic...
		auth.signInWithPopup(provider).catch(error => alert(error.message));
		}
	return <div className="login">
		<div className="login__logo">
			<img src={logo} alt="discord_logo" />
		</div>
		<Button className="btn" onClick={signIn} variant="contained" color="primary" disableElevation>Sign in</Button>
	</div>

}

export default Login;