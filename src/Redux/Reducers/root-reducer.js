import { combineReducers } from "redux";
import { taskReducers } from "./reducer";
export const rootReducer = combineReducers({
  tasks: taskReducers,
});
