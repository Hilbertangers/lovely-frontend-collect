import { SET_SWITCH_STATE } from './actionTypes'

const initState = {
    checkState: true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_SWITCH_STATE:
            return action.detail
        default:
            return state;
    }
}

export default reducer