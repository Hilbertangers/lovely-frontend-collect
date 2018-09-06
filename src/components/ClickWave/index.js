import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');
    background-attachment: fixed;
    background-position: center center; 
    background-size: auto 100%;
    overflow: hidden;
    cursor: pointer;
`;

const WaveWrapper = styled.div`
    position: absolute;
    width: 80vmin;
    height: 80vmin;
    z-index: ${props => props.style.zIndex};
    top: ${props => props.style.top};
    left: ${props => props.style.left};
`;

const Wave = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Wave_frames = keyframes`
        0% {
            top: calc((100% - 10vmin)/2);
            left: calc((100% - 10vmin)/2);
            width: 10vmin;
            height: 10vmin;
            opacity: 1;
        }
        10% {
            opacity: 1;
        }
        99% {
            opacity: 1;
        }
        100% {
            top: calc((100% - 40vmin)/2);
            left: calc((100% - 40vmin)/2);
            width: 40vmin;
            height: 40vmin;
            opacity: 0;
        }
`

const WaveItem = styled.div`
    position: absolute;
    top: calc((100% - 20vmin)/2);
    left: calc((100% - 20vmin)/2);
    width: 20vmin;
    height: 20vmin;
    border-radius: 50%;
    background-image: url('https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');
    background-attachment: fixed;
    background-position: center center;
    transform: translate3d(0, 0, 0);
    opacity: 0;
    transition: all .2s;
`

const WaveItem1 = styled(WaveItem)`
    background-size: auto 106%;
    animation: ${Wave_frames} 1s ease-out .1s;
    animation-fill-mode: forwards;
    z-index: 10;
`
const WaveItem2 = styled(WaveItem)`
    background-size: auto 102%;
    animation: ${Wave_frames} 1s ease-out .15s;
    animation-fill-mode: forwards;
    z-index: 20;
`
const WaveItem3 = styled(WaveItem)`
    background-size: auto 104%;
    animation: ${Wave_frames} 1s ease-out .25s;
    animation-fill-mode: forwards;
    z-index: 30;
`
const WaveItem4 = styled(WaveItem)`
    background-size: auto 100%;
    animation: ${Wave_frames} 1s ease-out .4s;
    animation-fill-mode: forwards;
    z-index: 40;
`

class ClickWave extends Component {
    constructor(props) {
        super(props);
        let screenSizeWidth = document.body.clientWidth;
        let screenSizeHeight = document.body.clientHeight;
        this.halfvmin = (screenSizeWidth > screenSizeHeight ? screenSizeHeight / 2 : screenSizeWidth / 2) * 0.8;
        this.state = {
            waveList: []
        };
        this.addWave = this.addWave.bind(this);
    }
    addWave(e) {
        e.persist(); // 异步中想访问合成事件e, 需要调用此方法
        this.setState((prevState) => {
            prevState.waveList.push({
                alive: 3,
                pageX: e.pageX,
                pageY: e.pageY
            });
            let lengthNow = prevState.waveList.length;
            setTimeout(() => {
                this.setState((prevState) => {
                    prevState.waveList[lengthNow - 1].alive = 0;
                    return {
                        waveList: prevState.waveList
                    }
                });
            }, 3000);
            return {
                waveList: prevState.waveList
            }
        });
    }
    render() {
        return (
            <Wrapper onClick={this.addWave}>
                {this.state.waveList.map((item, index) => {
                    if (item.alive > 0) {
                        return (
                            <WaveWrapper
                                key={index}
                                style={{
                                    zIndex: index,
                                    top: item.pageY - this.halfvmin,
                                    left: item.pageX - this.halfvmin,
                                }}
                                >
                                <Wave>
                                    <WaveItem1></WaveItem1>
                                    <WaveItem2></WaveItem2>
                                    <WaveItem3></WaveItem3>
                                    <WaveItem4></WaveItem4>
                                </Wave>
                            </WaveWrapper>
                        )
                    } else return null
                })}
            </Wrapper>
        );
    }
}

export default ClickWave;