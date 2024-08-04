// src/reducers/index.js
import { combineReducers } from "redux";
// Import your reducers here
import someReducer from "./someReducer";

const rootReducer = combineReducers({
  someState: someReducer,
});

export default rootReducer;
