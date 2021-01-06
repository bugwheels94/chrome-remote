import { connect } from "react-redux";
import React from "react";
import { readTabs, selectors, removeTab } from "../store/tabs/slice";
import { Row, Col, List, Avatar } from "antd";
import Tab from "./Tab.jsx";
function mapStateToProps(state) {
	return {
		tabs: selectors.selectAll(state),
	};
}
function mapDispatchToProps(dispatch) {
	return {};
}

const Home = ({ tabs }) => (
	<List
		grid={{
			xs: 1,
			sm: 2,
			md: 3,
			lg: 4,
			xl: 8,
			xxl: 3,
		}}
		itemLayout="horizontal"
		dataSource={tabs}
		size="small"
		renderItem={(tab) => <Tab {...tab} />}
	/>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
