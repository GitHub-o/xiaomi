import './index.styl'
import tpl from './index.tpl'

import tools from '../../utils/tools'

import { DetailTitle } from './title'
import { ContentItem } from './content_item'

class DetailBoard {
  constructor (el, phoneData) {  
    this.name = 'detailBoard';
    this.$el = el;
    this.phoneData = phoneData;
  }

  async init () {
    await this.render(this.phoneData);
    this.bindEvent();
  }

  async render (data) {
    const title = new DetailTitle(),
          contentItem = new ContentItem();

    await this.$el.append(tools.tplReplace(tpl, {
      name: data.phone_name,
      slogan: data.slogan,
      price: data.default_price,
      pic: JSON.parse(data.pics)[0][0][0],
      title_1: title.tpl('手机版本'),
      title_2: title.tpl('手机颜色'),
      version_list: contentItem.tpl(JSON.parse(data.version_info)),
      color_list: contentItem.tpl(JSON.parse(data.color))
    }))
  }

  bindEvent () {
    const $contenWrap = $('.content-wrap');

    $contenWrap.on('click', '.content-item', this.changeActive);
  }

  changeActive () {
    const $tar = $(this);

    $tar.addClass('active').siblings().removeClass('active');
  }
}

export { DetailBoard };