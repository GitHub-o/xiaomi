import './index.styl'

import itemTpl from './tpl/item.tpl'
import tpl from './tpl/nav.tpl'
import tools from '../../../utils/tools'

import { NavMenu } from './nav_menu/index'

class Nav {
  constructor () {
    this.name = 'nav';
    this.navMenu = new NavMenu();
  }

  tpl (data) {
    let navItemsHtml = '';
    data.forEach(val => {
      navItemsHtml += tools.tplReplace(itemTpl, {
        field: val.field,
        series_name: val.series_name
      })
    })

    return tools.tplReplace(tpl, {
      nav_items: navItemsHtml,
      nav_menu: this.navMenu.tpl()
    })
  }

  mouseInNav (ev) {
    const data = (ev || window.event).data,
          field = $(this).attr('data-field'),
          $navMenuList = $('.J_navMenuList'),
          phoneDatas = data.phoneDatas,
          navMenu = data.nav.navMenu;

    if (!navMenu.htmlCache[field]) {
      navMenu.htmlCache[field] = navMenu.appendMenuCard(phoneDatas.filter(val => val.field == field));
    }

    $navMenuList.html(navMenu.htmlCache[field]);
  }
}

export { Nav }