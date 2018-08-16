import React, { Component } from 'react';
import './index.css';

class ClickWave extends Component {
    constructor (props) {
        super(props);
        let screenSizeWidth = document.body.clientWidth;
        let screenSizeHeight = document.body.clientHeight;
        this.halfvmin = (screenSizeWidth > screenSizeHeight ? screenSizeHeight / 2 : screenSizeWidth / 2) * 0.8;
        this.state = {
            waveList: []
        };
        this.addWave = this.addWave.bind(this);
    }
    addWave (e) {
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
    waveListRender () {
        return this.state.waveList.map((item, index) => {
            if (item.alive > 0) {
                return (<div 
                    className="clickWave"
                    key={index}
                    style={{
                        zIndex: index,
                        top: item.pageY - this.halfvmin,
                        left: item.pageX - this.halfvmin,
                    }}>
                    <div className="g-center">
                        <div className="wave g-wave1"></div>
                        <div className="wave g-wave2"></div>
                        <div className="wave g-wave3"></div>
                        <div className="wave g-wave4"></div>
                    </div>
                </div>)
            } else return null;
        });
    }
    render () {
        return (
            <div className="clickWave-warpper" onClick={this.addWave}>
                {this.waveListRender()}
            </div>
        );
    }
}

export default ClickWave;