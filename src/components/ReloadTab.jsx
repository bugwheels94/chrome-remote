import { connect } from "react-redux";
import React from "react";
import { reloadTab } from "../store/tabs/slice";

import { Row, Col, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
		id: state.tabs.selectedEntityId,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		reloadTab: (v) => dispatch(reloadTab(v)),
	};
}

const Home = ({ reloadTab, id }) => {
	const [socket] = Socket.useContainer();
	return (
    <Col span={4}>
		<Button
      size="large"
			onClick={() => {
				reloadTab({ socket, id });
			}}
			shape="circle"
			icon={<ReloadOutlined />}
		/>
    </Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
