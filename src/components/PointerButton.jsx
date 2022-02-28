import { connect } from "react-redux";
import React, { useState, useRef } from "react";
import { reloadTab } from "../store/tabs/slice";

import { Col } from "antd";
import { DragOutlined, CloseSquareFilled } from "@ant-design/icons";
import { Socket } from "../services/sockets";

import debounce from "lodash.throttle";
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

const Board = ({ showBoard, id }) => {
	const [socket] = Socket.useContainer();
	const coord = useRef(null);
	const coords = useRef([]);
	const event = useRef();
	const touchStart = (e) => {
		if (e.touches.length > 1) {
			event.current = "scroll";
		} else event.current = "moveMouse";
	};
	const sendMove = debounce((c) => {
		if (coord.current) socket.emitPromise(event.current, id, coords.current);
		coord.current = c;
		coords.current = [];
	}, 100);
	const touchMove = (e) => {
		const current = {
			x: e.touches[0].pageX,
			y: e.touches[0].pageY,
		};
		sendMove(current);
		coords.current.push({
			x: current.x - coord.current.x,
			y: current.y - coord.current.y,
		});
	};
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				background: "red",
				zIndex: 1,
				touchAction: "none",
			}}
			onTouchStart={touchStart}
			onTouchMove={touchMove}
			onClick={() => socket.emitPromise("click")}
		>
			<CloseSquareFilled
				onClick={(e) => {
					showBoard(false);
					e.stopPropagation();
				}}
				size="large"
				style={{ position: "fixed", top: 0, right: 0, fontSize: 80 }}
			/>
		</div>
	);
};
const Home = ({ id }) => {
	const [isBoardVisible, showBoard] = useState(false);
	return (
		<Col span={4}>
			<DragOutlined style={{ fontSize: 60 }} onClick={() => showBoard(true)} />
			{isBoardVisible && <Board showBoard={showBoard} id={id} />}
		</Col>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
