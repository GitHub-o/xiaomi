import './index.styl'
import { Carousel } from '../class/carousel'

class Fade extends Carousel{
  constructor (wrap, opt) {
    super(wrap, opt);

    this.init();
  }

  init () {
    this.autoPlay();
    this.bindEvent();
  }

  run (dir = 'next') {
    switch (dir) {
      case 'prev':
        this.curIdx = this.curIdx === 0
                    ? this.carItemsLen - 1
                    : this.curIdx - 1;
        break;
      case 'next':
        this.curIdx = this.curIdx < this.carItemsLen - 1
                    ? this.curIdx + 1
                    : 0;
        break;
      default:
        break;
    }
    this._changeIdx(this.curIdx);
  }

  _changeIdx (index) {
    this.oCarItems[this.idx].classList.remove('active');
    this.oIndicatorItems[this.idx].classList.remove('cur');
    this.oCarItems[index].classList.add('active');
    this.oIndicatorItems[index].classList.add('cur');
    this.idx = index;
  }
}

export { Fade }