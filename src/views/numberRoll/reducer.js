import { SET_TOTAL_VALUE } from './actionTypes'

const initState = {
    totalValue: 97
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_TOTAL_VALUE:
            return {
                totalValue: action.detail
            }
        default:
            return state
    }
}

export default reducer