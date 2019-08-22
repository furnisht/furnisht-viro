import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import {composeWithDevTools} from ‘redux-devtools-extension’
// import furniture from "./projects";
import { floorPlanReducer } from "./floorplan";
// import user from "./user";
// import projects from "./projects";

const reducer = floorPlanReducer;
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;
