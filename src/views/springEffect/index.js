import React, { Component } from 'react'
import SpringEffect from '../../components/SpringEffect'

export default class springEffect extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/codepunkt/css-spring">css spring</a>
                </div>
                <SpringEffect></SpringEffect>
            </div>
        )
    }
}
