import React, { Component } from 'react'
import { connect } from 'react-redux'
import BulbSwitch from '../../components/BulbSwitch'
import styled from 'styled-components'
import { setSwitchState } from './action'

const BulbSwitchWrapper = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #514878;
`

@connect(
    state => ({
        ...state.bulbSwitch
    }),
    dispatch => ({
        setSwitchState: (...args) => dispatch(setSwitchState(...args))
    })
)
export default class bulbSwitch extends Component {
    render () {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://dribbble.com/shots/4229342-Light-Bulb-Switch">Light Bulb Switch</a>
                </div>
                <BulbSwitchWrapper>
                    <BulbSwitch value={this.props.checkState} stateChange={this.props.setSwitchState} />
                </BulbSwitchWrapper>
            </div>
        );
    }
}
