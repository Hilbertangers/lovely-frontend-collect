const initState = {
    buttons: [
        { value: '通碧', color: 'green' },
        { value: '断魄', color: 'red' },
        { value: '坠明', color: '#a808dd' },
        { value: '荧焰', color: 'blue' },
        { value: '折镜', color: '#d5dbff' },
    ],
    initValue: ['通碧', '断魄', '坠明', '荧焰', '折镜'],
    targetValue: [],
    process: '',
    maxStayCount: 2,
    nodeMap: [
        { label: '', value: '断魄', status: 'red' },
        { label: '', value: '通碧', status: 'green' },
        { label: '', value: '坠明', status: '#a808dd' },
        { label: '', value: '荧焰', status: 'blue' },
        { label: '', value: '折镜', status: '#d5dbff' },
        { label: '先进先出', value: '循环' },
    ]
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_TARGET_VALUE':
            return {
                ...state,
                targetValue: action.detail,
            }
        case 'SET_NODE':
            return {
                ...state,
                nodeMap: action.detail,
            }
        case 'SET_PROCESS':
            return {
                ...state,
                process: action.detail,
            }
        case 'SET_MAXSTAY':
            return {
                ...state,
                maxStayCount: action.detail,
            }
        default:
            return state
    }
}

export default reducer
