import { connect } from "react-redux";
import React from "react";
import { updateTab, selectors } from "../store/tabs/slice";
import { playVideo, fullscreenVideo } from "../store/videos/slice";

import { Row, Col, Button } from "antd";
import { SoundOutlined, FullscreenOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
		id: state.tabs.selectedEntityId,
		tab: selectors.selectById(state, state.tabs.selectedEntityId),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		playVideo: (v) => dispatch(playVideo(v)),
		fullscreenVideo: (v) => dispatch(fullscreenVideo(v)),
		muteTab: (v) => dispatch(updateTab(v)),
	};
}

const Home = ({ id, muteTab, tab, playVideo, fullscreenVideo }) => {
	const [socket] = Socket.useContainer();
	if (!tab) return null;
	return (
		<>
			<Col span={4}>
				<PlayCircleOutlined
					style={{ fontSize: 60 }}
					onClick={() => {
						playVideo({ socket, id });
					}}
				/>
			</Col>
			<Col span={4}>
				<FullscreenOutlined
					style={{ fontSize: 60 }}
					onClick={() => {
						fullscreenVideo({ socket, id });
					}}
				/>
			</Col>
			<Col span={4}>
				<SoundOutlined
					style={{ fontSize: 60 }}
					onClick={() => {
						muteTab({ socket, id, muted: !tab.mutedInfo.muted });
					}}
				/>
			</Col>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
