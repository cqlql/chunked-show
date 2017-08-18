'use strict';

var corejs = require('corejs');

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

// import dragMobile from 'corejs/dist/drag/drag-plus-mobile';

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

      corejs.dragPlusMobile({
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
