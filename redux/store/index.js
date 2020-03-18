import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
	const { createLogger } = require('redux-logger');
	const logger = createLogger({
		collapsed: true,
		duration: true
	});
	middleware.push(logger);
}

const configureStore = initialState => {
	const store = createStore(rootReducer, initialState, applyMiddleware(thunk, ...middleware));
	return store;
};

export default configureStore;
