import { combineReducers } from 'redux';
import componentReducer from './components';
import playerReducer from './player';
import dataReducer from './data';

const mainReducer = combineReducers({
  player: playerReducer,
  components: componentReducer,
  data: dataReducer
})

export default mainReducer;