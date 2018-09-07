import React, { Component } from 'react'
import Piano from '../../components/Piano'

export default class piano extends Component {
    constructor () {
        super();
        this.pianoConfig = {
            padding: 40
        };
    }
    render() {
        return (
            <div>
                <div>
                    <span>source:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.smartisan.com/u1/#/overview">坚果官网</a>
                </div>
                <Piano config={this.pianoConfig} />
            </div>
        )
    }
}
