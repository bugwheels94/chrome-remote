import React, { useState } from "react";
import { List, Avatar } from "antd";
import { useSwipeable } from "react-swipeable";
import { removeTab, updateTab } from "../store/tabs/slice";
import { connect } from "react-redux";
import { Socket } from "../services/sockets";
import { createBookmark } from "../store/bookmarks/slice";

function mapStateToProps(state) {
	return {
		selectedEntityId: state.tabs.selectedEntityId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeTab: (v) => dispatch(removeTab(v)),
		updateTab: (v) => dispatch(updateTab(v)),
		createBookmark: (v) => dispatch(createBookmark(v)),
	};
}

const Home = ({
	favIconUrl,
	title,
	id,
	active,
	removeTab,
	updateTab,
	windowId,
	selectedEntityId,
	url,
	createBookmark,
}) => {
	const [socket] = Socket.useContainer();
	const [distance, setDistance] = useState(0);
	const handlers = useSwipeable({
		onSwiped: ({ absX, deltaX }) => {
			if (deltaX <= -50) {
				removeTab({ socket, id });
			} else if (deltaX >= 50) {
				createBookmark({ socket, url, title });
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
						updateTab({ id, socket, windowId, active: true });
					}}
					style={{ transform: `translateX(${distance}px)` }}
					avatar={<Avatar src={favIconUrl} />}
					title={title}
				/>
				{id === selectedEntityId && <hr />}
			</List.Item>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
