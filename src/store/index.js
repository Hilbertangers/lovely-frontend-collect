import { createStore, combineReducers } from 'redux'
import bulbSwitchReducer from '../views/bulbSwitch/reducer'

const reducer = combineReducers({
    bulbSwitch: bulbSwitchReducer
})

const store = createStore(reducer)

export default store;
