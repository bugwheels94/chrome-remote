import { connect } from "react-redux";
import React from "react";
import { goForward, goBackward } from "../store/tabs/slice";

import { Row, Col, Button } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
		id: state.tabs.selectedEntityId,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		goForward: (v) => dispatch(goForward(v)),
		goBackward: (v) => dispatch(goBackward(v)),
	};
}

const Home = ({ id, goForward, goBackward }) => {
	const [socket] = Socket.useContainer();
	return (
		<>
			<Col span={4}>
				<Button
					size="large"
					onClick={() => {
						goBackward({ socket, id });
					}}
					shape="circle"
					icon={<ArrowLeftOutlined />}
				/>
			</Col>
			<Col span={4}>
				<Button
					size="large"
					onClick={() => {
						goForward({ socket, id });
					}}
					shape="circle"
					icon={<ArrowRightOutlined />}
				/>
			</Col>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
