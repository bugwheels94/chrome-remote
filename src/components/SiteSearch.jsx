import React, { useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { useSwipeable } from "react-swipeable";
import { removeTab, updateTab, searchInTab } from "../store/tabs/slice";
import { connect } from "react-redux";
import { Socket } from "../services/sockets";
import { Input, AutoComplete } from "antd";

function mapStateToProps(state) {
	return {
		id: state.tabs.selectedEntityId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeTab: (v) => dispatch(removeTab(v)),
		updateTab: (v) => dispatch(updateTab(v)),
		searchInTab: (v) => dispatch(searchInTab(v)),
	};
}

const Home = ({id }) => {
	const [socket] = Socket.useContainer();

	const onSearch = (value) => {
		socket.emitPromise("searchSite", { id, value });
	};
	return (
		<Input.Search size="large" placeholder="Search App" enterButton onSearch={onSearch} />
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
