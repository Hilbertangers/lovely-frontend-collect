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
            totalValue: 123
        }
        this.numbersConfig = []
        for (let i = 0; i < 10; i++) {
            this.numbersConfig.push({
                label: i,
                rotateX: 360 / 10 * i
            })
        }
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
        return (
            <SectionWrapper>
                <InputWrapper>
                    <input type="text" value={this.state.totalValue} onChange={this.inputChange} />
                    {
                        String(this.state.totalValue).split('').map((item, index) => (
                            <Stage key={index}>
                                <Wrapper x={item * (-36)}>
                                    {
                                        this.numbersConfig.map((t, index) => (
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
