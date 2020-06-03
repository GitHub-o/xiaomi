const tools = {
  addEvent (elem, type, fn, capture) {
    if (elem.addEventListener) {
      this.addEvent = function (elem, type, fn, capture) {
        var capture = capture || false;
        elem.addEventListener(type, fn, capture);
      }
    } else if (elem.attachEvent) {
      this.addEvent = function (elem, type, fn) {
        elem.attachEvent('on' + type, function () {
          fn.call(elem);
        });
      }
    } else {
      this.addEvent = function (elem, type, fn) {
        elem['on' + type] = fn;
      }
    }
    this.addEvent(elem, type, fn, capture);
  },

  getStyle (elem, prop) {
    if (window.getComputedStyle) {
      if (prop) {
        return parseInt(window.getComputedStyle(elem, null)[prop]);
      } else {
        return window.getComputedStyle(elem, null);
      }
    } else {
      if (prop) {
        return parseInt(elem.currentStyle[prop]);
      } else {
        return elem.currentStyle;
      }
    }
  }
}

export default tools;