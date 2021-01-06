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
		tab: selectors.selectById(state, state.tabs.selectedEntityId)
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
	if (!tab) return null
	return (
		<>
			<Col span={4}>
				<Button
					size="large"
					onClick={() => {
						playVideo({ socket, id });
					}}
					shape="circle"
					icon={<PlayCircleOutlined />}
				/>
			</Col>
			<Col span={4}>
				<Button
					size="large"
					onClick={() => {
						fullscreenVideo({ socket, id });
					}}
					shape="circle"
					icon={<FullscreenOutlined />}
				/>
			</Col>
			<Col span={4}>
				<Button
					size="large"
					danger={tab.mutedInfo.muted}
					onClick={() => {
						muteTab({ socket, id, muted: !tab.mutedInfo.muted  });
					}}
					shape="circle"
					icon={<SoundOutlined />}
				/>
			</Col>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
