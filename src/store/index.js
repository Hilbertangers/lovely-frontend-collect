import { createStore, combineReducers } from 'redux'
import bulbSwitchReducer from '../views/bulbSwitch/reducer'
import numberRollReducer from '../views/numberRoll/reducer'
import flowReducer from '../views/flow/reducer'
import apheliosReducer from '../views/aphelios/reducer'

const reducer = combineReducers({
    bulbSwitch: bulbSwitchReducer,
    numberRoll: numberRollReducer,
    flow: flowReducer,
    aphelios: apheliosReducer
})

const store = createStore(reducer)

export default store;
