import React, { Component } from 'react'

export default class dandelion extends Component {
    constructor () {
        super()
        this.canvas = React.createRef()
    }
    componentDidMount () {
    }
    draw = () => {
        const { width, height } = this.canvas.current
        const ctx = this.canvas.current.getContext('2d')
        ctx.clearRect(0, 0, width, height)
    }
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://codepen.io/Munkkeli/pen/PqWBdP">codepan</a>
                </div>
                <canvas ref={this.canvas} width="800" height="400"></canvas>
            </div>
        )
    }
}
