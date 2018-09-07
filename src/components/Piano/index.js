import React, { Component } from 'react'

export default class Piano extends Component {
    constructor (props) {
        super(props);
        this.defaultOptions = {
            canvasWidth: 1080,
            canvasHeight: 300,
            values: [
                {
                    color: '#FE615C',
                    initHeight: '100'
                },
                {
                    color: '#FFB66F',
                    initHeight: '150'
                },
                {
                    color: '#FFDA6C',
                    initHeight: '200'
                },
                {
                    color: '#E2F68B',
                    initHeight: '250'
                },
                {
                    color: '#8CF6F3',
                    initHeight: '200'
                },
                {
                    color: '#99B4F3',
                    initHeight: '150'
                },
                {
                    color: '#BEA1E8',
                    initHeight: '100'
                },
            ],
            padding: 20,
            minHeight: 80
        }
        this.options = Object.assign({}, this.defaultOptions, this.props.config);
        console.log(this.options);
        this.mouseX = 0;
        this.heightStore = []; // 存储height的当前值
        this.draw = this.draw.bind(this);
        this.mousemove = this.mousemove.bind(this);
        this.canvasInit = this.canvasInit.bind(this);
    }
    componentDidMount () {
        const { canvasWidth, canvasHeight, values, minHeight } = this.options;
        this.canvas = this.refs.canvas;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        for (let i = 0; i < values.length; i++) {
            this.heightStore.push(minHeight);
        }
        this.draw();
    }
    draw () {
        const ctx = this.canvas.getContext('2d');
        const { canvasWidth, canvasHeight, values, padding, minHeight } = this.options;
        const itemWidth = canvasWidth / values.length - padding;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        for (let i = 0; i < values.length; i++) {
            let x = (itemWidth + padding) * i;
            let itemCenter = x + itemWidth * 0.5;
            let countHeight;
            if (this.mouseX === 0) {
                // mousemove不在canvas内 则init
                countHeight = values[i]['initHeight'];
            } else {
                countHeight = Math.sin((itemCenter - this.mouseX) * Math.PI / canvasWidth + Math.PI * 0.5) * canvasHeight * 0.85;// 神奇的正弦
            }
            let targetHeight = Math.max(countHeight, minHeight);
            let curHeight = this.heightStore[i];
            curHeight = this.lerp(curHeight, targetHeight, 0.1); // 添加线性插值动效
            this.heightStore[i] = curHeight;
            ctx.fillStyle = values[i]['color'];
            ctx.fillRect(x, canvasHeight - curHeight, itemWidth, curHeight);
        }
        window.requestAnimationFrame(this.draw);
    }
    mousemove (e) {
        this.mouseX = e.pageX;
    }
    canvasInit () {
        this.mouseX = 0;
    }
    lerp (value1, value2, amount) {
        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }
    render () {
        return (
            <div>
                <canvas ref="canvas" onMouseLeave={this.canvasInit} onMouseMove={this.mousemove}></canvas>
            </div>
        )
    }
}
