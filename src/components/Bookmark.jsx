import React, { useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import { useSwipeable } from "react-swipeable";
import { removeBookmark } from "../store/bookmarks/slice";
import { createTab } from "../store/tabs/slice";
import { connect } from "react-redux";
import { Socket } from "../services/sockets";

function mapStateToProps(state) {
	return {
		selectedEntityId: state.tabs.selectedEntityId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeBookmark: (v) => dispatch(removeBookmark(v)),
		createTab: (v) => dispatch(createTab(v)),
	};
}

const Home = ({
	title,
	id,
	removeBookmark,
	createTab,
	url
}) => {
	const [socket] = Socket.useContainer();
	const [distance, setDistance] = useState(0);
	const handlers = useSwipeable({
		onSwiped: ({ absX }) => {
			if (absX >= 50) {
				removeBookmark({ socket, id });
			}
			setDistance(0);
		},
		onSwiping: ({ deltaX }) => {
			setDistance(Math.min(50, deltaX));
		},
	});

	return (
		<div {...handlers}>
			<List.Item>
				<List.Item.Meta
					onClick={() => {
						createTab({ url, socket });
					}}
					style={{ transform: `translateX(${distance}px)` }}
					title={title}
				/>
			</List.Item>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
