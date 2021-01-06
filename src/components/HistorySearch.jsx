import React, { useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { useSwipeable } from "react-swipeable";
import { removeTab, updateTab, searchInTab } from "../store/tabs/slice";
import { connect } from "react-redux";
import { Socket } from "../services/sockets";
import { Input, AutoComplete } from "antd";

function mapStateToProps(state) {
	return {
		selectedEntityId: state.tabs.selectedEntityId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeTab: (v) => dispatch(removeTab(v)),
		updateTab: (v) => dispatch(updateTab(v)),
		searchInTab: (v) => dispatch(searchInTab(v)),
	};
}

const Home = ({ updateTab, searchInTab, selectedEntityId }) => {
	const [options, setOptions] = useState([]);
	const [socket] = Socket.useContainer();
	const [value, setValue] = useState("");

	const handleSearch = async (value) => {
		let options = [];
		if (value) {
			options = await socket.emitPromise("readHistory", value);
		} else {
			options = [];
		}
		setOptions(options);
	};
	const onBlur = (data) => {};
	const onChange = (data) => {
		setValue(data);
	};
	const onSelectHistoryItem = (value) => {
		updateTab({ socket, id: selectedEntityId, url: value });
		setValue("");
	};
	const onCustomSearch = (value) => {
		searchInTab({ socket, id: selectedEntityId, value });
		setValue("");
	};
	return (
		<AutoComplete
			options={options}
			onSelect={onSelectHistoryItem}
			onSearch={handleSearch}
			onChange={onChange}
			onBlur={onBlur}
			value={value}
      style={{ display: "block" }}
		>
			<Input.Search size="large" placeholder="input here" enterButton onSearch={onCustomSearch} />
		</AutoComplete>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
