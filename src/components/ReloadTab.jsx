import { connect } from "react-redux";
import React from "react";
import { reloadTab } from "../store/tabs/slice";

import { Col } from "antd";
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
			<ReloadOutlined
				onClick={() => {
					reloadTab({ socket, id });
				}}
				style={{ fontSize: 60 }}
			/>
		</Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
