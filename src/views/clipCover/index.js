import React, { Component } from 'react'
import ClipCover from '../../components/ClipCover'

export default class clipCover extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/HelKyle/pen/RYVqRb">codePen from Helkyle</a>
                </div>
                <ClipCover />
            </div>
        )
    }
}
