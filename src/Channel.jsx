import React from 'react';
import './channel.css';
import {useDispatch} from 'react-redux';
import {setchannelInfo} from './features/appSlice';
const Channel = ({id, channelName}) => {
	const dispatch = useDispatch();
	return <div className="sidebar__channel" onClick={() =>dispatch(setchannelInfo({
		channelId:id,
		channelName:channelName,
	}))}>
		<h4><span className="sidebar__hash">#</span>{channelName}</h4>
	</div>
}

export default Channel;