import { connect } from "react-redux";
import React from "react";
import { createTab } from "../store/tabs/slice";

import { Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {};
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
			<PlusOutlined
				style={{ fontSize: 60 }}
				onClick={() => {
					create({ socket });
				}}
			/>
		</Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
