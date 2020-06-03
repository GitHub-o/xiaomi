import './index.styl'
import tools from '../utils/tools'
import { Carousel } from '../class/carousel'

class Slide extends Carousel{
  constructor (wrap, opt = {}) {
    super(wrap, opt);
    this.mode = opt.mode || 'to-left';

    this.oCarList = this.elem.querySelector('.J_carList');
    this.carItemWidth = tools.getStyle(this.oCarItems[0], 'width');
    this.carItemHeight = tools.getStyle(this.oCarItems[0], 'height');
    this.init();
  }

  init () {
    this.cloneItem(this.mode);
    this.autoPlay();
    this.bindEvent();
  }

  mouseOver (ev) {
    const e = ev || window.event,
          tar = e.target || e.scrElement,
          idx = [].indexOf.call(this.oIndicatorItems, tar);

    if (idx !== -1) {
      this._changeIdx(idx, true);
      this.curIdx = idx;
    }
  }

  cloneItem (mode) {
    const oFirst = this.oCarItems[0].cloneNode(true);
    this.oCarList.appendChild(oFirst);

    if (mode === 'to-left' || mode === 'to-right') {
      this.oCarList.style.width = this.carItemWidth * (this.carItemsLen + 1) + 'px';
    } else if (mode === 'to-up' || mode === 'to-down') {
      this.oCarList.style.height = this.carItemHeight * (this.carItemsLen + 1) + 'px';
    }
  }

  autoPlay () {
    let dir;
    if (this.mode === 'to-left' || this.mode === 'to-down') {
      dir = 'prev';
    } else if (this.mode === 'to-right' || this.mode === 'to-up') {
      dir = 'next';
    }
    this.timer = setInterval(this.run.bind(this, dir), this.duration);
  }

  run (dir) {
    let t = null;
    switch (dir) {
      case 'prev':
        if (this.curIdx === 0) {
          this.curIdx = this.carItemsLen - 1;
          this._changeIdx(this.curIdx);

          t = setTimeout(() => {
            this._changeIdx(this.curIdx, true);
            clearTimeout(t);
          }, 60)
        } else {
          this.curIdx--;
          this._changeIdx(this.curIdx, true);
        }

        break;
      case 'next':
        if (this.curIdx === this.carItemsLen) {
          this.curIdx = 1;
          this._changeIdx(this.curIdx);

          t = setTimeout(() => {
            this._changeIdx(this.curIdx, true);
            clearTimeout(t);
          }, 60);
        } else {
          this.curIdx++;
          this._changeIdx(this.curIdx, true);
        }
        break;
      default:
        break;
    }
  }

  _changeIdx (index, flag = false) {
    switch (this.mode) {
      case 'to-left':
      case 'to-right':
        if (flag) {
          this.oCarList.style.transform = `translateX(${-this.carItemWidth * index}px)`;
          this.oCarList.style.transition = 'transform .5s';
        } else {
          this.oCarList.style.transform = `translateX(${index == 1 ? 0 : -this.carItemWidth * this.carItemsLen}px)`;
          this.oCarList.style.transition = '';
        }
        break;
      case 'to-up':
      case 'to-down':
        if (flag) {
          this.oCarList.style.transform = `translateY(${-this.carItemHeight * index}px)`;
          this.oCarList.style.transition = 'transform .5s';
        } else {
          this.oCarList.style.transform = `translateY(${index == 1 ? 0 : -this.carItemHeight * this.carItemsLen}px)`;
          this.oCarList.style.transition = '';
        }
        break;
      default:
        break;
    }

    this._changeIndicator(index);
  }

  _changeIndicator (index) {
    if (this.idx == this.carItemsLen) {
      this.oIndicatorItems[0].classList.remove('cur');
    } else {
      this.oIndicatorItems[this.idx].classList.remove('cur');
    }

    if (index === this.carItemsLen) {
      this.oIndicatorItems[0].classList.add('cur');
    } else {
      this.oIndicatorItems[index].classList.add('cur');
    }
    this.idx = index;
  }
}

export { Slide }