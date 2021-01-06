import { connect } from "react-redux";
import React from "react";
import { createTab } from "../store/tabs/slice";

import { Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
	};
}
function mapDispatchToProps(dispatch) {
	return {
		create: (v) => dispatch(createTab(v)),
	};
}

const Home = ({ create }) => {
	const [socket] = Socket.useContainer();
	return (
    <Col span={4}>
		<Button
      size="large"
			onClick={() => {
				create({ socket });
			}}
			shape="circle"
			icon={<PlusOutlined />}
		/>
    </Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
