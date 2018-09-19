import React, { Component } from 'react'
import bgImg from '../../assets/img/clipCover1.jpg'
import coverImg from '../../assets/img/clipCover2.jpg'
import styled, { keyframes } from 'styled-components'

const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
`

const Wrapper = styled.div`

    width: 1600px;
    /* padding-top具体由img长宽比来决定 */
    padding-top: 56%;
    height: 0;
    position: relative;
    box-shadow: 1px 1px 40px rgba(0, 0, 0, 0.4);
    overflow: hidden;
`

const ImgWrapper = styled.div`
    user-select: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    img,
    canvas {
        width: 100%;
        height: 100%;
    }
`

const Popping = keyframes`
    0%,
    100% {
        tranform: scale(1);
    }
    50% {
        transform: scale(1.333);
    }
`

const Btn = styled.button`
    position: absolute;
    cursor: pointer;
    outline: none;
    right: 10vw;
    top: 50%;
    margin-top: -3vw;
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    border: none;
    background: #EF5C5C;
    color: white;
    box-shadow: rgba(248,  124, 124, 0.5) 0 0 60px 10px;
    animation: ${Popping} 3s ease-in-out infinite;
`

export default class ClipCover extends Component {
    constructor() {
        super()
        this.coverImg = coverImg
        this.speed = -20
        this.distance = 0
    }
    componentDidMount () {
        this.canvas = this.refs.canvas
        this.canvas.width = this.canvas.parentNode.offsetWidth
        this.canvas.height = this.canvas.parentNode.offsetHeight
        new Promise(resolve => {
            const image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.src = this.coverImg
        }).then(img => {
            this.readyImg = img
            this.draw()
        })
    }
    draw = () => {
        const { width, height } = this.canvas
        const ctx = this.canvas.getContext('2d')

        this.distance += this.speed
        if (this.speed < 0) {
            this.distance = Math.max(this.distance, 0)
        } else {
            this.distance = Math.min(this.distance, width)
        }

        ctx.clearRect(0, 0, width, height)

        let bezier = [
            {
                firstDotX: width,
                firstDotY: height * 0.25 - this.distance,
                secondDotX: width * 0.75 - this.distance,
                sceondDotY: height * 0.25 - this.distance,
                endX: width * 0.75 - this.distance,
                endY: height * 0.5
            }, {
                firstDotX: width * 0.75 - this.distance,
                firstDotY: height * 0.75 + this.distance,
                secondDotX: width,
                sceondDotY: height * 0.75 + this.distance,
                endX: width,
                endY: height
            }
        ]
        ctx.save()
        ctx.beginPath()
        ctx.lineWidth = 2
        ctx.fillStyle = 'white'
        ctx.moveTo(width, 0)
        bezier.forEach(item => {
            ctx.bezierCurveTo(item.firstDotX, item.firstDotY, item.secondDotX, item.sceondDotY, item.endX, item.endY)
        })
        ctx.fill()
        ctx.clip()
        ctx.drawImage(this.readyImg, 0, 0, this.readyImg.width, this.readyImg.height, 0, 0, width, height)
        ctx.restore()

        window.requestAnimationFrame(this.draw)
    }
    startCover () {

    }
    changDirection = () => {
        this.speed *= -1
    }
    render() {
        return (
            <Body>
                <Wrapper>
                    <ImgWrapper>
                        <img src={bgImg} alt=""/>
                    </ImgWrapper>
                    <ImgWrapper>
                        <canvas ref="canvas"></canvas>
                    </ImgWrapper>
                    <Btn onClick={this.changDirection}></Btn>
                </Wrapper>                
            </Body>
        )
    }
}
