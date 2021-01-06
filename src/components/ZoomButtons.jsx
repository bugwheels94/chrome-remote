import { connect } from "react-redux";
import React from "react";
import { zoomOut, zoomIn } from "../store/tabs/slice";

import { Row, Col, Button } from "antd";
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
				<Button
					size="large"
					onClick={() => {
						zoomOut({ socket, id });
					}}
					shape="circle"
					icon={<ZoomOutOutlined />}
				/>
			</Col>
			<Col span={4}>
				<Button
					size="large"
					onClick={() => {
						zoomIn({ socket, id });
					}}
					shape="circle"
					icon={<ZoomInOutlined /> }
				/>
			</Col>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
