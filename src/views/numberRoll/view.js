import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { setTotalValue } from './action'

const SectionWrapper = styled.div`
    margin: 60px auto;
`

const InputWrapper = styled.div`
    display: flex;
    width: 200px;
    height: 40px;
    position: relative;

    input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
`

const Stage = styled.div`
    width: 20px;
    height: 40px;
    overflow: hidden;
    perspective: 300px;
    position: relative;
`

const Wrapper = styled.div`
    position: absolute;
    left: 50%;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    height: 40px;
    transform: ${props => `rotateX(${props.x}deg)`};
    transition: opacity 1s, transform 1s;
`

const NumberWrapper = styled.div`
    position: absolute;
    backface-visibility: hidden;
    text-align: center;
    height: 40px;
    line-height: 40px;
    transform: ${props => `rotateX(${props.x}deg)`} translateZ(40px);
`

@connect(
    state => ({
        ...state.numberRoll
    }),
    dispatch => ({
        setTotalValue: (...args) => dispatch(setTotalValue(...args))
    })
)
export default class NumberRoll extends Component {
    constructor(props) {
        super(props)
        this.wrapperRotateFlag = []
        for (let i = 0; i < String(this.props.totalValue).length; i++) {
            this.wrapperRotateFlag.push({
                index: Number(String(this.props.totalValue)[i]),
                rotate: 0
            })
        }
    }
    componentDidMount () {

    }
    componentDidUpdate () {

    }
    rotateFlagUpdate = (item, index) => {
        let lastIndex = this.wrapperRotateFlag[index].index
        let lastRotate = this.wrapperRotateFlag[index].rotate
        let targeRotate;
        let abs
        let direct
        // 在一个循环中依据先后两数的大小，判断圆环旋转方向
        if (item >= lastIndex) {
            if (Math.abs(item - lastIndex) === Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else if (Math.abs(item - lastIndex) < Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else {
                direct = false
                abs = Math.abs(lastIndex - item + 10)
            }
        } else {
            if (Math.abs(item - lastIndex) === Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else if (Math.abs(lastIndex - item) < Math.abs(item + 10 - lastIndex)) {
                direct = false
                abs = Math.abs(lastIndex - item)
            } else {
                direct = true
                abs = Math.abs(item + 10 - lastIndex)
            }
        }
        if (lastIndex === item) {
            if (lastRotate === 0) {
                targeRotate = item * (-36)
            } else {
                targeRotate = lastRotate
            }
        } else if (direct) {
            // 加
            targeRotate = lastRotate - abs * 36
        } else if (!direct) {
            // 减
            targeRotate = lastRotate + abs * 36
        }
        this.wrapperRotateFlag[index].index = item
        this.wrapperRotateFlag[index].rotate = targeRotate
        return targeRotate
    }
    addOne = () => {
        this.props.setTotalValue(this.props.totalValue + 1)
    }
    minOne = () => {
        this.props.setTotalValue(this.props.totalValue - 1)
    }
    random = () => {
        this.props.setTotalValue(Math.ceil(Math.random() * 1000))
    }
    inputChange = (e) => {
        this.props.setTotalValue(Number(e.target.value))
    }
    behindNumberUpdate = () => {
        
    }
    render() {
        let numbersConfig = []
        String(this.props.totalValue).split('').forEach(item => {
            let itemConfig = (() => {
                let arr = []
                for (let i = 0; i < 10; i++) {
                    arr.push({
                        label: i,
                        rotateX: 360 / 10 * i
                    })
                }
                return arr
            })()
            numbersConfig.push(itemConfig)
        })

        // 增减位判断保护
        if (String(this.props.totalValue).length > this.wrapperRotateFlag.length) {
            for (let i = this.wrapperRotateFlag.length; i < String(this.props.totalValue).length; i++) {
                this.wrapperRotateFlag.push({
                    index: Number(String(this.props.totalValue)[i]),
                    rotate: 0
                })
            }
        }

        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <span>my Cat and me</span>
                </div>
                <SectionWrapper>
                    <InputWrapper>
                        <input type="text" value={this.props.totalValue} onChange={this.inputChange} />
                        {
                            String(this.props.totalValue).split('').map((item, index) => (
                                <Stage key={index}>
                                    <Wrapper x={this.rotateFlagUpdate(Number(item), index)}>
                                        {
                                            numbersConfig[index].map((t, index) => (
                                                <NumberWrapper key={index} x={t.rotateX}>{t.label}</NumberWrapper>
                                            ))
                                        }
                                    </Wrapper>
                                </Stage>
                            ))
                        }
                    </InputWrapper>
                    <button onClick={this.addOne}>add one</button>
                    <button onClick={this.minOne}>min one</button>
                    <button onClick={this.random}>random</button>
                </SectionWrapper>                
            </div>
        )
    }
}
