import { connect } from "react-redux";
import React from "react";
import { zoomOut, zoomIn } from "../store/tabs/slice";

import { Col } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
		id: state.tabs.selectedEntityId,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		zoomOut: (v) => dispatch(zoomOut(v)),
		zoomIn: (v) => dispatch(zoomIn(v)),
	};
}

const Home = ({ id, zoomIn, zoomOut }) => {
	const [socket] = Socket.useContainer();
	return (
		<>
			<Col span={4}>
				<ZoomOutOutlined
					onClick={() => {
						zoomOut({ socket, id });
					}}
					style={{ fontSize: 60 }}
				/>
			</Col>
			<Col span={4}>
				<ZoomInOutlined
					onClick={() => {
						zoomIn({ socket, id });
					}}
					style={{ fontSize: 60 }}
				/>
			</Col>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
