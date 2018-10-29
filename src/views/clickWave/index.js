import React, { Component } from 'react';
import ClickWave from '../../components/ClickWave';

class clickWave extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Inspired by:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.oxxostudio.tw/articles/201407/css-water-wave.html">点击水纹原理</a>
                </div>
                <ClickWave />
            </div>
        );
    }
}

export default clickWave;
