import { App } from './App'
import { Header } from '../components/header'
import { Tab } from '../components/tab'
import { ShowBoard } from '../components/show_board'
import { Footer } from '../components/footer'

import tools from '../utils/tools'

class List extends App {
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

    const tab = new Tab(this.$app, options),
          keywords = tools.getUrlParam('keywords'),
          field = 'all';

    new Header(this.$app, options).init();
    tab.init();
    new ShowBoard(this.$app, tab.filterPhoneDatas(field, keywords)).init();
    new Footer(this.$app).init();

    $('body').prepend(this.$app);
  }
}

new List(jQuery);