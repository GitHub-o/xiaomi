import tools from '../utils/tools'
import CarouselTpl from '../index'

class Carousel {
  constructor (wrap, opt = {}) {
    this.wrap = document.querySelector(wrap);
    this.duration = opt.duration || 3000;
    this.tpl = opt.tpl || new CarouselTpl().tpl;

    this.wrap.appendChild(this.tpl(opt.data));
    this.elem = this.wrap.querySelector('.J_myCarousel');
    this.oCarItems = this.elem.querySelectorAll('.car-item');
    this.carItemsLen = this.oCarItems.length;
    this.oCarIndicators = this.elem.querySelector('.J_carIndicators');
    this.oIndicatorItems = this.oCarIndicators.querySelectorAll('.car-indicator-item');

    this.idx = 0;
    this.curIdx = 0;
    this.timer = null;
  }

  bindEvent () {
    tools.addEvent(this.elem, 'click', this.btnClick.bind(this));
    tools.addEvent(this.elem, 'mouseenter', this.mouseInOut.bind(this));
    tools.addEvent(this.elem, 'mouseleave', this.mouseInOut.bind(this));
    tools.addEvent(this.oCarIndicators, 'mouseover', this.mouseOver.bind(this));
  }

  autoPlay () {
    this.timer = setInterval(this.run.bind(this), this.duration);
  }

  mouseInOut (ev) {
    const e = ev || window.event,
          type = e.type;
    type === 'mouseenter' ? clearInterval(this.timer)
                          : this.autoPlay();
  }

  mouseOver (ev) {
    const e = ev || window.event,
          tar = e.target || e.scrElement,
          idx = [].indexOf.call(this.oIndicatorItems, tar);

    if (idx !== -1) {
      this._changeIdx(idx);
      this.curIdx = idx;
    }
  }

  btnClick (ev) {
    const e = ev || window.event,
          tar = e.target || e.srcElement,
          dir = tar.dataset.dir;

    dir && this.run(dir);
  }
}

export { Carousel }