import React, { Component } from 'react'
import { 
    SwitchWrapper,
    Switch,
    Bulb,
    BulbCenter,
    FilamentLeft,
    FilamentRight,
    Reflections,
    Spark1,
    Spark2,
    Spark3,
    Spark4
} from './styled'

export default class BulbSwitch extends Component {
    handleChange = e => {
        this.props.stateChange(e.target.checked)
    }
    render () {
        return (
            <SwitchWrapper>
                <input
                    type="checkbox"
                    defaultChecked={this.props.value}
                    onChange={this.handleChange}
                    name="switch"/>
                <Switch htmlFor="switch">
                    <Bulb className="bulb">
                        <BulbCenter className="bulb-center" />
                        <FilamentLeft className="filament" />
                        <FilamentRight className="filament" />
                        <Reflections>
                            <span />
                        </Reflections>
                        <div className="spark">
                            <Spark1 />
                            <Spark2 />
                            <Spark3 />
                            <Spark4 />
                        </div>
                    </Bulb>
                </Switch>
            </SwitchWrapper>
        )
    }
}
