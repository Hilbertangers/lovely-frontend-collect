import React, { Component } from 'react'
import RainDrop from '../../components/RainDrop'

export default class rainDrop extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://juejin.im/post/5b6ff1076fb9a009a545f58b">黑客帝国数字🌧特效</a>
                </div>
                <RainDrop></RainDrop>
            </div>
        )
    }
}
