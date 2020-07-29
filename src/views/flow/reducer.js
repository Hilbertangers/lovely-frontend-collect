const initState = {
    value: '1&2|3',
    nodeMap: [
        { label: '昂热', value: '1', status: false },
        { label: '旺财', value: '2', status: undefined },
        { label: '来福', value: '3', status: true },
    ]
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_VALUE':
            return {
                value: action.detail,
                nodeMap: state.nodeMap,
            }
        case 'SET_NODE':
            return {
                nodeMap: action.detail,
                value: state.value,
            }
        default:
            return state
    }
}

export default reducer
