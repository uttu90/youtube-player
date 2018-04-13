import { combineReducers } from 'redux';
import pluginState from './plugin-states';

const dataReducer = combineReducers(pluginState);

export default dataReducer;
