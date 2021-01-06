import { connect } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import { reloadTab } from "../store/tabs/slice";

import { Row, Col, Button } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { Socket } from "../services/sockets";
import { useSwipeable } from "react-swipeable";

import debounce from "lodash.debounce";
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

const Home = ({ id }) => {
	const [socket] = Socket.useContainer();
	const timeoutId = useRef();
	const handlers = useSwipeable({
		onSwiped: ({  }) => {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		},
		onSwiping: ({ deltaX, deltaY }) => {
			const delta = { deltaX, deltaY, id }
			if (timeoutId.current) return;
			timeoutId.current = setInterval(() => {
				socket.emitPromise("scrollTab", delta);
			}, 100);
		},
	});

	return (
		<Col span={4}>
			<div {...handlers}>
				<Button size="large" shape="circle" icon={<DragOutlined />} />
			</div>
		</Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
