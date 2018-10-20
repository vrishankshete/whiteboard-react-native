import {combineReducers} from "redux";
import homeReducer from "../components/Home/reducer";
import sidebarReducer from "../components/Sidebar/reducer";

export default combineReducers({
    home: homeReducer,
    sidebar: sidebarReducer
});