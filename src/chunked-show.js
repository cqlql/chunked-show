import {dragPlusMobile as dragMobile} from 'corejs';
// import dragMobile from 'corejs/dist/drag/drag-plus-mobile';

export default class ChunkedShow {
  constructor({eBox}) {

    this.eBox = eBox;

    let child = eBox.children;
    this.eTopHalf = child[0];
    this.eDrag = child[1];
    this.eBottomHalf = child[2];

    this.moveY = 0;
    this.boxH = 0;
  }

  init() {
    this.init = function () {
    };


    let that = this;

    let {eBox, eTopHalf, eBottomHalf, eDrag} = that;

    eBox.classList.add('show');

    this.boxH = eBox.clientHeight;

    let moveY;

    dragMobile({
      eDrag,
      onStart() {
        moveY = that.moveY;
      },
      onMove({x, y}) {
        moveY += y;
        that.move(moveY);
      },

      onDown(e) {
        e.preventDefault();
      },
      onEnd() {

      }
    });

    that.move(eTopHalf.children[0].clientHeight);
  }


  moveViewUpdate(y) {
    this.eTopHalf.style.height = y + 'px';
    this.eBottomHalf.style.top = y + 'px';
  }

  move(y) {

    let {boxH} = this;

    let minY = 30;
    let maxY = boxH - 30;
    if (y < minY) y = minY;
    else if (y > maxY) y = maxY;

    // let ty = boxH - y;
    // let by = y;

    this.moveViewUpdate(y);
    this.moveY = y;
  }

  ///

  chunked() {
    this.init();

  }


}

