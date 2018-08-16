import React, { Component } from 'react';
import WaterWave from '../../components/WaterWave';
import './index.css';

class waterWave extends Component {
    render() {
      return (
          <ul className="App">
            <li><WaterWave type="circle" /></li>
            <li><WaterWave type="star" /></li>
            <li><WaterWave type="roundRect" /></li>
            <li><WaterWave type="heart" /></li>
          </ul>
      );
    }
  }
  
  export default waterWave;
  