import React, { Component } from 'react'
import elementResizeDetectorMaker from 'element-resize-detector';
import styled from 'styled-components'
import { _ } from '../../utils/_.js';

const Wrapper = styled.div`
    background: #fff;
    width: 100%;
`

export default class Flow extends Component {
    constructor (props) {
        super(props);
        this.defaultOptions = {
          orWidthRate: 0.9, // 或占据的宽度比，or独占的情况
          orHeightRate: 0.5, // 或占据的高度比， 通用
          orHybridRate: 0.5, // 或占据的宽度比，or与node混合的情况
          nodeStyle: {
            height: 30,
            fontSize: 12,
            padding: 15,
            branchPaddingMin: 20, // or上下各分支间node的距离
            marginMin: 10, // node与node，node与or间的最小距离
            color: {
              success: {
                fill: '#19be6b',
                font: '#fff',
              },
              fail: {
                fill: '#ed4014',
                font: '#fff',
              },
              default: {
                fill: '#ddd',
                font: '#666',
              },
            },
          },
        }
        this.struct = [];
        this.options = Object.assign({}, this.defaultOptions, this.props.config);
        this.draw = this.draw.bind(this);
    }
    componentDidMount () {
        this.canvas = this.refs.flow;
        this.observer = elementResizeDetectorMaker();
        this.parse();
        this.observer.listenTo(this.wrapper, this.draw);
    }
    componentDidUpdate() {
      this.parse();
    }
    componentWillUnmount () {
        this.observer.uninstall(this.wrapper);
    }
    parse () {
      let text = this.props.value.replace(/\s+/g, '');
      this.struct = this.parseFlow(text);
      // this.props.fetchStruct(this.struct);
      this.reactiveWidth = null;
      this.draw();
    }
    draw() {
      const ctx = this.canvas.getContext('2d');
      const width = this.setWidth();
      const height = this.setHeight();
      ctx.clearRect(0, 0, width, height);

      this.drawMid(ctx);
      if (!this.struct.length) return;

      const assert = this.drawStruct(ctx, this.struct, width, height, 0, 0, [1]);
      if (assert === 'restart') {
        this.draw();
      }
    }
    setWidth() {
      let width = this.reactiveWidth || this.wrapper.offsetWidth;
      this.canvas.width = width;
      return width;
    }
    setHeight() {
      const { nodeStyle } = this.options;
      let minBranchH = nodeStyle.height + nodeStyle.branchPaddingMin;
      let heights = [minBranchH]; // 初始一个值，用于只有一层且只有node的case

      const findLayerH = (arr, branchs) => {
        arr.forEach(t => {
          if (_.isArray(t.value)) {
            let curH = minBranchH * (t.value.length - 1); // 当前or高度
            let _branch = _.jsonCopy(branchs); // 区分各线路分支
            let canvasH = _branch.reduce((pre, next) => pre * next, curH); // canvas总高
            heights.push(canvasH);
            _branch.push(t.value.length);
            t.value.forEach(_t => {
              findLayerH(_t, _branch);
            });
          }
        });
      };
      findLayerH(this.struct, [2]);

      let height =  Math.max.apply(null, heights);
      this.canvas.height = height;
      return height;
    }
    /**
     * gradientRate 宽度梯度比例，记录给宽度超出的情况使用
     */
    drawStruct(ctx, struct, parentW, parentH, parentX, parentY, gradientRate) {
      const { orWidthRate, orHeightRate, nodeStyle, orHybridRate } = this.options;
      let scene = struct.every(t => t.type === 'or') && 'justOr' // eslint-disable-line
        || struct.every(t => t.type === 'node') && 'justNode' // eslint-disable-line
        || 'orAndNode'; // eslint-disable-line

      if (scene === 'justOr') {
        let w = parentW * orWidthRate / struct.length;
        let h = parentH * orHeightRate;
        let y = (parentH - h) / 2 + parentY;

        gradientRate.push(orWidthRate / struct.length);

        for (let i = 0; i < struct.length; i++) {
          let t = struct[i];
          let x = (parentW - w * struct.length) / 2 + w * i + parentX;

          this.drawOr(ctx, x, y, w, h, t.value.length);

          for (let _i = 0; _i < t.value.length; _i++) {
            let _t = t.value[_i];
            let branchH = h * 2 / (t.value.length);
            let branchY = h / (t.value.length - 1);

            for (let _j = 0; _j < _t.length; _j++) {
              let assert = this.drawStruct(ctx, _t, w, branchH, x, y - branchH / 2 + _i * branchY, gradientRate);
              if (assert === 'restart') {
                return this.draw();
              }
            }
          }
        }
      }

      if (scene === 'justNode') {
        let margin = (parentW - struct.reduce((p, c) => p + c.width, 0)) / (struct.length + 1);
        let y = parentY + parentH / 2;

        if (margin < nodeStyle.marginMin) {
          let distance = (nodeStyle.marginMin - margin) * (struct.length + 1);
          this.setReactiveWidth(gradientRate, distance + parentW);
          return 'restart';
        }

        for (let i = 0; i < struct.length; i++) {
          let t = struct[i];
          let x = struct.reduce((_p, _c, _i) => { return _i < i ? _p + _c.width : _p; }, parentX + margin * (i + 1));

          this.drawNode(ctx, t, x, y);
        }
      }

      if (scene === 'orAndNode') {
        let nodeArr = struct.filter(_t => _t.type === 'node');
        let orArr = struct.filter(_t => _t.type === 'or');
        let nodeW = nodeArr.reduce((p, c) => p + c.width, 0);
        let orW = parentW * orHybridRate;
        let singleOrW = orW / orArr.length;
        let margin = (parentW - (nodeW + orW)) / (nodeArr.length + orArr.length + 1);

        if (margin < nodeStyle.marginMin) {
          let distance = (nodeStyle.marginMin - margin + 50) * (struct.length + 1);
          this.setReactiveWidth(gradientRate, distance + parentW);
          return 'restart';
        }

        let curGradientRate = _.jsonCopy(gradientRate); // 这里有个bug，orAndNode多执行了一次，深拷hack下
        curGradientRate.push(singleOrW / parentW);

        for (let i = 0; i < struct.length; i++) {
          let t = struct[i];
          let x = struct.reduce((p, c, _i) => {
            let curW = c.type === 'node' ? c.width : singleOrW;
            return _i < i ? p + curW : p;
          }, parentX + margin * (i + 1));

          if (t.type === 'node') {
            let y = parentY + parentH / 2;
            this.drawNode(ctx, t, x, y);
          }
          if (t.type === 'or') {
            let h = parentH * orHeightRate;
            let y = (parentH - h) / 2 + parentY;

            this.drawOr(ctx, x, y, singleOrW, h, t.value.length);

            for (let _i = 0; _i < t.value.length; _i++) {
              let _t = t.value[_i];
              let branchH = h * 2 / (t.value.length);
              let branchY = h / (t.value.length - 1);

              for (let _j = 0; _j < _t.length; _j++) {
                let assert = this.drawStruct(
                  ctx, _t, singleOrW, branchH, x, y - branchH / 2 + _i * branchY, curGradientRate,
                );
                if (assert === 'restart') {
                  return this.draw();
                }
              }
            }
          }
        }
      }
    }
    drawNode(ctx, node, initX, initY) {
      let { height, color, fontSize } = this.options.nodeStyle;
      let { width, content, status } = node;
      let x = initX;
      let y = initY - height / 2;
      let fillColor = null;
      let fontColor = null;

      switch (status) {
        case true:
          fillColor = color.success.fill;
          fontColor = color.success.font;
          break;
        case false:
          fillColor = color.fail.fill;
          fontColor = color.fail.font;
          break;
        default:
          fillColor = color.default.fill;
          fontColor = color.default.font;
      }
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.strokeStyle = 'rgba(186, 165, 130, 0.8)';
      ctx.lineWidth = 2;
      let radius = height / 2;
      if ((width - height) < 0) {
        radius = width / 2;
      }
      ctx.beginPath();
      ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
      ctx.lineTo(width - radius + x, y);
      ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
      ctx.lineTo(width + x, height + y - radius);
      ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
      ctx.lineTo(radius + x, height + y);
      ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.textAlign = 'center';
      ctx.fillStyle = fontColor;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillText(content, x + width / 2, y + 19);
    }
    drawMid(ctx) {
      let width = this.canvas.width;
      let height = this.canvas.height;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#009966';
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }
    drawOr(ctx, initX, initY, initW, initH, branch = 2, paddingLR = 0) {
      let x = initX + paddingLR;
      let y = initY;
      let w = initW - paddingLR * 2;
      let h = initH;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#009966';
      ctx.rect(x, y, w, h);
      ctx.fillStyle = '#fff';
      ctx.fill();
      if (branch > 2) {
        [...Array(branch - 2)].forEach((item, index) => {
          ctx.moveTo(x, y + h / (branch - 1) * (index + 1));
          ctx.lineTo(x + w, y + h / (branch - 1) * (index + 1));
        });
      }
      ctx.stroke();
    }
    parseFlow(flow) {
      const { and, findOrMatch, findBracketsMatch } = this.parseUtils();
      const advance = n => {
        flow = flow.substring(n);
      };
      let root = [];
      let last;
      let orParseing = false;
      while (flow) {
        last = flow;

        // 或处理
        const orMatch = findOrMatch(flow);
        if (orMatch) {
          orParseing = true;
          // 无括号情况下，根只会存在一个or
          if (!root[0]) {
            root.push({
              type: 'or',
              value: [],
            });
          }
          if (_.isArray(root[0].value)) {
            root[0].value.push(this.parseFlow(orMatch));
          }
          advance(orMatch.length + 1);
          continue;
        }
        if (orParseing) {
          // 最后一层
          if (_.isArray(root[0].value)) {
            root[0].value.push(this.parseFlow(last));
          }
          orParseing = false;
          break;
        }

        // 括号处理
        const bracketsMatch = findBracketsMatch(flow);
        if (bracketsMatch) {
          root.push(...this.parseFlow(bracketsMatch));
          advance(bracketsMatch.length + 2);
          continue;
        }

        // 与处理
        const andMatch = flow.match(and);
        if (andMatch) {
          if (andMatch[1]) {
            const { content, width, status } = this.fillNode(andMatch[1]);
            root.push({
              type: 'node',
              value: andMatch[1],
              content,
              width,
              status,
            });
          }
          advance(andMatch[1].length + 1);
          continue;
        }
        if (last === flow) {
          // 最后一层
          const { content, width, status } = this.fillNode(last);
          root.push({
            type: 'node',
            value: last,
            content,
            width,
            status,
          });
          break;
        }
      }
      return root;
    }
    parseUtils() {
      const and = /^(.*?)&/;
      // js正则不支持平衡组 难以区分成对括号情况 or和brackets的匹配改用栈
      const findOrMatch = text => {
        let stack = [];
        let cur;
        let pos = text.indexOf('|');
        while (pos !== -1) {
          cur = text.substring(0, pos);
          cur.split('').forEach(t => {
            if (t === '(') stack.push('(');
            if (t === ')') stack.pop();
          });
          if (stack.length) {
            cur = null;
            stack.length = 0;
            pos = text.indexOf('|', pos + 1);
          } else {
            break;
          }
        }
        return cur;
      };
      const findBracketsMatch = text => {
        let stack = ['('];
        let cur;
        if (text.indexOf('(') === 0) {
          let textArr = text.split('');
          for (let i = 1; i < textArr.length; i++) {
            if (textArr[i] === '(') stack.push('(');
            if (textArr[i] === ')') stack.pop();
            if (!stack.length) {
              cur = text.substring(1, i);
              break;
            }
          }
        }
        return cur;
      };
      return { and, findOrMatch, findBracketsMatch };
    }
    fillNode(value) {
      const { padding, fontSize } = this.options.nodeStyle;
      const _ctx = this.canvas.getContext('2d');
      _ctx.font = `${fontSize}px sans-serif`;

      const match = this.props.nodeMap.find(_t => _t.value === value);
      let label = _.objGet(match, 'label', '');
      let status = _.objGet(match, 'status', undefined);
      let content = label ? `${value}:${label}` : value;
      let width = _ctx.measureText(content).width + 2 * padding;

      return { content, width, status };
    }
    setReactiveWidth(gradient, distance) {
      const reverseArr = _.jsonCopy(gradient).reverse();
      this.reactiveWidth = reverseArr.reduce((p, c) => p / c, distance);
    }
    render () {
        return (
            <Wrapper innerRef={input => (this.wrapper = input)}>
                <canvas ref="flow" />
            </Wrapper>
        )
    }
}
