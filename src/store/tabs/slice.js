import createAsyncThunkPlus from "create-async-thunk-plus";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
const entityAdapter = createEntityAdapter({
	selectId: (entity) => entity.id,
});

export const createTab = createAsyncThunkPlus(
	"tabs/create",
	({ socket, ...options }) => socket.emitPromise("createTab", options),
	{
		entityAdapter,
		CRUDMode: "create",
	}
);

export const readTabs = createAsyncThunkPlus(
	"teams/readAll",
	({ socket, ...options }) => socket.emitPromise("readTabs", options),
	{
		entityAdapter,
		CRUDMode: "readAll",
	}
);

export const readTab = createAsyncThunkPlus(
	"tabss/readOne",
	({ socket, ...options }) => socket.emitPromise("readTab", options),
	{
		entityAdapter,
		CRUDMode: "readOne",
	}
);

export const updateTab = createAsyncThunkPlus(
	"teams/update",
	({ socket, id, windowId, ...options }) =>
		socket.emitPromise("updateTab", { id, windowId }, options),
	{
		entityAdapter,
		CRUDMode: "update",
	}
);

export const removeTab = createAsyncThunkPlus(
	"tabs/remove",
	({ socket, ...options }) => {
		return socket.emitPromise("removeTab", options);
	},
	{
		entityAdapter,
		CRUDMode: "remove",
	}
);
export const searchInTab = createAsyncThunkPlus(
	"tabs/searchInTab",
	({ socket, ...options }) => {
		return socket.emitPromise("searchInTab", options);
	},
);
export const reloadTab = createAsyncThunkPlus(
	"tabs/reloadTab",
	({ socket, ...options }) => {
		return socket.emitPromise("reloadTab", options);
	},
);
export const goBackward = createAsyncThunkPlus(
	"tabs/goback",
	({ socket, ...options }) => {
		return socket.emitPromise("navigateTab", { ...options, direction: 'backward' });
	},
);
export const goForward = createAsyncThunkPlus(
	"tabs/goforward",
	({ socket, ...options }) => {
		return socket.emitPromise("navigateTab", { ...options, direction: 'forward' });
	},
);
export const zoomIn = createAsyncThunkPlus(
	"tabs/zoomIn",
	({ socket, ...options }) => {
		return socket.emitPromise("zoom", { ...options, factor: 'in' });
	},
);
export const zoomOut = createAsyncThunkPlus(
	"tabs/zoomOut",
	({ socket, ...options }) => {
		return socket.emitPromise("zoom", { ...options, factor: 'out' });
	},
);

const slice = createSlice({
	name: "tabs",
	initialState: entityAdapter.getInitialState(),
	reducers: {
		setActive(state, { payload: { id } }) {
			state.selectedEntityId = id;
		},
	},
	extraReducers: {
		...createTab.reducers,
		...readTabs.reducers,
		...readTab.reducers,
		...updateTab.reducers,
		...removeTab.reducers,
		...searchInTab.reducers,
		...reloadTab.reducers
	},
});
export const { setActive } = slice.actions;
export const selectors = entityAdapter.getSelectors((state) => {
	return state.tabs
});
export default slice.reducer;
