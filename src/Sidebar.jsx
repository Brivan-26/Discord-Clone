import React from 'react';
import './sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Channel from './Channel.jsx';
import {useSelector} from 'react-redux';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import InfoIcon from '@material-ui/icons/Info';
import {Avatar} from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import {selectUser} from './features/userSlice';
import db, {auth} from './firebase';
const Sidebar = () => {
	const user = useSelector(selectUser);
	const [channels, setChannels] = React.useState([]);

	React.useEffect(()=> {
		db.collection("channels").onSnapshot((snapshot)=>
			setChannels(
				snapshot.docs.map((doc) => ({
					id:doc.id,
					channel:doc.data()
				}))
		));
	},[]);

	const addChannel = () => {
		const channelName = prompt("Enter the channel name: ");
		if (channelName) {
			db.collection("channels").add({
				channelName: channelName,
			});
		}
	}
	console.log(channels);
	return <div className="sidebar">
		<div className="sidebar__header">
			<h3>Discord Clone</h3>
			<ExpandMoreIcon />
		</div>

		<div className="sidebar__channels">
			<div className="sidebar__channelHeader">
				<div className="sidebar__headerC">
					<ExpandMoreIcon />
					<h4>Text Channels</h4>
				</div>
				<AddIcon onClick={addChannel} className="sidebar__addChannel" />
			</div>

			<div className="sidebar__channelList">
				{channels.map(({id, channel}) => {
					return <Channel key={id} id={id} channelName={channel.channelName}/>
				})}
			</div>
		</div>

		<div className="sidebar__voice">
			<SignalCellularAltIcon className="sidebar__signal" fontSize="large"/>
			<div className="sidebar__voice__info">
				<h3>Voice connected</h3>
				<p>Stream</p>
			</div>
			<div className="sidebar__voiceIconsInfo">
				<CallIcon/>
				<InfoIcon/>
			</div>
		</div>

		<div className="sidebar__profile">
			<Avatar onClick={()=> auth.signOut()} src={user.photo}/>
			<div className="sidebar__profile__info">
				<h3>{user.displayName}</h3>
				<p>#{user.uid.substring(0,5)}</p>
			</div>
			<div className="sidebar__profile__icons">
				<MicIcon/>
				<HeadsetIcon/>
				<SettingsIcon/>
			</div>
		</div>
	</div>
}
export default Sidebar;