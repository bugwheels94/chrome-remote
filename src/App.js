import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import { useEffect } from "react";
import Tabs from "./components/Tabs.jsx";
import Bookmarks from "./components/Bookmarks.jsx";
import CreateTab from "./components/CreateTab";
import ReloadTab from "./components/ReloadTab";
import HistorySearch from "./components/HistorySearch";
import NavigationButtons from "./components/NavigationButtons";
import ZoomButtons from "./components/ZoomButtons";
import { useDispatch } from "react-redux";
import { Socket } from "./services/sockets";
import { Space, Row } from 'antd';
import { createTab, removeTab, updateTab, readTabs, setActive } from "./store/tabs/slice";
import { createBookmark, removeBookmark, readBookmarks } from "./store/bookmarks/slice";
import VideoPlayerButtons from "./components/VideoPlayerButtons";
import PointerButton from "./components/PointerButton";
import SiteSearch from "./components/SiteSearch";

const io = require("socket.io-client");


function App() {
	const dispatch = useDispatch();
	const [socket, setSocket] = Socket.useContainer();
	useEffect(() => {
		const newSocket = io("ws://192.168.29.68:3001/remote", {
			reconnectionDelayMax: 3000,
			transports: ["websocket"],
		});
		newSocket.emitPromise = function (event, ...args) {
			return new Promise((rs, rj) => {
				newSocket.emit(event, ...(args || []), (res) => {
					rs(res);
				});
			});
		};

		newSocket.on("connect", () => {
			setSocket(newSocket);
		});

		newSocket.on("error", (e) => console.log(e));
		newSocket.on("tvState", (tabs) => {
      const tab = tabs.filter(tab => tab.active === true)
      if (tab.length) {
        dispatch(setActive(tab[0]))
      }
			dispatch({
				...readTabs.fulfilled(),
				payload: {
					entities: tabs,
				},
			});
		});
		newSocket.on("createdTab", (tab) => {
			dispatch({
				...createTab.fulfilled(),
				payload: tab,
			});
		});
		newSocket.on("removedTab", (tab) => {
			dispatch({
				...removeTab.fulfilled(),
				meta: { arg: tab },
			});
		});
		newSocket.on("updatedTab", (tab) => {
			dispatch({
				...updateTab.fulfilled(),
				meta: {
					arg: {
						id: tab.id,
					},
				},
				payload: tab,
			});
		});
		newSocket.on("activatedTab", (tab) => {
			dispatch(setActive(tab));
		});
		newSocket.on("bookmarks", (bookmarks) => {
			dispatch({
				...readBookmarks.fulfilled(),
				payload: {
					entities: bookmarks,
				},
			});
		});
		newSocket.on("createdBookmark", (bookmark) => {
			dispatch({
				...createBookmark.fulfilled(),
				payload: bookmark,
			});
		});
		newSocket.on("removedBookmark", (bookmark) => {
			dispatch({
				...removeBookmark.fulfilled(),
				meta: { arg: bookmark },
			});
		});
    
	}, []);
	if (!socket) return null;
	return (
		<Space direction="vertical" size="large" style={{width: "100%"}}>
			<HistorySearch />
      <Row justify="center" align="middle">

  			<CreateTab />
        <NavigationButtons />
        <ZoomButtons />
        <ReloadTab />
        <VideoPlayerButtons /> 
        <PointerButton /> 
        <SiteSearch /> 

      </Row>
			<Tabs />
			<Bookmarks />
		</Space>
	);
}


export default App;
