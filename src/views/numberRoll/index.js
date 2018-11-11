import React, { Component } from 'react'
import styled from 'styled-components'

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

const Number = styled.div`
    position: absolute;
    backface-visibility: hidden;
    text-align: center;
    height: 40px;
    line-height: 40px;
    transform: ${props => `rotateX(${props.x}deg)`} translateZ(40px);
`

export default class NumberRoll extends Component {
    constructor() {
        super()
        this.state = {
            totalValue: 1002,
        }
        this.wrapperRotateFlag = []
        for (let i = 0; i < String(this.state.totalValue).length; i++) {
            this.wrapperRotateFlag.push({
                index: String(this.state.totalValue)[i],
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
            if (Math.abs(item - lastIndex) <= Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else {
                direct = false
                abs = Math.abs(lastIndex - item + 10)
            }
        } else {
            if (Math.abs(lastIndex - item) <= Math.abs(item + 10 - lastIndex)) {
                direct = false
                abs = Math.abs(lastIndex - item)
            } else {
                direct = true
                abs = Math.abs(item + 10 - lastIndex)
            }
        }
        // let direct = item >=lastIndex 78901234567890123
        if (lastIndex === item) {
            if (lastRotate === 0) {
                targeRotate = item * (-36)
            } else {
                targeRotate = lastRotate
            }
        } else if(direct) {
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
        this.setState(preState => ({
            totalValue: preState.totalValue + 1
        }));
    }
    minOne = () => {
        this.setState(preState => ({
            totalValue: preState.totalValue - 1
        }));
    }
    random = () => {
        this.setState(preState => ({
            totalValue: Math.ceil(Math.random() * 1000)
        }));
    }
    inputChange = (e) => {
        e.persist()
        this.setState(preState => ({
            totalValue: e.target.value
        }));
    }
    render() {
        let numbersConfig = []
        String(this.state.totalValue).split('').forEach(item => {
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
        
        return (
            <SectionWrapper>
                <InputWrapper>
                    <input type="text" value={this.state.totalValue} onChange={this.inputChange} />
                    {
                        String(this.state.totalValue).split('').map((item, index) => (
                            <Stage key={index}>
                                <Wrapper x={this.rotateFlagUpdate(item, index)}>
                                    {
                                        numbersConfig[index].map((t, index) => (
                                            <Number key={index} x={t.rotateX}>{t.label}</Number>
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
        )
    }
}
