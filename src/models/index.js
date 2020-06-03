import { HTTP } from '../utils/http'

class IndexModel extends HTTP {
  getDatas (options = {}) {
    return new Promise(resolve => {
      this.ajax({
        url: `getDatas?swiper=${options.swiper}&phone=${options.phone}&field=${options.field}`,
        type: 'GET',
        dataType: 'JSONP',
        jsonp: 'cb',
        success (data) {
          resolve(data);
        }
      })
    })
  }
}

export  { IndexModel }