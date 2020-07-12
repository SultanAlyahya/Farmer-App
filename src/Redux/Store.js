import {createStore, combineReducers} from 'redux'
import itemReducer from './Reducer'

const rootReducer = combineReducers({
    itemReducer:itemReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;