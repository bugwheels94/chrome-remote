// Completely unneccessary no need of redux
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import createAsyncThunkPlus from "../../thunkPlus";

const entityAdapter = createEntityAdapter({
	selectId: (entity) => entity.id,
});

export const playVideo = createAsyncThunkPlus("videos/create", ({ socket, ...options }) =>
	socket.emitPromise("playVideo", options)
);

export const fullscreenVideo = createAsyncThunkPlus("videos/fullscreen", ({ socket, ...options }) =>
	socket.emitPromise("fullscreenVideo", options)
);

const slice = createSlice({
	name: "videos",
	initialState: entityAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		...playVideo.reducers,
		...fullscreenVideo.reducers,
	},
});
export const { setActive } = slice.actions;
export const selectors = entityAdapter.getSelectors((state) => {
	return state.tabs;
});
export default slice.reducer;
