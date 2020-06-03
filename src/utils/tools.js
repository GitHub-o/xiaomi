const tools = {
  tplReplace (tpl, obj) {
    return tpl().replace(/{{(.*?)}}/g, (node, key) => {
      return obj[key];
    })
  },

  trimSpace (str) {
    return str.replace(/\s+/g, '');
  },

  addEvent (el, type, fn, capture = false) {
    if (window.addEventListener) {
      this.addEvent = function (el, type, fn, capture) {
        el.addEventListener(type, fn, capture);
      }
    } else if (window.attachEvent) {
      this.addEvent = function (el, type, fn) {
        el.attachEvent('on' + type, function () {
          fn.call(el);
        })
      }
    } else {
      this.addEvent = function () {
        el['on' + type] = fn;
      }
    }
    this.addEvent(el, type, fn, capture);
  },

  removeEvent (elem, type, fn, capture) {
    if (elem.addEventListener) {
      this.removeEvent = function (elem, type, fn, capture = false) {
        elem.removeEventListener(type, fn, capture);
      }
    } else if (elem.attachEvent) {
      this.removeEvent = function (elem, type, fn) {
        elem.detachEvent('on' + type, function () {
          fn.call(elem);
        })
      }
    } else {
      this.removeEvent = function (elem, type, fn) {
        elem['on' + type] = null;
      }
    }
    this.removeEvent(elem, type, fn, capture);
  },

  scrollToBottom (callback) {
    if (getScrollOffset().y + getClientPort().h >= getScrollSize().h) {
      callback();
    }
  },

  getUrlParam,
  _throttle
}

function _throttle (fn, delay = 1000, finalTrigger = true) {
	var firstTime = new Date().getTime(),
			t = null,
			res = null;

	return function () {
		var _self = this,
				args = arguments,
				curTime = new Date().getTime();

		t && clearTimeout(t);

		if (curTime - firstTime >= delay) {
			res = fn.apply(_self, args);
			firstTime = curTime;
		} else if (finalTrigger) {
			t = setTimeout(function () {
				res = fn.apply(_self, args);
			}, delay);
		}
		return res;
	}
}

// 求取滚动条的纵横距离
function getScrollOffset () {
	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}


// 封装可视区窗口大小
function getClientPort () {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else if (document.compatMode == "BackCompat") {
		return {
			w: document.body.clientWidth,
			h: document.body.clientHeight
		}
	} else {
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	}
}


// 获取文档的总大小
function getScrollSize () {
	if (document.body.scrollHeight) {
		return {
			w: document.body.scrollWidth,
			h: document.body.scrollHeight
		}
	} else {
		return {
			w: document.documentElement.scrollWidth,
			h: document.documentElement.scrollHeight
		}
	}
}

function getUrlParam(value) {
  var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i"),
			res = window.location.search.substr(1).match(reg);
			
	return res && res[2] && decodeURIComponent(res[2]);
}

export default tools;