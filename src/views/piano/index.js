import React, { Component } from 'react'
import Piano from '../../components/Piano'

export default class piano extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>source:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.smartisan.com/u1/#/overview">坚果官网</a>
                </div>
                <Piano />
            </div>
        )
    }
}
