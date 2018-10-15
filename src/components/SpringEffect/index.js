import React, { Component } from 'react'
import spring, { toString } from 'css-spring'
import styled, { keyframes } from 'styled-components'

const Square = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    background-color: #0ab;
`

const springFramesString = toString(
    spring(
        { left: '0', backgroundColor: '#0ab' }, // from
        { left: '500px', backgroundColor: '#f08'}, // to
        {
            precision: 3, // 小数点后精度
            stiffness: 170, // 刚度
            damping: 14 // 阻尼
        }
    )
)

const springFrames = keyframes`${springFramesString}`

const Animation = styled(Square)`
    animation: ${springFrames} 1s linear alternate-reverse infinite;
`

export default class SpringEffect extends Component {
    render() {
        return (
            <div>
                <Animation></Animation>
            </div>
        )
    }
}
