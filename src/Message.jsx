import React from 'react';
import {Avatar} from '@material-ui/core'
import './message.css';

const Message = ({user,message,timestamp}) => {
	return <div className="message">
		<Avatar src={user.photo}/>
		<div className="message__info">
			<h3>{user.displayName}<span className="message_timestamp">
				{new Date(timestamp?.toDate()).toUTCString()}
			</span></h3>
			<p>{message}</p>

		</div>
	</div>
}

export default Message;