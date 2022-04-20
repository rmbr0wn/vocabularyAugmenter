import { combineReducers } from 'redux';

import authReducer from "./auth.reducer";
import profileReducer from "./profile.reducer";

export const reducers = combineReducers({ authReducer, profileReducer });
