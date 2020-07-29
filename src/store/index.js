import { createStore, combineReducers } from 'redux'
import bulbSwitchReducer from '../views/bulbSwitch/reducer'
import numberRollReducer from '../views/numberRoll/reducer'
import flowReducer from '../views/flow/reducer'

const reducer = combineReducers({
    bulbSwitch: bulbSwitchReducer,
    numberRoll: numberRollReducer,
    flow: flowReducer
})

const store = createStore(reducer)

export default store;
