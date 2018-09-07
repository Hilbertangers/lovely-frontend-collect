import React, { Component } from 'react';
import WaterWave from '../../components/WaterWave';

class waterWave extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>source:</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://juejin.im/post/5b4ffa045188251b134e7211">水波图原理</a>
                </div>
                <ul>
                    <li><WaterWave type="circle" /></li>
                    <li><WaterWave type="star" /></li>
                    <li><WaterWave type="roundRect" /></li>
                    <li><WaterWave type="heart" /></li>                    
                </ul>
            </div>
        );
    }
}

export default waterWave;
