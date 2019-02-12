import React, { Component } from 'react'

export default class RainDrop extends Component {
    constructor (props) {
        super (props)
        this.defaultOptions = {
            canvasHeight: 500,
            canvasWidth: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            textColor: '#0F0',
            content: 'abcdefghijklmnopqrstuvwxyz',
            fontSize: '20',
            speed: 3 // 代表1s执行 60 / 3 = 20帧
        }
        this.options = Object.assign({}, this.defaultOptions, this.props.config)
        this.rainDropArr = []
        this.speedCnt = 0
        this.firstScreen = true
        this.draw = this.draw.bind(this)
        this.animationFrameId = null
    }
    componentDidMount () {
        const { canvasHeight, canvasWidth, fontSize } = this.options
        this.canvas = this.refs.canvas
        this.canvas.width = canvasWidth
        this.canvas.height = canvasHeight
        const columns = canvasWidth / fontSize
        for (let i = 0; i < columns; i++) {
            this.rainDropArr.push(0)
        }
        this.draw()
    }
    draw () {
        const { canvasHeight, canvasWidth, backgroundColor, textColor, content, fontSize, speed } = this.options
        const ctx = this.canvas.getContext('2d')
        this.speedCnt++
        if (this.speedCnt === speed) {
            this.speedCnt = 0;
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, canvasWidth, canvasHeight)
            ctx.fillStyle = textColor
            for (let i = 0; i < this.rainDropArr.length; i++) {
                if (this.firstScreen && this.rainDropArr[i] === 0 && Math.random() > 0.05) {
                    continue
                }
                this.rainDropArr[i]++
                let randomText = content[Math.floor(Math.random() * content.length)]
                let textYPostion = this.rainDropArr[i] * fontSize
                ctx.font = `${fontSize}px sans-serif`
                ctx.fillText(randomText, i * fontSize, textYPostion)

                if (textYPostion > canvasHeight) {
                    if (this.firstScreen) this.firstScreen = false; // 当某列到达canvas最底部时，
                    if (Math.random() > 0.95) {
                        this.rainDropArr[i] = 0;
                    }
                }
            }
            
        }

        this.animationFrameId = window.requestAnimationFrame(this.draw)
    }
    componentWillUnmount () {
        window.cancelAnimationFrame(this.animationFrameId);
    }
    render () {
        return (
            <canvas ref="canvas"></canvas>
        )
    }
}
