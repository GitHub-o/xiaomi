import { App } from './App'
import { Header } from '../components/header'
import { DetailBoard } from '../components/detail_board'
import { Footer } from '../components/footer'

import tools from '../utils/tools'

class Detail extends App {
  constructor ($) {
    super($, {
      swiper: false,
      phone: true,
      field: true
    })
  }

  render () {
    const options = {
      fieldDatas: this.cache.fieldDatas,
      phoneDatas: this.cache.phoneDatas
    }

    const id = tools.getUrlParam('id'),
          data = this.filterPhoneData(id);

    new Header(this.$app, options).init();
    new DetailBoard(this.$app, data).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }

  filterPhoneData (id) {
    let data = null;
    this.cache.phoneDatas.some(val => {
      if (val.id == id) {
        return data = val;
      }
    });
    return data;
  }
}

new Detail(jQuery);