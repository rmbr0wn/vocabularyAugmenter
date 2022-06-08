import { combineReducers } from 'redux';

import authReducer from "./auth.reducer";
import profileReducer from "./profile.reducer";
import listsReducer from "./lists.reducer";

export const reducers = combineReducers({ authReducer, profileReducer, listsReducer });
