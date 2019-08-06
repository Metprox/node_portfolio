import thunk from 'redux-thunk';
import reducers from './store/reducers/index';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;

const middleware = [thunk];

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
