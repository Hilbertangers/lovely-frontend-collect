import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleLink = styled(Link)`
    display: block;
`

class home extends Component {
    render() {
        return (
            <div>
                <StyleLink to="/clickWave">点击水波图</StyleLink>
                <StyleLink to="/waterWave">容器canvas水波图</StyleLink>
                <StyleLink to="/piano">鼠标钢琴</StyleLink>
                <StyleLink to="/rainDrop">黑客帝国数字🌧</StyleLink>
                <StyleLink to="/clipCover">canvas图片裁剪遮盖</StyleLink>
                <StyleLink to="/springEffect">弹簧特效</StyleLink>
                <StyleLink to="/bulbSwitch">灯泡点亮效果的switch</StyleLink>
                <StyleLink to="/numberRoll">数字滚动3d效果</StyleLink>
                <StyleLink to="/shootingStar">流星雨又来临~</StyleLink>
                <StyleLink to="/dandelion">漂浮物背景墙</StyleLink>
                <StyleLink to="/screenshots">屏幕截图</StyleLink>
                <StyleLink to="/flow">与或逻辑流程图</StyleLink>
                <StyleLink to="/aphelios">厄斐琉斯切刀小工具</StyleLink>
            </div>
        );
    }
}

export default home;
