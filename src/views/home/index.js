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
                <StyleLink className="block" to="/rainDrop">黑客帝国数字🌧</StyleLink>
                <StyleLink className="block" to="/clipCover">canvas图片裁剪遮盖</StyleLink>
                <StyleLink className="block" to="/springEffect">弹簧特效</StyleLink>
                <StyleLink className="block" to="/bulbSwitch">灯泡点亮效果的switch</StyleLink>
            </div>
        );
    }
}

export default home;
