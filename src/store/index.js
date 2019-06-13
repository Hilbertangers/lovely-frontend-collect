import { createStore, combineReducers } from 'redux'
import bulbSwitchReducer from '../views/bulbSwitch/reducer'
import numberRollReducer from '../views/numberRoll/reducer'

const reducer = combineReducers({
    bulbSwitch: bulbSwitchReducer,
    numberRoll: numberRollReducer
})

const store = createStore(reducer)

export default store;
