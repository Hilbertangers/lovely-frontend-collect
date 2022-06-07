"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Aphelios = void 0;
var WeaponEnum;
(function (WeaponEnum) {
    WeaponEnum["red"] = "\u65AD\u9B44";
    WeaponEnum["green"] = "\u901A\u78A7";
    WeaponEnum["violet"] = "\u5760\u660E";
    WeaponEnum["blue"] = "\u8367\u7130";
    WeaponEnum["white"] = "\u6298\u955C"; // 5
})(WeaponEnum || (WeaponEnum = {}));
var Aphelios = /** @class */ (function () {
    function Aphelios(config) {
        this.initQueue = [
            WeaponEnum.green,
            WeaponEnum.red,
            WeaponEnum.violet,
            WeaponEnum.blue,
            WeaponEnum.white,
        ];
        this.targetQueue = [
            WeaponEnum.red,
            WeaponEnum.white,
            WeaponEnum.green,
            WeaponEnum.violet,
            WeaponEnum.blue,
        ];
        this.config = {
            maxStayCount: 2
        };
        if (config) {
            this.config = __assign(__assign({}, this.config), config);
        }
    }
    Aphelios.prototype.setInitQueue = function (queue) {
        if (queue.length !== 5) {
            console.warn('error length');
        }
        this.initQueue = queue;
    };
    Aphelios.prototype.setTargetQueue = function (queue) {
        if (queue.length !== 5) {
            console.warn('error length');
        }
        this.targetQueue = queue;
    };
    Aphelios.prototype.getProcess = function () {
        var _this = this;
        var _a = this, initQueue = _a.initQueue, targetQueue = _a.targetQueue;
        var maxStayCount = this.config.maxStayCount;
        if (!targetQueue.length) {
            console.error('无目标');
        }
        if (this.isCycleQueue(this.initQueue, this.targetQueue)) {
            return [];
        }
        var allProcess = [];
        var happenedQueue = [];
        var turn = function (queue) { return (queue.push(queue.shift()), queue[queue.length - 1]); };
        var swapTurn = function (queue) { return (queue.push.apply(queue, queue.splice(1, 1)), queue[queue.length - 1]); };
        var operation = function (queue) {
            // turn
            var _tQueue = __spreadArray([], queue);
            var _tWeapon = turn(_tQueue);
            // swapTurn
            var _sQueue = __spreadArray([], queue);
            var _sWeapon = swapTurn(_sQueue);
            return { _tQueue: _tQueue, _tWeapon: _tWeapon, _sQueue: _sQueue, _sWeapon: _sWeapon };
        };
        var BFT = function (queue) {
            var stack = [];
            stack.unshift({
                queue: queue,
                process: [],
                stayCount: -1 // important
            });
            var _loop_1 = function () {
                var _a = stack.shift(), queue_1 = _a.queue, process = _a.process, stayCount = _a.stayCount;
                if (!happenedQueue.some(function (t) { return _this.isEqualQueue(t, queue_1); }) // 边界：是否操作过
                ) {
                    happenedQueue.push(queue_1);
                    var _b = operation(queue_1), _tQueue = _b._tQueue, _tWeapon = _b._tWeapon, _sQueue = _b._sQueue, _sWeapon = _b._sWeapon;
                    var generateNodes = [];
                    if (_this.isCycleQueue(_tQueue, targetQueue)) {
                        allProcess.push(__spreadArray(__spreadArray([], process), [_tWeapon]));
                    }
                    else {
                        generateNodes.push({
                            queue: _tQueue,
                            process: __spreadArray(__spreadArray([], process), [_tWeapon]),
                            stayCount: 0
                        });
                    }
                    if (stayCount < maxStayCount - 1 // 边界： 最大滞留次数
                    ) {
                        if (_this.isCycleQueue(_sQueue, targetQueue)) {
                            allProcess.push(__spreadArray(__spreadArray([], process), [_sWeapon]));
                        }
                        else {
                            generateNodes.push({
                                queue: _sQueue,
                                process: __spreadArray(__spreadArray([], process), [_sWeapon]),
                                stayCount: stayCount + 1
                            });
                        }
                    }
                    stack = stack.concat(generateNodes);
                }
            };
            while (stack.length) {
                _loop_1();
            }
        };
        BFT(initQueue);
        console.log("🚀 ~ file: efls_weapons.ts ~ line 93 ~ Aphelios ~ getProcess ~ allProcess", allProcess);
        if (allProcess.length) {
            var result = allProcess.filter(function (t) { return t.length === allProcess[0].length; });
            console.log("🚀 ~ file: efls_weapons.ts ~ line 103 ~ Queue ~ result ~ result", result);
            return result;
        }
        else {
            return [];
        }
    };
    // public getPartProcess(value: Adjoins) {
    // }
    Aphelios.prototype.isEqualQueue = function (queueA, queueB) {
        if (queueA.length !== queueB.length)
            return false;
        return queueA.every(function (t, i) { return t === queueB[i]; });
    };
    // O(2n)
    Aphelios.prototype.isCycleQueue = function (queueA, queueB) {
        if (queueA.length !== queueB.length)
            return false;
        var res = queueA.reduce(function (queueBIndex, cur, curIndex) {
            if (curIndex === 0) {
                return queueB.findIndex(function (bItem) { return bItem === cur; });
            }
            else {
                if (queueBIndex === -1)
                    return -1;
                var queueACur = cur;
                var _queueBIndex = queueBIndex + 1 >= queueB.length ? queueBIndex + 1 - queueB.length : queueBIndex + 1;
                var queueBCur = queueB[_queueBIndex];
                return queueACur === queueBCur ? _queueBIndex : -1;
            }
        }, -1) > -1;
        return res;
    };
    return Aphelios;
}());
exports.Aphelios = Aphelios;
