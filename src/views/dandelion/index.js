import React, { Component } from 'react'

export default class dandelion extends Component {
    constructor () {
        super()
        this.element = []
        this.canvas = React.createRef()
    }
    componentDidMount () {
        this.setElemProperty()
        this.draw()
    }
    setElemProperty = () => {
        const { width, height } = this.canvas.current
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if(Math.round(Math.random() * 10000) === 1) {
                    if (Math.round(Math.random()) === 1) {
                        // o
                        this.element.push({
                            x,
                            y,
                            s: ((Math.random() * 5) + 1) / 10, // s作为半径和边框宽的base
                            type: 'o'
                        });
                    } else {
                        // x
                        this.element.push({
                            x,
                            y,
                            s: ((Math.random() * 5) + 1) / 10,
                            dr: ((Math.random() * 3) - 1) / 10,
                            r: Math.random() * 360,
                            type: 'x'
                        });
                    }
                }
            }
        }
    }
    draw_o = (ctx, elem) => {
        ctx.beginPath();
        ctx.arc(this.wave(elem.x), this.wave(elem.y), elem.s * 12, 0, 2 * Math.PI, false)
        ctx.lineWidth = elem.s * 5
        ctx.strokeStyle = '#fff'
        ctx.stroke()
    }
    draw_x = (ctx, elem) => {
        ctx.save();
        const line = (x, y, tx, ty, c, o = 0) => {
            ctx.beginPath();
            ctx.moveTo(-o + (elem.s * 10 * x), o + (elem.s * 10 * y));
            ctx.lineTo(-o + (elem.s * 10 * tx), o + (elem.s * 10 * ty));
            ctx.lineWidth = elem.s * 5;
            ctx.strokeStyle = c;
            ctx.stroke();
        };
            
        ctx.translate(this.wave(elem.x), this.wave(elem.y));
        ctx.rotate(elem.r * Math.PI / 180);
        
        line(-1, -1, 1, 1, '#fff');
        line(1, -1, -1, 1, '#fff');
        
        ctx.restore();
    }
    // 使用正弦模拟运动，日期时间作为变量
    // 振幅，周期以后可以设为options
    wave = (val, swing = 5, period = 1 / 1000, row = 0, column = 0) => val + swing * Math.sin(new Date().getTime() * period + row) + column
    draw = () => {
        const { width, height } = this.canvas.current
        const ctx = this.canvas.current.getContext('2d')
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = '#04BBD3'
        ctx.fillRect(0, 0, width, height)
        this.element.forEach(item => {
            if (item.type === 'o') {
                this.draw_o(ctx, item)
            } else {
                this.draw_x(ctx, item)
            }
        })
        window.requestAnimationFrame(this.draw)
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
