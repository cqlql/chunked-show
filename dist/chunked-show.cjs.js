'use strict';

/**
 * 计算坐标
 * 点与点相加
 * */
function Figure() {
  this.start = function (x, y) {
    this.prevX = x;
    this.prevY = y;
  };

  this.move = function (x, y, fn) {
    fn(x - this.prevX, y - this.prevY);

    this.prevX = x;
    this.prevY = y;
  };
}

/**
 * Created by cql on 2017/2/24.
 *
 * 拖动基础-移动端
 * 针对移动端触摸事件实现
 *
 * @param eDrag 绑定元素
 * @param onMove 移动时触发
 * @param onStart 可选。拖动开始。
 *                onEnd触发前可能会触发多次。只要还有手指在屏幕，松开或者接触都会触发
 *                 本来可集成在onDown中，但考虑到多点，其中某点触摸结束，此时需单独重新计算移动，但不需要判断是否要移动
 * @param onDown 可选。retrun false 可使拖动不触发。可在此位置阻止默认动作
 * @param onEnd 可选。拖动结束
 *
 * # 关于阻止默认动作
 *  在onDown 中可以阻止，勿在onStart中阻止
 *
 */
function dragMobile$1(_ref) {
    var eDrag = _ref.eDrag,
        onMove = _ref.onMove,
        _ref$onStart = _ref.onStart,
        onStart = _ref$onStart === undefined ? function () {} : _ref$onStart,
        _ref$onDown = _ref.onDown,
        onDown = _ref$onDown === undefined ? function () {} : _ref$onDown,
        _ref$onEnd = _ref.onEnd,
        onEnd = _ref$onEnd === undefined ? function () {} : _ref$onEnd;


    var isStart = false;

    eDrag.addEventListener('touchstart', function (e) {
        if (onDown(e) === false) {
            isStart = false;
            return;
        }
        isStart = true;

        onStart(e);

        // e.preventDefault();
    });

    eDrag.addEventListener('touchmove', function (e) {
        if (isStart === false) return;

        onMove(e);
    });

    eDrag.addEventListener('touchend', function (e) {

        if (isStart === false) return;

        var touches = e.touches;

        if (touches.length === 0) {
            onEnd();
        } else {
            onStart(e);
        }
    });

    eDrag.addEventListener('touchcancel', function (e) {
        onEnd();
    });
}

/**
 * Created by cql on 2017/2/24.
 *
 * 针对移动端触摸事件实现
 *
 * 移动情况只针对touches的第一个触摸点做处理
 *
 * 兼容性：ie9+
 *
 *
 */
var figure = new Figure();

// @param onMove 使用点点相加
// 其他参数见 drag-base-mobile
function dragMobile(_ref) {
    var eDrag = _ref.eDrag,
        _onMove = _ref.onMove,
        _ref$onStart = _ref.onStart,
        _onStart = _ref$onStart === undefined ? function () {} : _ref$onStart,
        _ref$onDown = _ref.onDown,
        onDown = _ref$onDown === undefined ? function () {} : _ref$onDown,
        onEnd = _ref.onEnd;

    dragMobile$1({
        eDrag: eDrag,
        onMove: function onMove(event) {
            var touche = event.touches[0];

            figure.move(touche.pageX, touche.pageY, function (x, y) {
                _onMove({ x: x, y: y, event: event });
            });
        },

        onDown: onDown,
        onStart: function onStart(e) {

            var touche = e.touches[0];

            figure.start(touche.pageX, touche.pageY);

            _onStart(e);
        },

        onEnd: onEnd
    });
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ChunkedShow = function () {
  function ChunkedShow(_ref) {
    var eBox = _ref.eBox;
    classCallCheck(this, ChunkedShow);


    this.eBox = eBox;

    var child = eBox.children;
    this.eTopHalf = child[0];
    this.eDrag = child[1];
    this.eBottomHalf = child[2];

    this.moveY = 0;
    this.boxH = 0;
  }

  createClass(ChunkedShow, [{
    key: 'init',
    value: function init() {
      this.init = function () {};

      var that = this;

      var eBox = that.eBox,
          eTopHalf = that.eTopHalf,
          eBottomHalf = that.eBottomHalf,
          eDrag = that.eDrag;


      eBox.classList.add('show');

      this.boxH = eBox.clientHeight;

      var moveY = void 0;

      dragMobile({
        eDrag: eDrag,
        onStart: function onStart() {
          moveY = that.moveY;
        },
        onMove: function onMove(_ref2) {
          var x = _ref2.x,
              y = _ref2.y;

          moveY += y;
          that.move(moveY);
        },
        onDown: function onDown(e) {
          e.preventDefault();
        },
        onEnd: function onEnd() {}
      });

      that.move(eTopHalf.children[0].clientHeight);
    }
  }, {
    key: 'moveViewUpdate',
    value: function moveViewUpdate(y) {
      this.eTopHalf.style.height = y + 'px';
      this.eBottomHalf.style.top = y + 'px';
    }
  }, {
    key: 'move',
    value: function move(y) {
      var boxH = this.boxH;


      var minY = 30;
      var maxY = boxH - 30;
      if (y < minY) y = minY;else if (y > maxY) y = maxY;

      // let ty = boxH - y;
      // let by = y;

      this.moveViewUpdate(y);
      this.moveY = y;
    }

    ///

  }, {
    key: 'chunked',
    value: function chunked() {
      this.init();
    }
  }]);
  return ChunkedShow;
}();

module.exports = ChunkedShow;
