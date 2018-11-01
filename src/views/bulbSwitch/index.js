import React, { Component } from 'react'
import BulbSwitch from '../../components/BulbSwitch'
import styled from 'styled-components'

const BulbSwitchWrapper = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #514878;
`

export default class bulbSwitch extends Component {
    constructor () {
        super()
        this.state = {
            checkState: false
        }
    }
    handleStateChange = val => {
        this.setState({
            checkState: val
        })
    }
    render () {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://dribbble.com/shots/4229342-Light-Bulb-Switch">Light Bulb Switch</a>
                </div>
                <BulbSwitchWrapper>
                    <BulbSwitch value={this.state.checkState} stateChange={this.handleStateChange} />
                </BulbSwitchWrapper>
            </div>
        );
    }
}
