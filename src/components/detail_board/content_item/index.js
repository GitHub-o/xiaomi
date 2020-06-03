import './index.styl'
import tpl from './index.tpl'

import tools from '../../../utils/tools'

class ContentItem {
  constructor () {
    this.name = 'contentItem';
  }

  tpl (data) {
    let list = '';
    data.forEach((val, idx) => {
      list += tools.tplReplace(tpl, {
        is_active: idx == 0 ? 'active': '',
        version: val.version || val,
        price:  val.price ? '￥' + val.price : ''
      })
    })
    return list;
  }
}

export { ContentItem };