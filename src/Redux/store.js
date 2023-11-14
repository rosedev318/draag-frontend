import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from './Reducers/AuthReducer';
import AgencyReducer from './Reducers/AgencyReducer';
import JobsReducer from './Reducers/JobsReducer';
import NanniesReducer from './Reducers/NanniesReducer';
import AnalyticsReducer from './Reducers/AnalyticsReducer';
import CategoryReducer from './Reducers/CategoryReducer';
import CalenderReducer from './Reducers/CalenderReducer';
import NotificationReducer from './Reducers/NotificationReducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Agency: AgencyReducer,
  Jobs: JobsReducer,
  Nannies: NanniesReducer,
  Analytics: AnalyticsReducer,
  Category: CategoryReducer,
  Calender: CalenderReducer,
  Notification: NotificationReducer
});

const initialState = {};

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

store.dispatch({ type: 'INIT' });

export default store;
