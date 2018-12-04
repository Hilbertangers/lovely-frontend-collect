import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const tailKey = keyframes`
    0% {
        width: 0;
    }

    30% {
        width: 100px;
    }

    100% {
        width: 0;
    }
`

const starKey = keyframes`
    0% {
        width: 0;
    }

    50% {
        width: 30px;
    }

    100% {
        width: 0;
    }
`

const shootingKey = keyframes`
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(300px);
    }
`

const skyKey = keyframes`
    0% {
        transform: rotate(30deg);
    }

    100% {
        transform: rotate(55deg);
    }
`

const Sky = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 0 auto;
    background: radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%);
    overflow: hidden;
`

const StarWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    animation: ${skyKey} 25s ease-in-out;
    animation-fill-mode: forwards;
`

const Star = styled.div`
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    filter: drop-shadow(0 0 6px #699BFF);
    height: 2px;
    background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    border-radius: 100%;
    animation: ${tailKey} 3s ease-in-out infinite,
        ${shootingKey} 3s ease-in-out infinite;
    animation-delay: ${props => props.delay}ms;

    &::before,
    &::after {
        content: '';
        position: absolute;
        right: 0;
        height: 2px;
        border-radius: 100%;
        background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
        animation: ${starKey} 3s ease-in-out infinite;
        animation-delay: ${props => props.delay}ms;
    }

    &::before {
        transform: translateX(50%) rotateZ(45deg);
    }

    &::after {
        transform: translateX(50%) rotateZ(-45deg);
    }
`

export default class ShootingStar extends Component {
    constructor(props) {
        super(props)
        this.starLength = this.props.num || 40;
        this.skyWidth = this.props.width || 1080;
        this.skyHeight = this.props.height || 700;
        this.skyPadding = this.props.padding || {
            top: 80,
            bottom: 80,
            left: 200,
            right: 300
        };
    }
    render() {
        const stars = []
        for (let i = 0; i <= this.starLength; i++) {
            let top = Math.floor(Math.random() * (this.skyHeight - this.skyPadding.top - this.skyPadding.bottom) + this.skyPadding.top)
            let left = Math.floor(Math.random() * (this.skyWidth - this.skyPadding.left - this.skyPadding.right) + this.skyPadding.left)
            let animateDelay = Math.random() * 10000;
            stars.push({
                id: i,
                top,
                left,
                animateDelay
            })
        }
        return (
            <Sky width={this.skyWidth} height={this.skyHeight}>
                <StarWrapper>
                    {
                        stars.map(item => (
                            <Star top={item.top} left={item.left} delay={item.animateDelay} key={item.id}></Star>
                        ))
                    }
                </StarWrapper>
            </Sky>
        )
    }
}
