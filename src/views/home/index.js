import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class home extends Component {
    render() {
        return (
            <div>
                <Link className="block" to="/clickWave">点击水波图</Link>
                <Link className="block" to="/waterWave">容器canvas水波图</Link>                    
            </div>
        );
    }
  }
  
  export default home;
  