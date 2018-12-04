import React, { Component } from 'react'
import ShootingStar from '../../components/ShootingStar'

export default class springEffect extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/YusukeNakaya/pen/XyOaBj">shooting star</a>
                </div>
                <ShootingStar></ShootingStar>
            </div>
        )
    }
}
