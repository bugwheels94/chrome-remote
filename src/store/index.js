// import { createStore, applyMiddleware, combineReducers } from "redux";
// import thunkMiddleware from "redux-thunk";

// // REDUCERS
// import teams from "./store/teams";
// import projects from "./store/projects";
// // import recordings from './store/recordings';
// // import tracks from './store/tracks';
// // import funnels from './store/funnels';
// // import members from './store/teamMembers';

// export const reducer = combineReducers({
// 	teams,
// 	projects,
// 	// recordings,
// 	// tracks,
// 	// funnels,
// 	// members,
// });

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     if (state.count) nextState.count = state.count // preserve count value on client side navigation
//     return nextState
//   } else {
//     return combinedReducer(state, action)
//   }
// }

// export function initializeStore(initialState = {}) {
// 	return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
// }

import { configureStore } from "@reduxjs/toolkit";
import tabs from "./tabs/slice";
import bookmarks from "./bookmarks/slice";
import videos from "./videos/slice";
const store = configureStore({
		reducer: {
			tabs,
			bookmarks,
			videos
		}
	})

export default store
