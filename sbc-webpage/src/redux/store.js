import {createStore,combineReducers} from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'
import menusReducer from './menuToggle'

const rootReducer = combineReducers({
    authReducer: authReducer,
    cartReducer: cartReducer,
    menusReducer: menusReducer
})

export default createStore(rootReducer)

