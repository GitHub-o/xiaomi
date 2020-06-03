import './index.styl'
import tpl from './tpl/menu.tpl'
import itemTpl from './tpl/item.tpl'
import tools from '../../../../utils/tools'

class NavMenu {
  constructor () {
    this.name = 'navMenu';
    this.tpl = tpl;
    
    this.htmlCache = {};
  }

  appendMenuCard (data) {
    let list = '';

    data.forEach((val, idx) => {
      if (idx < 6) {
        list += tools.tplReplace(itemTpl, {
          id: val.id,
          phone_name: val.phone_name,
          default_price: val.default_price,
          pic: JSON.parse(val.pics)[0][0][0],
          slogan: val.slogan
        })
      }
    })
    return list;
  }
}

export { NavMenu };