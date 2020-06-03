import '../style/common.styl'

import { IndexModel } from '../models/index'

class App {
  constructor ($, options) {
    this.$app = $('<div id="app">');
    this.swiper = options.swiper;
    this.phone = options.phone;
    this.field = options.field;
  	this.cache = null;

  	this.init();
  }

  async init () {
    await this.getDatas();
    this.render();
  }

  async getDatas () {
    const indexModel = new IndexModel();
    await indexModel.getDatas({
      swiper: this.swiper,
      phone: this.phone,
      field: this.field
    }).then(res => {
      this.cache = {
        swiperDatas: res.swiper_data,
        phoneDatas: res.phone_data,
        fieldDatas: res.field_data
      };
    })
  }
}

export { App };