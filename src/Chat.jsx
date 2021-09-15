import React from 'react';
import './chat.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message.jsx';
import {useSelector} from 'react-redux';
import {selectUser} from './features/userSlice';
import {selectchannelId, selectchannelName} from './features/appSlice';
import db from './firebase';
import firebase from 'firebase';
const Chat = () => {
	const user = useSelector(selectUser);
	const channelId = useSelector(selectchannelId);
	const channelName = useSelector(selectchannelName);
	const [input, setInput] = React.useState("");
	const [messages, setMessages] = React.useState([]);
	React.useEffect(()=>{
		if(channelId) {
			db.collection("channels")
			.doc(channelId)
			.collection("messages")
			.orderBy("timestamp","desc")
			.onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));
		}
	},[channelId]);
	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("channels").doc(channelId).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message:input,
			user:user,
		});
		setInput("");
	}
	return <div className="chat">
		<div className="chat__header">
			<div className="chat__header__left">
				<h3><span className="chat__header__hash">#</span>{channelName}</h3>
			</div>

			<div className="chat__header__right">
				<NotificationsIcon />
				<EditLocationIcon />
				<PeopleIcon />
				<div className="chat__header__search">
					<input placeholder="search" />
					<SearchIcon />
				</div>
				<SendIcon />
				<HelpIcon />
			</div>
		</div>

		<div className="chat_messages">
			{messages.map((message) => {
				return <Message user={message.user} message={message.message} timestamp={message.timestamp}/>
			})}
		</div>

		<div className="chat__input">
			<AddCircleIcon font="large" />
			<form>	
				<input value={input}
					onChange={(e)=> setInput(e.target.value)}
					disabled={!channelId}
					placeholder="#Message user"
				/>
				<button onClick={sendMessage} disabled={!channelId} type="submit">Send message</button>
			</form>
			<CardGiftcardIcon />
			<GifIcon />
			<EmojiEmotionsIcon />
		</div>
	</div>
}

export default Chat;