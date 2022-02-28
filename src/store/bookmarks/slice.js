import createAsyncThunkPlus from "../../thunkPlus";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
const entityAdapter = createEntityAdapter({
	selectId: (entity) => entity.id,
});

export const createBookmark = createAsyncThunkPlus(
	"bookmarks/create",
	({ socket, ...options }) => socket.emitPromise("createBookmark", options),
	{
		entityAdapter,
		CRUDMode: "create",
	}
);

export const readBookmarks = createAsyncThunkPlus(
	"bookmarks/readAll",
	({ socket, ...options }) => socket.emitPromise("readBookmarks", options),
	{
		entityAdapter,
		CRUDMode: "readAll",
	}
);

export const removeBookmark = createAsyncThunkPlus(
	"bookmarks/remove",
	({ socket, ...options }) => {
		return socket.emitPromise("removeBookmark", options);
	},
	{
		entityAdapter,
		CRUDMode: "remove",
	}
);

const slice = createSlice({
	name: "bookmarks",
	initialState: entityAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		...createBookmark.reducers,
		...readBookmarks.reducers,
		...removeBookmark.reducers,
	},
});
export const selectors = entityAdapter.getSelectors((state) => state.bookmarks);
export default slice.reducer;
