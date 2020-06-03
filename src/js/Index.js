import '../style/common.styl'

import { App } from './App'
import { Header } from '../components/header'
import { Fade as Carousel } from '../components/carousel/fade'
// import { Slide as Carousel } from '../components/carousel/slide'
import { BoardTitle } from '../components/board_title'
import { ShowBoard } from '../components/show_board'
import { Footer } from '../components/footer'

class Index extends App {
  constructor ($) {
    super($, {
      swiper: true,
      phone: true,
      field: true
    });
    this.$app = $('<div id="app">');
  }

  render () {
    $('body').prepend(this.$app);

    new Header(this.$app, {
      fieldDatas: this.cache.fieldDatas,
      phoneDatas: this.cache.phoneDatas
    }).init();
    new Carousel('#app', {
      data: this.cache.swiperDatas
    })
    new BoardTitle(this.$app, '手机上新').init();
    new ShowBoard(this.$app, this.filterPhoneDatas('new')).init();
    new BoardTitle(this.$app, '超值手机').init();
    new ShowBoard(this.$app, this.filterPhoneDatas('valuable')).init();
    new BoardTitle(this.$app, '官方推荐').init();
    new ShowBoard(this.$app, this.filterPhoneDatas('recommend')).init();
    new Footer(this.$app).init();
  }

  filterPhoneDatas (field) {
    return this.cache.phoneDatas.filter(val => {
      switch (field) {
        case 'new':
          return val.new == 1;
          break;
        case 'valuable':
          return val.most_value == 1;
          break;
        case 'recommend':
          return val.recom == 1;
          break;
        default:
          return val.new == 1;
          break;
      }
    })
  }
}

new Index(jQuery);