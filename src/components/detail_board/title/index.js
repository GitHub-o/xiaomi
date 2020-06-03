import './index.styl'
import tpl from './index.tpl'

import tools from '../../../utils/tools'

class DetailTitle {
  constructor (title) {
    this.name = 'detailTitle';
    this.title = title;
  }

  tpl (title) {
    return tools.tplReplace(tpl, { title });
  }
}

export { DetailTitle };