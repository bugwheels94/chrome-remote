var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const tvNamespace = io.of("/tv");

const remoteNamespace = io.of("/remote");

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/../public/index.html");
});
let tvSocket;
tvNamespace.on("connection", (socket) => {
	tvSocket = socket;

	// Broadcast to all remotes to get the state right
	socket.on("tvState", (tabs) => {
		remoteNamespace.emit("tvState", tabs);
  });
	socket.on("bookmarks", (tabs) => {
		remoteNamespace.emit("bookmarks", tabs);
	});
  
	socket.on("updatedTab", (tab) => {
		remoteNamespace.emit("updatedTab", tab);
	});
	socket.on("activatedTab", (tab) => {
		console.log("Activated Tab on TV");
		remoteNamespace.emit("activatedTab", tab);
	});
	socket.on("createdTab", (tab) => {
		console.log("Tab Created");
		remoteNamespace.emit("createdTab", tab);
	});
	socket.on("removedTab", (tab) => {
		remoteNamespace.emit("removedTab", tab);
	});
	socket.on("createdBookmark", (bookmark) => {
		console.log("Bookmark Created", bookmark);
		remoteNamespace.emit("createdBookmark", bookmark);
	});
	socket.on("removedBookmark", (bookmark) => {
		console.log("Bookmark Removed");
		remoteNamespace.emit("removedBookmark", bookmark);
	});

	console.log("a TV connected");
	// setTimeout(() => {
	//   socket.emit('createTab', { url: 'google' }, res => {
	//     console.log(res)
	//   })
	// }, 1000);
});

remoteNamespace.on("connection", async (socket) => {
	// Request TV state to get it on new remote
	if (tvSocket) {
		console.log("Requesting TV State for Remote");
		tvSocket.emit("readTvState", (tabs) => {
			socket.emit("tvState", tabs);
		});
		tvSocket.emit("readBookmarks", (bookmarks) => {
			socket.emit("bookmarks", bookmarks);
    });
	}

	socket.on("createTab", (requestedTab, callback) => {
		console.log(" Create Tab received on server");
		if (!tvSocket) return;
		tvSocket.emit("createTab", requestedTab, (createdTab) => {
			callback(createdTab);
		});
	});
	socket.on("updateTab", (tab, update, callback) => {
		console.log(" Update Tab received on server");
		if (!tvSocket) return;
		tvSocket.emit("updateTab", tab, update, (updatedTab) => {
			callback(updatedTab);
		});
	});
	socket.on("removeTab", (tab, callback) => {
		console.log("Remove Tab received on server");
		if (!tvSocket) return;
		tvSocket.emit("removeTab", tab, () => {
			callback(tab);
		});
	});
	socket.on("readHistory", (search, callback) => {
		console.log("Read History received on server");
		if (!tvSocket) return;
		tvSocket.emit("readHistory", search, (searchResults) => {
			callback(searchResults);
		});
	});

	socket.on("searchInTab", (tab, callback) => {
		console.log("Search Custom received on server");
		if (!tvSocket) return;
		tvSocket.emit("searchInTab", tab, (searchResults) => {
			callback(searchResults);
		});
	});
	socket.on("navigateTab", (tab, callback) => {
		console.log("Navigate received on server");
		if (!tvSocket) return;
		tvSocket.emit("navigateTab", tab, () => {
			callback();
		});
	});
	socket.on("reloadTab", (tab, callback) => {
		console.log("Reload received on server");
		if (!tvSocket) return;
		tvSocket.emit("reloadTab", tab, () => {
			callback();
		});
	});
	socket.on("scrollTab", (info, callback) => {
		if (!tvSocket) return;
		console.log("Scroll Received")
		tvSocket.emit("scrollTab", info, callback);
  });
	socket.on("zoom", (tab, callback) => {
		console.log("Zoom received on server");
		if (!tvSocket) return;
		tvSocket.emit("zoom", tab, () => {
			callback();
		});
	});
	socket.on("createBookmark", (bookmark, callback) => {
		if (!tvSocket) return;
		tvSocket.emit("createBookmark", bookmark, callback);
  });
	socket.on("removeBookmark", (bookmark, callback) => {
		if (!tvSocket) return;
		tvSocket.emit("removeBookmark", bookmark, callback);
  });
	socket.on("playVideo", (tab, callback) => {
		if (!tvSocket) return;
		console.log("Play Video Received")
		tvSocket.emit("playVideo", tab, callback);
  });
	socket.on("fullscreenVideo", (tab, callback) => {
		if (!tvSocket) return;
		console.log("Full screen Received")
		tvSocket.emit("fullscreenVideo", tab, callback);
  });
	
	console.log("a remote connected");
	// setTimeout(() => {
	//   socket.emit('createTab', { url: 'google' }, res => {
	//     console.log(res)
	//   })
	// }, 1000);
});

http.listen(3001, () => {
	console.log("listening on *:3001");
});
