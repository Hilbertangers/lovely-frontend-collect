import React, { Component } from 'react'
import Flow from '../../components/Flow'
import { connect } from 'react-redux'
import { setTargetValue, setNode, setProcess, setMaxStayCount } from './action'
import styled from 'styled-components'
import { Aphelios } from './efls_weapons'

const Text = styled.div`
    margin: 20px 0;
`

const Wrapper = styled.div`
    width: 800px;
`
const Button = styled.div`
    width: 50px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    background: ${props => props.color};
    border-radius: 25px;
    margin: 0 10px 30px;
    cursor: pointer;
`

@connect(
    state => ({
        ...state.aphelios
    }),
    dispatch => ({
        setTargetValue: (...args) => dispatch(setTargetValue(...args)),
        setNode: (...args) => dispatch(setNode(...args)),
        setProcess: (...args) => dispatch(setProcess(...args)),
        setMaxStayCount: (...args) => dispatch(setMaxStayCount(...args)),
    })
)
export default class aphelios extends Component {
    buttonClick(value) {
        if (this.props.targetValue.length < 5 && !this.props.targetValue.find(t => t === value)) {
            this.props.setTargetValue([
                ...this.props.targetValue,
                value
            ])
        }
    }
    reset() {
        this.props.setTargetValue([])
    }
    inputChange(e) {
        if (+e.target.value > 0 && +e.target.value < 5) {
            this.props.setMaxStayCount(+e.target.value)
        }
    }
    getProcess() {
        if (this.props.targetValue.length < 5) {
            alert("请选择出一个完整的武器顺序")
        } else {
            const apheliosIns = new Aphelios({
                maxStayCount: this.props.maxStayCount
            });
            apheliosIns.setTargetQueue(this.props.targetValue)
            const process = apheliosIns.getProcess()
            if (process.length) {
                this.props.setProcess(`(${process[0].join('&')})|循环`)
            } else {
                this.props.setProcess(`循环`)
            }
        }
    }
    render() {
        return (
            <div>
                <Wrapper>
                    <Text>1.进游戏的初始武器顺序：</Text>
                    <Flow value={this.props.initValue.join('&')} nodeMap={this.props.nodeMap} />
                </Wrapper>
                <Wrapper>
                    <Text>2.期望的武器顺序：(点击按钮确定顺序)</Text>
                    {
                        this.props.buttons.map(t => {
                            return (
                                !this.props.targetValue.find(_t => _t === t.value) &&
                                <Button
                                    color={t.color}
                                    key={t.value}
                                    onClick={() => this.buttonClick(t.value)}
                                >{t.value}</Button>
                            )
                        })
                    }
                    <Button color="#ddd" onClick={() => this.reset()}>重置</Button>
                    <Flow value={this.props.targetValue.join('&')} nodeMap={this.props.nodeMap} />
                    <Button color="#f89609" onClick={() => this.getProcess()}>计算</Button>
                </Wrapper>
                <Wrapper>
                    <Text>3.为防止同一把武器停留太久（毕竟实战里不会出现一把刀长时间停留的情况），我们可以设置最大滞留次数，默认为2， 范围是1～4：</Text>
                    <input type="number" value={this.props.maxStayCount} onChange={e => this.inputChange(e)} />
                </Wrapper>
                <Wrapper>
                    <Text>4.按以下步骤打出即可获得期望的武器顺序：</Text>
                    <Flow value={this.props.process} nodeMap={this.props.nodeMap} />
                </Wrapper>
            </div>
        )
    }
}
