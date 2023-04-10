import { combineReducers } from 'redux';
import QuizReducer from '../src/redux/reducer';

const rootReducer = combineReducers({
  quiz: QuizReducer,
});

export default rootReducer;
