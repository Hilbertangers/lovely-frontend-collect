import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleLink = styled(Link)`
    display:block;
`

class home extends Component {
    render() {
        return (
            <div>
                <StyleLink className="block" to="/clickWave">点击水波图</StyleLink>
                <StyleLink className="block" to="/waterWave">容器canvas水波图</StyleLink>
                <StyleLink className="block" to="/piano">鼠标钢琴</StyleLink>
            </div>
        );
    }
  }
  
  export default home;
  