import { combineReducers } from 'redux';

import authReducer from "./auth.reducer";
import homeReducer from "./home.reducer";
import profileReducer from "./profile.reducer";

export const reducers = combineReducers({ authReducer, homeReducer, profileReducer });
