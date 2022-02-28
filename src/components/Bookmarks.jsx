import { connect } from "react-redux";
import React from "react";
import { selectors } from "../store/bookmarks/slice";
import { List } from "antd";
import Bookmark from "./Bookmark.jsx";
function mapStateToProps(state) {
	return {
		bookmarks: selectors.selectAll(state),
	};
}
function mapDispatchToProps(dispatch) {
	return {};
}

const Home = ({ bookmarks }) => (
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
		dataSource={bookmarks}
		size="small"
		renderItem={(bookmarks) => <Bookmark {...bookmarks} />}
	/>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
