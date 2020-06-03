import './index.styl'
import tpl from './index.tpl'
import tools from '../../utils/tools'

import { Logo } from './logo/index'
import { Nav } from './nav/index'
import { Search } from './search/index'

class Header {
  constructor (el, opt) {
    this.name = 'header';
    this.$el = el;
    this.fieldDatas = opt.fieldDatas;
    this.phoneDatas = opt.phoneDatas;

    this.logo = new Logo();
    this.nav = new Nav();
    this.search = new Search();
  }

  async init () {
    await this.render();
    this.bindEvent();
  }

  async render () {
    await this.$el.append(tools.tplReplace(tpl, {
      logo: this.logo.tpl(),
      nav: this.nav.tpl(this.fieldDatas),
      search: this.search.tpl()
    }))
  }

  bindEvent () {
    const $nav = $('.J_navList'),
          $searchBtn = $('.J_searchBtn');

    $nav.on('mouseenter', '.nav-item', { phoneDatas: this.phoneDatas, nav: this.nav }, this.nav.mouseInNav);
    $searchBtn.on('click', this.search.toList);
  }
}

export { Header }