import React, { Component } from 'react'
import Flow from '../../components/Flow'
import { connect } from 'react-redux'
import { setValue, setNode } from './action'
import styled from 'styled-components'

const Input = styled.input`
    width: 200px;
    margin: 60px 0 20px;
`

const Wrapper = styled.div`
    width: 800px;
`

@connect(
    state => ({
        ...state.flow
    }),
    dispatch => ({
        setValue: (...args) => dispatch(setValue(...args)),
        setNode: (...args) => dispatch(setNode(...args))
    })
)
export default class flow extends Component {
    inputChange (e) {
        this.props.setValue(e.target.value)
    }
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <span>my Cat and me</span>
                </div>
                <Input value={this.props.value} onChange={e => this.inputChange(e)} />
                <Wrapper>
                    <Flow value={this.props.value} nodeMap={this.props.nodeMap} />
                </Wrapper>
            </div>
        )
    }
}
