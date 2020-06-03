import { config } from './config';

const doAjax = Symbol('doAjax');

class HTTP {
  [doAjax] (opt = {}) {
  let o = window.XMLHttpRequest
        ? new XMLHttpRequest
        : new ActiveXObject('Microsoft.XMLHTTP');
  if (!o) {
    throw new Error('您的浏览器暂不支持发起HTTP请求，请升级！');
  }

  let url = config.api_base_url + opt.url,
      type = (opt.type || 'GET').toUpperCase(),
      dataType = (opt.dataType || 'JSON').toUpperCase(),
      data = opt.data || null,
      jsonp = opt.jsonp || 'callback',
      jsonpCB = opt.jsonpCB || 'jQuery' + random() + '_' + new Date().getTime(),
      async = opt.async === false ? false : true,
      success = opt.success || function () {},
      error = opt.error || function () {},
      complete = opt.complete || function () {},
      timeout = opt.timoeut || 30000,

      timer = null;

    if (!url) {
      throw new Error('您没有填写URL！');
    }

    if (dataType === 'JSONP') {
      if (type !== 'GET') {
        console.warn('请求方式已修改为 type="GET"');
        type = 'GET';
      }
      let oS = document.createElement('script');
      oS.src = url.indexOf('?') === -1
              ? url + '?' + jsonp + '=' + jsonpCB
              : url + '&' + jsonp + '=' + jsonpCB;

      document.body.appendChild(oS);
      document.body.removeChild(oS);
      window[jsonpCB] = function (data) {
        success(data);
      }
      return;
    }

    o.onreadystatechange = function () {
      if (o.readyState === 4) {
        if ((o.status >= 200 && o.status < 300) || o.status === 304) {
          switch (dataType) {
            case 'JSON':
              success(JSON.parse(o.responseText));
              break;
            case 'TEXT':
              success(o.responseText);
              break;
            case 'XML':
              success(o.responseXML);
              break;
            default:
              success(JSON.parse(o.responseText));
              break;
          }
        } else {
          error();
        }
        complete();
        clearTimeout(timer);
        timer = null;
        o = null;
      }
    }
    
    o.open(type, url, async);
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    o.send(type === 'POST' ? formatData(data) : null);

    timer = setTimeout(function () {
      o.abort();
      complete();
      clearTimeout(timer);
      timer = null;
      o = null;
    }, timeout);
  }

  ajax (opt) {
    this[doAjax](opt);
  }

  post (url, data, success) {
    this[doAjax]({
      url: url,
      data: data,
      success: success
    })
  }

  get (url, success) {
    this[doAjax]({
      url: url,
      success: success
    })
  }
}

function formatData (data) {
  let str = '';
  for (let prop in data) {
    str += prop + '=' + data[prop] + '&';
  }
  return str.replace(/&$/, '');
}

function random () {
  let str = '';
  for (var i = 0; i < 20; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

export { HTTP }
